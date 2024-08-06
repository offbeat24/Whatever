import React from 'react';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  y: number;
  x: number;
  category_group_code: string;
}

interface PlaceModalProps {
  place: Place;
  onClose: () => void;
  onSave: () => void;
  onSetCenter: () => void;
}

export default function PlaceModal({ place, onClose, onSave, onSetCenter }: PlaceModalProps) {
  return (
    <button type='button' className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <button
        type='button'
        className="bg-[#f8f8f8] p-5 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // 이벤트 전파 중단
      >
        <h2 className="text-xl font-bold">{place.place_name}</h2>
        <p>{place.address_name}</p>
        <div className="mt-4">
          <button type='button' onClick={onSave} className="bg-snow text-black py-2 px-4 rounded">
            저장하기
          </button>
          <button type='button' onClick={onSetCenter} className="bg-snow text-black py-2 px-4 rounded">
            중심좌표로 설정
          </button>
          <button type='button' onClick={onClose} className="bg-snow text-black py-2 px-4 rounded">
            닫기
          </button>
        </div>
      </button>
    </button>
  );
}
