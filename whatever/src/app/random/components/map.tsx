'use client'

import { useEffect, useState} from 'react';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import Image from 'next/image';
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
      })
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

  useEffect(() => {
    if (mapLoaded && bound) {
      fetchPlaces();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLoaded, mapBoundsChanged]);

  return(
    <div className="relative w-full h-screen">
      <Map
        id="map"
        center={{
          lat: loc?.latitude!,
          lng: loc?.longitude!,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
        onCreate={handleMapLoad}
        onBoundsChanged={handleBoundsChange}
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
      <div className="absolute space-x-10 bottom-0 left-0 z-10 flex flex-col justify-between p-4">
        <Roulette textData={[]} dataFromMap={places} onShuffle={fetchPlaces} onPlaceSelected={handlePlaceSelected} />
        <button type="button" onClick={handleResetLocation} style={{ position: 'absolute', top: '10px', right: '10px', padding: '10px', background: '#FFA114', color: '#fff', border: 'none', borderRadius: '5px' }}>
          현재 위치로 돌아가기
        </button>
      </div>
    </div>
  )
}
