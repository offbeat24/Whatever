'use client'

import { useEffect, useState} from 'react';
import { Map } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../../hooks/useKakaoLoader';

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
  }>();
  
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
    console.log(result)
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(approve, reject);
  }, []);
  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    ps.categorySearch("FD6", search, {
      bounds: new kakao.maps.LatLngBounds(bound?.sw , bound?.ne),
      size: 15,
      page: 4
    });
  })
  useKakaoLoader()

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
    />
  )
}