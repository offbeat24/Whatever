import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '../../../../redux/store';
import { setKeyword, setPlaces } from '../../../../redux/slices/searchSlice';
import { setCenter } from '../../../../redux/slices/mapSlice';
import { addBookmark, removeBookmark } from '../../../../redux/slices/bookmarkSlice';

export default function SearchContent() {
  const dispatch = useDispatch();
  const { keyword, places } = useSelector((state: RootState) => state.search);
  const { places: bookmarkedPlaces } = useSelector((state: RootState) => state.bookmark);

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

  const clearKeyword = () => {
    dispatch(setKeyword(''));
  };

  const handlePlaceClick = (place: any) => {
    dispatch(setCenter({ latitude: place.y, longitude: place.x }));
  };

  const isBookmarked = (placeId: string) => bookmarkedPlaces.some(bookmarkedPlace => bookmarkedPlace.id === placeId);
  
  const handleBookmarkClick = (place: any) => {
    if (isBookmarked(place.id)) {
      dispatch(removeBookmark(place.id));
    } else {
      dispatch(addBookmark(place));
    }
  };

  

  return(
    <div className='laptop:p-5 h-[100%] flex flex-col'>
      <div className='sticky top-0 shadow-md bg-white z-10'>
        <form  onSubmit={handleSearch} className="relative">
          <button 
            type='submit' 
            className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image
              src='/SearchIconOrange.svg'
              alt="Search"
              width={24}
              height={24}
              className="object-contain"
            />
          </button>
          <input
            type='text'
            className="laptop:w-[21.875rem] laptop:h-10 laptop:px-9 border-orange-o3 border-2 rounded-lg bg-snow [filter:drop-shadow(0rgba(0,0,0,0.07))]"
            value={keyword}
            onChange={(e) => dispatch(setKeyword(e.target.value))}
            placeholder='검색어를 입력하세요'
            />
            <button 
              type="button" 
              onClick={clearKeyword} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Image
                src='/ClearIcon.svg'
                alt="clear"
                width={24}
                height={24}
                className="object-contain"
              />
            </button>
        </form>
      </div>
      <div className='flex-grow overflow-y-auto laptop:pt-5'>
        {
          places.map((place) => (
            <button
              type='button'
              key={place.id} 
              className='relative laptop:w-[21.5625rem] laptop:h-[8.125rem] bg-snow rounded-lg shadow laptop:px-5 laptop:space-y-3 laptop:mb-2 text-start'
              onClick={() => handlePlaceClick(place)}>
              <p className='text-orange-o1 text-xl font-bold'>{place.name}</p>
              <p className='text-lg font-medium'>{place.address}</p>
              <a href={`https://place.map.kakao.com/${place.id}`} target="_blank" rel="noopener noreferrer">
                <Image
                  src='/kakaomap_horizontal_en 1.png'
                  alt='kakaomap'
                  width={77.31}
                  height={20}
                  className=''
                  />
              </a>
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation(); // 부모 div의 onClick 이벤트가 실행되지 않도록 함
                  handleBookmarkClick(place);
                }}
                className='absolute top-2 right-2'
              >
                <Image
                  src={isBookmarked(place.id) ? '/BookedIcon.svg' : '/NotBookedIcon.svg'}
                  alt='bookmark'
                  width={24}
                  height={24}
                  className='object-contain'
                />
              </button>
            </button>
          ))
        }
      </div>
    </div>
  )
}