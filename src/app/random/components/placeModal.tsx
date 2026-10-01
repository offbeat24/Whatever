import { useEffect, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import Image from 'next/image';
import { Place } from '../../../data/types';
import IconButton from '../../components/IconButton';

interface PlaceModalProps {
  place: Place;
  onClose: () => void;
  onSave: () => void;
  onRemoveMarker: () => void; // 마커 제거 함수
  isBookmarked: boolean; 
}

export default function PlaceModal({ place, onClose, onSave, onRemoveMarker, isBookmarked }: PlaceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby='place-modal-title'
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-h-none max-w-none items-center justify-center border-0 bg-transparent p-0 backdrop:bg-transparent"
      onCancel={handleCancel}
    >
      <button
        type='button'
        tabIndex={-1}
        aria-label='상세 정보 닫기'
        className='absolute inset-0 bg-black bg-opacity-50'
        onClick={onClose}
      />
      <div
        className="relative z-10 w-[19.375rem] h-[15rem] pt-5
                  bg-snow rounded-[0.625rem] shadow-lg text-black flex flex-col items-center justify-start"
      >
        <h2 id='place-modal-title' className="text-2xl w-72 font-bold overflow-hidden whitespace-nowrap text-ellipsis">{place.place_name}</h2>
        <div className='flex w-60 h-[2.25rem] mt-4 border-[0.5px] shadow-none border-opacity-50 border-[#a5a5a5] items-center justify-center rounded-full'>
          <p className='text-sm my-auto text-ellipsis'>{place.address_name}</p>
        </div>
        <div className="font-extrabold grid-cols-3 my-[1.375rem] mx-[3.75rem] space-x-[2.1875rem]">
          <button type='button' onClick={onSave} className="w-[2.5rem] space-y-[0.4rem]">
            <Image
              src={isBookmarked ? '/BookMarkedModal.svg' : '/BookMarkModal.svg'}
              alt='저장하기'
              width={100}
              height={100}
              className='objext-contain w-[2.5rem]'
            />
            <div className='text-[0.4375rem]'>{isBookmarked ? '저장취소' : '저장하기'}</div>
          </button>
          <IconButton
            type='button'
            onClick={() => window.open(`https://place.map.kakao.com/${place.id}`, '_blank')}
            label='카카오맵에서 보기'
            src='/kakaomap_vertical_ko.png'
            imageWidth={438}
            imageHeight={600}
            imageClassName='objext-contain w-[2.5rem]'
          />
          <button type='button' onClick={onRemoveMarker} className="w-[2.5rem] space-y-[0.4rem]">
            <Image
              src='/MarkerOff.svg' // 마커 상태에 따른 아이콘 변경
              alt='마커 끄기'
              width={100}
              height={100}
              className='objext-contain w-[2.5rem]'
            />
            <div className='text-[0.4375rem]'>마커 끄기</div>
          </button>
        </div>
        <button type='button' onClick={onClose} className="font-bold font-[#a6a6a6] text-[0.625rem] opacity-80"> 
          <p className='font-bold font-[#a6a6a6] text-[0.625rem] mb-5'>닫기</p>
        </button>
      </div>
    </dialog>
  );
}
