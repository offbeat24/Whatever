'use client'

import { useEffect, useState} from 'react';
import { Map } from 'react-kakao-maps-sdk';
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
  const [mergedResults, setMergedResults] = useState<string[]>([]);

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

  const search = (result: any) => {
    setMergedResults(result.map((place: any) => place.place_name));
    console.log(mergedResults);
  };

  const fetchPlaces = async () => {
    if (!bound) return;
    const ps = new window.kakao.maps.services.Places();
    const promises = [1, 2, 3].map((pages) =>
      new Promise((resolve, failed) => {
        ps.categorySearch("FD6", (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(result);
          } else {
            failed(status);
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
      search(allResults);
    } catch (error) {
      console.error("Failed to fetch places: ", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(approve, reject);
  }, []);
  useEffect(() => {
    if (window.kakao && window.kakao.maps && bound) {
      fetchPlaces();
    }
  }, [bound]);

  return(
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
      {mergedResults.length > 0 && <Roulette textData={[]} dataFromMap={mergedResults} onShuffle={fetchPlaces} />}
    </Map>
  )
}
