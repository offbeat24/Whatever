import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Image from 'next/image';
import { RootState } from '../../../redux/store';
import useKakaoLoader from '../../../hooks/useKakaoLoader';
import Roulette from '../../components/roulette';
import { clearSelectedPlace } from '../../../redux/slices/selectedPlaceSlice';
import { addHistory, removeHistory } from '../../../redux/slices/historySlice';
import { addBookmark, removeBookmark } from '../../../redux/slices/bookmarkSlice';
import { setCenter } from '../../../redux/slices/mapSlice'; 
import PlaceModal from './placeModal';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  y: number;
  x: number;
  category_group_code: string;
}

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
  const [places, setPlaces] = useState<any[]>([]);
  const [randomPlace, setRandomPlace] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false); 
  const [showMyLocationPin, setShowMyLocationPin] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const mapRef = useRef<kakao.maps.Map>(null);
  const center = useSelector((state: RootState) => state.map.center);
  const { places: historyPlaces } = useSelector((state: RootState) => state.history);
  const { places: bookmarkedPlaces } = useSelector((state: RootState) => state.bookmark);
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace.place);
  const selectedType = useSelector((state: RootState) => state.selectedPlace.type);
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
    if (!mapRef.current) return;
    const bounds = mapRef.current.getBounds();
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
      const allResults = results.flat();
      if (allResults.length > 0) {
        setPlaces(allResults);
        // console.log("data 준비완료")
      } else {
        // console.warn("No places found in the current bounds.");
        setPlaces([]); 
      }
    } catch (error) {
      // console.error("Failed to fetch places: ", error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(approve, reject);
  }, []);

  const handlePlaceRandom = (place: any) => {
    // console.log("랜덤추출완료")
    dispatch(clearSelectedPlace());
    setRandomPlace([]);
    setRandomPlace(place);
    setPlaces([place]); // 선택된 장소만 places로 설정
    // console.log(randomPlace)
  };

  const handleResetLocation = () => {
    if (userLocation) {
      dispatch(setCenter({ latitude: userLocation.latitude, longitude: userLocation.longitude }));
      setShowMyLocationPin(!showMyLocationPin);
    }
  };

  const handleMapLoad = () => {
    if (mapRef.current){
      // console.log("지도로드완료")
      if (!mapLoaded) {
        setMapLoaded(true);
        fetchPlaces(); // 지도 로드 상태를 true로 설정합니다.
      }
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

  const handleAddHistory = (place: any) => {
    // console.log("기록완료")
    const placeExists = historyPlaces.some(historyPlace => historyPlace.id === place.id);
    if (placeExists) {
      dispatch(removeHistory(place.id)); // 기존에 존재하는 장소를 삭제
    }
    dispatch(addHistory(place)); // 새로 저장
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

  const handleSetCenter = () => {
    if (selectedMarker) {
      dispatch(setCenter({ latitude: selectedMarker.y, longitude: selectedMarker.x }));
      handleCloseModal();
    }
  };

  const getMarkerImage = (type: string | null, place: any) => {
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

  const isBookmarked = (placeId: string) => bookmarkedPlaces.some(bookmarkedPlace => bookmarkedPlace.id === placeId);
  
  return(
    <section className="relative w-full h-screen">
      <Map
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
        {selectedPlace && (
          <MapMarker
            key={selectedPlace.id}
            position={{ lat: selectedPlace.y, lng: selectedPlace.x }}
            title={selectedPlace.place_name}
            image={{
              src: getMarkerImage(selectedType, selectedPlace),
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
            onClick={() => handleMarkerClick(selectedPlace)}
          />
        )}
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
      </Map>
      {selectedMarker && (
        <PlaceModal
          place={selectedMarker}
          onClose={handleCloseModal}
          onSave={handleSavePlace}
          onSetCenter={handleSetCenter}
          isBookmarked={isBookmarked(selectedMarker.id)}
        />
      )}
      <div className="absolute z-10 space-x-10 top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center p-1 my-[1.25rem]
      laptop:transform-none laptop:top-auto laptop:bottom-0 laptop:right-0 laptop:left-auto laptop:m-[2.1875rem] laptop:w-[27.5rem] laptop:h-20
      tablet-l:h-17 tablet-l:w-[20rem] tablet-l:text-[1.7rem]
      tablet:h-16 tablet:w-[18.75rem] tablet:text-[1.5rem] 
      mobile:w-[16rem] mobile:h-[3.125rem] mobile:text-[1.3rem]
      bg-orange-o3 shadow-[6px_6px_10px_0px_rgba(0,0,0,0.15)] text-white rounded-[85px] font-extrabold text-[2.625rem] ">
        <Roulette textData={[]} dataFromMap={places} onShuffle={fetchPlaces} onPlaceRandom={handlePlaceRandom} onAddHistory={handleAddHistory}/>
      </div>
      <div className="absolute flex flex-col z-10 top-28 right-6 space-y-8">
        <div className='flex flex-col w-11 h-[5.5rem] [filter:drop-shadow(2px_2px_10px_rgba(0,0,0,0.30))]'>
          <button
            type='button'
            className="p-1 w-11 h-11 bg-white rounded-[5px_5px_0px_0px] border-b-[rgba(0,0,0,0.10)] border-b border-solid"
            onClick={zoomIn}
            aria-label="Zoom in"
          >
            <Image
              src="/PlusIcon.svg"
              alt="ZommIn"
              width={35}
              height={35}
              className="object-contain"
            />
          </button>
          <button
            type='button'
            className="p-1 w-11 h-11 bg-white rounded-[0px_0px_5px_5px] border-t-[rgba(0,0,0,0.10)] border-t border-solid"
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            <Image
              src="/MinusIcon.svg"
              alt="ZommOut"
              width={35}
              height={35}
              className="object-contain"
            />
          </button>
        </div>
        <button
          type='button'
          className="p-2 w-11 h-11 bg-white rounded-[5px] [filter:drop-shadow(2px_2px_10px_rgba(0,0,0,0.30))]"
          onClick={handleResetLocation}
          aria-label="Move to current location"
        >
          <Image
            src="/LocationIcon.svg"
            alt="Current location"
            width={30}
            height={30}
            className="object-contain"
          />
        </button>
      </div>
    </section>
  )
}


/*  왜 모든 것이 두번씩 작동하지?
    히스토리 및 저장 전체 비우기
    맨첨에 지도 로드 안되는 오류  */