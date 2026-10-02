import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { RootState } from '../../../redux/store';
import useKakaoLoader from '../../../hooks/useKakaoLoader';
import Roulette from '../../components/roulette';
import { removeSelectedPlace, clearSelectedPlaces } from '../../../redux/slices/selectedPlaceSlice';
import { addHistory, removeHistory } from '../../../redux/slices/historySlice';
import { addBookmark, removeBookmark } from '../../../redux/slices/bookmarkSlice';
import { setCenter } from '../../../redux/slices/mapSlice'; 
import { setRandomPlace, clearRandomPlace } from '../../../redux/slices/randomSlice';
import PlaceModal from './placeModal';
import { Place, KakaoPlace, PlaceType, KakaoPlaceResponse } from '../../../data/types';
import IconButton from '../../components/IconButton';

export default function FoodMap() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loc, setLoc] = useState<{
    latitude: number,
    longitude: number
  } | null>({
    latitude: 37.3897837540429,
    longitude: 126.950783269518
  });
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [recentlyDrawnIds, setRecentlyDrawnIds] = useState<string[]>([]);
  const [showMyLocationPin, setShowMyLocationPin] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);
  const mapRef = useRef<kakao.maps.Map>(null);
  const lastRequestedBounds = useRef<string | null>(null);
  const latestPlacesRequest = useRef(0);

  const center = useSelector((state: RootState) => state.map.center);
  const randomPlace = useSelector((state: RootState) => state.random.randomPlace);
  const { places: historyPlaces } = useSelector((state: RootState) => state.history);
  const { places: bookmarkedPlaces } = useSelector((state: RootState) => state.bookmark);
  const selectedPlaces = useSelector((state: RootState) => state.selectedPlace.selectedPlaces);
  
  const dispatch = useDispatch();
  const panto = true;
  useKakaoLoader();

  const approve = (position: { coords: { latitude: number; longitude: number; }; }) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setUserLocation({ latitude: lat, longitude: lon });
    setLoc({ latitude: lat, longitude: lon });
  }
  const reject = () => {
    setUserLocation(null);
    setLoc(null);
  }

  const fetchPlaces = async () => {
    const map = mapRef.current;
    if (!map) return;
    const bounds = map.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const boundsKey = [
      southWest.getLat(),
      southWest.getLng(),
      northEast.getLat(),
      northEast.getLng(),
    ].map((coordinate) => coordinate.toFixed(6)).join(',');
    if (boundsKey === lastRequestedBounds.current) return;
    lastRequestedBounds.current = boundsKey;
    latestPlacesRequest.current += 1;
    const requestId = latestPlacesRequest.current;
    const ps = new window.kakao.maps.services.Places(); 
    const promises = [1, 2, 3].map((pages) =>
      new Promise((resolve) => {
        ps.categorySearch("FD6", (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(result);
          } else {
            resolve([]);
          }
        }, {
          bounds: new window.kakao.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast()),
          size: 15,
          page: pages
        });
      })
    );

    try {
      const results = await Promise.all(promises);
      const allResults = results.flat() as KakaoPlaceResponse[];
      const uniquePlaces = new Map<string, KakaoPlace>();
      allResults.forEach((place) => {
        if (!uniquePlaces.has(place.id)) {
          uniquePlaces.set(place.id, {
            ...place,
            y: typeof place.y === 'string' ? parseFloat(place.y) : place.y,
            x: typeof place.x === 'string' ? parseFloat(place.x) : place.x,
          });
        }
      });
      if (requestId === latestPlacesRequest.current) {
        setPlaces(Array.from(uniquePlaces.values()));
      }
    } catch (error) {
      if (requestId === latestPlacesRequest.current) {
        lastRequestedBounds.current = null;
        setPlaces([]);
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(approve, reject);
  }, []);

  const handlePlaceRandom = (place: KakaoPlace) => {
    setRecentlyDrawnIds((ids) => [place.id, ...ids.filter((id) => id !== place.id)].slice(0, 5));
    // dispatch(clearSelectedPlaces());
    const placeData: Place = {
      id: place.id,
      place_name: place.place_name,
      address_name: place.address_name,
      y: place.y,
      x: place.x,
      category_group_code: place.category_group_code,
    };
    dispatch(clearRandomPlace()); // 기존 randomPlace 초기화
    dispatch(setRandomPlace(placeData)); // 새로운 randomPlace 설정
  };

  const handleResetLocation = () => {
    if (userLocation) {
      dispatch(setCenter({ latitude: userLocation.latitude, longitude: userLocation.longitude }));
      setShowMyLocationPin(!showMyLocationPin);
    }
  };

  const handleMapLoad = () => {
    if (mapRef.current){
      fetchPlaces();
    }
  };

  const zoomIn = () => {
    const map = mapRef.current;
    if (map) {
      map.setLevel(map.getLevel() - 1);
    }
  };

  const zoomOut = () => {
    const map = mapRef.current;
    if (map) {
      map.setLevel(map.getLevel() + 1);
    }
  };


  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(new kakao.maps.LatLng(center.latitude, center.longitude));
    }
  }, [center]);

  const handleAddHistory = (place: KakaoPlace) => {
    // console.log("기록완료")
    const placeData: Place = {
      id: place.id,
      place_name: place.place_name,
      address_name: place.address_name,
      y: place.y,
      x: place.x,
      category_group_code: place.category_group_code,
    };
    const placeExists = historyPlaces.some(historyPlace => historyPlace.id === placeData.id);
    if (placeExists) {
      dispatch(removeHistory(placeData.id)); // 기존에 존재하는 장소를 삭제
    }
    dispatch(addHistory(placeData)); // 새로 저장
  };

  const handleMarkerClick = (place: Place) => {
    dispatch(setCenter({ latitude: place.y, longitude: place.x }));
    setSelectedMarker(place);
  };

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const handleSavePlace = () => {
    if (selectedMarker) {
      const isBookmarked = bookmarkedPlaces.some(bookmarkedPlace => bookmarkedPlace.id === selectedMarker.id);
      if (isBookmarked) {
        dispatch(removeBookmark(selectedMarker.id));
      } else {
        dispatch(addBookmark(selectedMarker));
      }
      handleAddHistory(selectedMarker);
      handleCloseModal();
    }
  };


  const getMarkerImage = (type: PlaceType | null, place: Place) => {
    // console.log(type,place);
    if (type === 'search' && place.category_group_code === 'FD6') {
      return '/logo-pin-2.svg';
    } if (type === 'bookmark') {
      return '/BookmarkPin.svg';
    } if (type === 'history') {
      return '/HistoryPin.svg';
    } 
    return '/LocationPin.svg';
    
  };
  
  const handleRemoveMarker = () => {
    if (selectedMarker) {
      if (randomPlace && selectedMarker.id === randomPlace.id) {
        dispatch(clearRandomPlace()); // selectedMarker가 randomPlace라면 randomPlace 초기화
      }
      dispatch(removeSelectedPlace(selectedMarker.id)); // 선택된 장소 제거
      handleCloseModal(); // 모달 닫기
    }
  };

  const handleClearSelectedPlace = () => {
    dispatch(clearSelectedPlaces());
    dispatch(clearRandomPlace());
  }
  const isBookmarked = (placeId: string) => bookmarkedPlaces.some(bookmarkedPlace => bookmarkedPlace.id === placeId);
  
  // useEffect(() => {
  //   if (randomPlace && selectedPlace && randomPlace.id !== selectedPlace.id) {
  //     // 기존의 랜덤 마커와 현재 선택된 마커가 다르면 랜덤 마커를 삭제
  //     dispatch(clearRandomPlace());
  //   }
  // }, [randomPlace, selectedPlace, dispatch]);
  
  return(
    <section className="relative w-full h-screen">
      <KakaoMap
        id="map"
        center={{
          lat: loc?.latitude!,
          lng: loc?.longitude!,
        }}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
        isPanto={panto}
        level={3}
        onCreate={handleMapLoad}
        onIdle={fetchPlaces}
        ref={mapRef}
      >
        {randomPlace && (
          <MapMarker
            key={randomPlace.id}
            position={{ lat: randomPlace.y, lng: randomPlace.x }}
            title={randomPlace.place_name}
            image={{
              src: '/logo-pin-1.svg',
              size: {
                width: 68,
                height: 85,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              }
            }}
            onClick={() => handleMarkerClick(randomPlace)}
          />
        )}
        {selectedPlaces.map(({ place, type }) => (
          <MapMarker
            key={place.id}
            position={{ lat: place.y, lng: place.x }}
            title={place.place_name}
            image={{
              src: getMarkerImage(type, place),
              size: {
                width: 68,
                height: 85,
              },
              options: {
                offset: {
                  x: 27,
                  y: 69,
                },
              },
            }}
            onClick={() => handleMarkerClick(place)}
          />
        ))}
        {showMyLocationPin && userLocation && (
          <MapMarker
            position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
            title="My Location"
            image={{
              src: '/MyLocationPin.svg',
              size: {
                width: 68,
                height: 85,
              },
              options: {
                offset: {
                  x: 16,
                  y: 16,
                }
              }
            }}
          />
        )}
      </KakaoMap>
      {selectedMarker && (
        <PlaceModal
          place={selectedMarker}
          onClose={handleCloseModal}
          onSave={handleSavePlace}
          onRemoveMarker={handleRemoveMarker}
          isBookmarked={isBookmarked(selectedMarker.id)}
        />
      )}
      <div className="absolute z-10 space-x-10 top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center p-1 my-[1.25rem]
      laptop:transform-none laptop:top-auto laptop:bottom-0 laptop:right-[2rem] laptop:left-auto laptop:m-[2.1875rem] laptop:w-[27.5rem] laptop:h-20
      tablet-l:h-17 tablet-l:w-[20rem] tablet-l:text-[1.7rem]
      tablet:h-16 tablet:w-[18.75rem] tablet:text-[1.5rem] 
      mobile:w-[16rem] mobile:h-[3.125rem] mobile:text-[1.3rem]
      bg-orange-o3 shadow-[6px_6px_10px_0px_rgba(0,0,0,0.15)] text-white rounded-[85px] font-extrabold text-[2.625rem] ">
        <Roulette textData={[]} dataFromMap={places} recentPlaceIds={recentlyDrawnIds} onPlaceRandom={handlePlaceRandom} onAddHistory={handleAddHistory}/>
      </div>
      <div className="absolute flex flex-col z-10 top-28 right-6 space-y-8">
        <div className='flex flex-col w-11 h-[5.5rem] [filter:drop-shadow(2px_2px_10px_rgba(0,0,0,0.30))]'>
          <IconButton
            type='button'
            className="p-1 w-11 h-11 bg-white rounded-[5px_5px_0px_0px] border-b-[rgba(0,0,0,0.10)] border-b border-solid"
            onClick={zoomIn}
            label='지도 확대'
            src='/PlusIcon.svg'
            imageWidth={35}
            imageHeight={35}
            imageClassName='object-contain'
          />
          <IconButton
            type='button'
            className="p-1 w-11 h-11 bg-white rounded-[0px_0px_5px_5px] border-t-[rgba(0,0,0,0.10)] border-t border-solid"
            onClick={zoomOut}
            label='지도 축소'
            src='/MinusIcon.svg'
            imageWidth={35}
            imageHeight={35}
            imageClassName='object-contain'
          />
        </div>
        <div className='flex flex-col w-11 h-[5.5rem] [filter:drop-shadow(2px_2px_10px_rgba(0,0,0,0.30))]'>
          <IconButton
            type='button'
            className="p-2 w-11 h-11 bg-white rounded-[5px_5px_0px_0px] border-b-[rgba(0,0,0,0.10)] border-b border-solid"
            onClick={handleResetLocation}
            label='현재 위치로 이동'
            src='/LocationIcon.svg'
            imageWidth={30}
            imageHeight={30}
            imageClassName='object-contain'
          />
          <IconButton
            type='button'
            className="p-2 w-11 h-11 bg-white rounded-[0px_0px_5px_5px] border-t-[rgba(0,0,0,0.10)] border-t border-solid"
            onClick={handleClearSelectedPlace}
            label='모든 마커 지우기'
            src='/ClearMarkerIcon.svg'
            imageWidth={30}
            imageHeight={30}
            imageClassName='object-contain'
          />
        </div>
      </div>
    </section>
  )
}


/*  히스토리 및 저장 전체 비우기
    랜딩페이지 다시 꾸미기 내 이름이나 사용법 같은거  */
