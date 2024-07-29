import React from 'react';
import { Place } from '../../../types'; // Place 타입을 정의했다고 가정

interface PlaceBoxProps {
  place: Place;
  onClick: () => void;
}

function PlaceBox({ place, onClick }: PlaceBoxProps) {
  return (
    <button type='button'  onClick={onClick}>
      <h4>{place.name}</h4>
      <p>{place.address}</p>
    </button>
  );
}

export default PlaceBox;
