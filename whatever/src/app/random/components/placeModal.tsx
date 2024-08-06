import React from 'react';
import Image from 'next/image';

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
  isBookmarked: boolean; 
}

export default function PlaceModal({ place, onClose, onSave, onSetCenter, isBookmarked }: PlaceModalProps) {
  return (
    <button type='button' className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <button
        type='button'
        className="w-[19.375rem] h-[14rem] pt-5 
                  bg-[#f7f7f7] rounded-[0.625rem] shadow-lg text-black flex flex-col items-center justify-start"
        onClick={(e) => e.stopPropagation()} // 이벤트 전파 중단
      >
        <h2 className="text-xl font-bold">{place.place_name}</h2>
        <div className='flex w-60 h-[2.25rem] mt-4 border-[0.5px] border-opacity-50 border-[#a5a5a5] items-center justify-center rounded-full'>
          <p className='text-sm my-auto'>{place.address_name}</p>
        </div>
        <div className="font-extrabold grid-cols-3 my-[1.375rem] mx-[3.75rem] space-x-[2.1875rem]">
          <button type='button' onClick={onSave} className="w-[2.5rem]">
            <Image
              src={isBookmarked ? '/BookMarkedModal.svg' : '/BookMarkModal.svg'}
              alt='저장하기'
              width={100}
              height={100}
              className='objext-contain w-[2.5rem]'
            />
            <p className='text-[0.4375rem] mt-[0.4375rem]'>{isBookmarked ? '저장취소' : '저장하기'}</p>
          </button>
          <button type='button' onClick={() => window.open(`https://place.map.kakao.com/${place.id}`, '_blank')} className="">
            <Image
              src='/kakaomap_vertical_ko.png'
              alt='kakaomap'
              width={438}
              height={600}
              className='objext-contain w-[2.5rem]'
            />
          </button>
          <button type='button' onClick={onSetCenter} className="w-[2.5rem]">
            <Image
              src='/CentralizeModal.svg'
              alt='중심 좌표 설정하기'
              width={100}
              height={100}
              className='objext-contain w-[2.5rem]'
            />
            <p className='text-[0.4375rem] mt-[0.4375rem]'>중심 설정</p>
          </button>
        </div>
        <button type='button' onClick={onClose} className="font-bold font-[#a6a6a6] text-[0.625rem]"> 
          <p className='font-bold font-[#a6a6a6] text-[0.625rem]'>닫기</p>
        </button>
      </button>
    </button>
  );
}
