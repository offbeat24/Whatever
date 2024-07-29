import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

export default function HistoryContent() {
  const { places } = useSelector((state: RootState) => state.history);

  return (
    <div className="h-[100%] overflow-y-auto">
      {places.map((place) => (
        <div key={place.id}>
          <p>{place.place_name}</p>
          <p>{place.address_name}</p>
          <a href={`https://place.map.kakao.com/${place.id}`} target="_blank" rel="noopener noreferrer">
            카카오맵에서 보기
          </a>
        </div>
      ))}
    </div>
  );
};
