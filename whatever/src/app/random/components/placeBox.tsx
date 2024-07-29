import React from 'react';

interface PlaceBoxProps {
  place: any;
  onSelectPlace: (place: any) => void;
  onSavePlace: (place: any) => void;
  onRemovePlace: (id: string) => void;
}

const PlaceBox: React.FC<PlaceBoxProps> = ({ place, onSelectPlace, onSavePlace, onRemovePlace }) => (
    <div className="place-box" onClick={() => onSelectPlace(place)}>
      <h4>{place.name}</h4>
      <p>{place.address}</p>
      <button onClick={() => onSavePlace(place)}>저장</button>
      <button onClick={() => onRemovePlace(place.id)}>저장 취소</button>
    </div>
  );

export default PlaceBox;