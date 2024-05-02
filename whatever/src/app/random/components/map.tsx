'use client'

import { useEffect, useState } from 'react';
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

  useEffect(()=> {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
  
            setUserLocation({ latitude, longitude });
          },
  
          (error) => {
            console.error("Error get user location: ", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser");
      } 
    };
    getUserLocation();
  },[]);
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
    />
  )
}