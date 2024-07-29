import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { removeBookmark } from '../../../../redux/slices/bookmarkSlice';

export default function BookmarkContent() {
  const dispatch = useDispatch();
  const { places } = useSelector((state: RootState) => state.bookmark);

  return(
    <div>
      {places.map((place) => (
        <div key={place.id}>
          <p>{place.name}</p>
          <p>{place.address}</p>
          <a href={`https://map.kakao.com/link/map/${place.id}`} target="_blank" rel="noopener noreferrer">
            카카오맵에서 보기
          </a>
          <button type='button' onClick={() => dispatch(removeBookmark(place.id))}>삭제</button>
      </div>
      ))}
    </div>
  );
};