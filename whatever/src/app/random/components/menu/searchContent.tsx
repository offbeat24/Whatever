import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setKeyword, setPlaces } from '../../../../redux/slices/searchSlice';
import { setCenter } from '../../../../redux/slices/mapSlice';

export default function SearchContent() {
  const dispatch = useDispatch();
  const { keyword, places } = useSelector((state: RootState) => state.search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 API가 로드되지 않았습니다.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const placesData = data.map((place: any) => ({
          id: place.id,
          name: place.place_name,
          address: place.road_address_name || place.address_name,
          y: place.y,
          x: place.x,
        }));
        dispatch(setPlaces(placesData));

        if (placesData.length > 0) {
          dispatch(setCenter({ latitude: placesData[0].y, longitude: placesData[0].x }));
        }
      } else {
        console.error("검색 결과가 없습니다.");
        dispatch(setPlaces([]));
      }
    });
  };

  useEffect(() => {
    if (places.length > 0) {
      const { y, x } = places[0]; // 첫 번째 장소의 좌표
      dispatch(setCenter({ latitude: y, longitude: x }));
    }
  }, [places, dispatch]);

  return(
    <div>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={keyword}
          onChange={(e) => dispatch(setKeyword(e.target.value))}
          placeholder='검색어를 입력하세요'
          />
        <button type='submit'>검색</button>
      </form>
      <div>
        {
          places.map((place) => (
            <div key={place.id}>
              <p>{place.name}</p>
              <p>{place.address}</p>
              <a href={`https://place.map.kakao.com/${place.id}`} target="_blank" rel="noopener noreferrer">
                카카오맵에서 보기
              </a>
            </div>
          ))
        }
      </div>
    </div>
  )
}