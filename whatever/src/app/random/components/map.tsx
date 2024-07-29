import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import Image from 'next/image';
import { RootState } from '../../../redux/store';
import useKakaoLoader from '../../../hooks/useKakaoLoader';
import Roulette from '../../components/roulette';

export default function FoodMap() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>({
    latitude: 33.450701,
    longitude: 126.570667
  });
  const [bound, setBound] = useState<{
    sw: kakao.maps.LatLng,
    ne: kakao.maps.LatLng
  } | null>(null);
  const [loc, setLoc] = useState<{
    latitude: number,
    longitude: number
  } | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false); 
  const [mapBoundsChanged, setMapBoundsChanged] = useState(false);
  const [kakaoMap, setkakaoMap] = useState<kakao.maps.Map | null>(null);
  const mapRef = useRef<kakao.maps.Map>(null);
  const center = useSelector((state: RootState) => state.map.center);
  useKakaoLoader();

  const approve = (position: { coords: { latitude: number; longitude: number; }; }) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setUserLocation({ latitude: lat, longitude: lon });
    setLoc({ latitude: lat, longitude: lon });
  }
  const reject = () => {
    setUserLocation({
      latitude: 33.450701,
      longitude: 126.570667
    })
    setLoc({
      latitude: 33.450701,
      longitude: 126.570667
    });
  }

  const fetchPlaces = async () => {
    if (!bound) return;
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
          bounds: new window.kakao.maps.LatLngBounds(bound.sw, bound.ne),
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
      } else {
        console.warn("No places found in the current bounds.");
        setPlaces([]); 
      }
    } catch (error) {
      console.error("Failed to fetch places: ", error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(approve, reject);
  }, []);

  const handlePlaceSelected = (place: any) => {
    setSelectedPlace(place);
    setPlaces([place]); // 선택된 장소만 places로 설정
  };

  const handleResetLocation = () => {
    if (userLocation) {
      setLoc({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
      if (kakaoMap) {
        kakaoMap.setCenter(new kakao.maps.LatLng(userLocation.latitude, userLocation.longitude));
      }
    }
  };

  const handleMapLoad = (map: kakao.maps.Map) => {
    if (!mapLoaded) {
      const bounds = map.getBounds();
      setBound({
        sw: bounds.getSouthWest(),
        ne: bounds.getNorthEast(),
      });
      setMapLoaded(true); // 지도 로드 상태를 true로 설정합니다.
    }
  };

  const handleBoundsChange = (map: kakao.maps.Map) => {
    const bounds = map.getBounds();
    setBound({
      sw: bounds.getSouthWest(),
      ne: bounds.getNorthEast(),
    });
    setMapBoundsChanged(true); // 지도 경계 변경 상태 설정
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
    if (mapLoaded && bound) {
      fetchPlaces();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLoaded, mapBoundsChanged]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(new kakao.maps.LatLng(center.latitude, center.longitude));
    }
  }, [center]);

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
        level={3}
        onCreate={(map) => {
          setkakaoMap(map);
          handleMapLoad(map);
        }}
        onBoundsChanged={handleBoundsChange}
        ref={mapRef}
      >
        {selectedPlace && (
          <MapMarker
            key={selectedPlace.id}
            position={{ lat: selectedPlace.y, lng: selectedPlace.x }}
            title={selectedPlace.place_name}
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
          >
            <MapInfoWindow position={{ lat: selectedPlace.y, lng: selectedPlace.x }}>
              <div style={{ padding: '5px', color: '#000' }}>
                <h4>{selectedPlace.place_name}</h4>
                <p>{selectedPlace.address_name}</p>
              </div>
            </MapInfoWindow>
          </MapMarker>
        )}
      </Map>
      <div className="absolute z-10 space-x-10 top-0 left-1/2 transform -translate-x-1/2 flex flex-col justify-center p-1 my-[1.25rem]
      laptop:transform-none laptop:top-auto laptop:bottom-0 laptop:right-0 laptop:left-auto laptop:m-[2.1875rem] laptop:w-[27.5rem] laptop:h-20
      tablet-l:h-17 tablet-l:w-[20rem] tablet-l:text-[1.7rem]
      tablet:h-16 tablet:w-[18.75rem] tablet:text-[1.5rem] 
      mobile:w-[16rem] mobile:h-[3.125rem] mobile:text-[1.3rem]
      bg-orange-o3 shadow-[6px_6px_10px_0px_rgba(0,0,0,0.15)] text-white rounded-[85px] font-extrabold text-[2.625rem] ">
        <Roulette textData={[]} dataFromMap={places} onShuffle={fetchPlaces} onPlaceSelected={handlePlaceSelected} />
      </div>
      <div className="absolute flex flex-col z-20 top-28 right-6 space-y-8">
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
