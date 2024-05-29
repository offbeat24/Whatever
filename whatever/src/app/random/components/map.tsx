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
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  useKakaoLoader();

  const approve = (position: { coords: { latitude: number; longitude: number; }; }) => {
    setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }
  const reject = () => {
    setUserLocation({
      latitude: 33.450701,
      longitude: 126.570667
    })
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
  };

  return(
    <div>
      <Map
        id="map"
        center={{
          lat: userLocation?.latitude!,
          lng: userLocation?.longitude!,
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
        {places.map((place) => (
          <MapMarker
            key={place.id}
            position={{ lat: place.y, lng: place.x }}
            title={place.place_name}
          >
            {selectedPlace && selectedPlace.id === place.id && (
              <MapInfoWindow position={{ lat: place.y, lng: place.x }}>
                <div style={{ padding: '5px', color: '#000' }}>
                  <h4>{place.place_name}</h4>
                  <p>{place.address_name}</p>
                </div>
              </MapInfoWindow>
            )}
          </MapMarker>
        ))}
      </Map>
      <Roulette textData={[]} dataFromMap={places} onShuffle={fetchPlaces} onPlaceSelected={handlePlaceSelected} />
    </div>
  )
}
