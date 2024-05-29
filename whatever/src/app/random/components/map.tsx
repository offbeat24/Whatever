'use client'

import { useEffect, useState} from 'react';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
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

  return(
    <div>
      <Map
        id="map"
        center={{
          lat: loc?.latitude!,
          lng: loc?.longitude!,
        }}
        style={{
          width: "1650px",
          height: "880px",
        }}
        level={3}
        onBoundsChanged={(map) => {
          const bounds = map.getBounds()
          setBound({
            sw: bounds.getSouthWest(),
            ne: bounds.getNorthEast(),
          })
        }}
      >
        {selectedPlace && (
          <MapMarker
            key={selectedPlace.id}
            position={{ lat: selectedPlace.y, lng: selectedPlace.x }}
            title={selectedPlace.place_name}
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
      <Roulette textData={[]} dataFromMap={places} onShuffle={fetchPlaces} onPlaceSelected={handlePlaceSelected} />
      <button type="button" onClick={handleResetLocation} style={{ position: 'absolute', top: '10px', right: '10px', padding: '10px', background: '#FFA114', color: '#fff', border: 'none', borderRadius: '5px' }}>
        현재 위치로 돌아가기
      </button>
    </div>
  )
}
