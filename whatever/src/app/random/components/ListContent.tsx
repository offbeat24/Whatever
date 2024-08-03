import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setPlaces } from '../../../redux/slices/searchSlice';
import { setCenter } from '../../../redux/slices/mapSlice';
import { addBookmark, removeBookmark } from '../../../redux/slices/bookmarkSlice';
import { removeHistory } from '../../../redux/slices/historySlice';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  y: number;
  x: number;
}

interface ContentProps {
  type: string;
  closeMenu: () => void;
  isMenuOpen: boolean;
}

export default function ListContent({ type, closeMenu, isMenuOpen }: ContentProps) {
  const dispatch = useDispatch();
  const { places: searchPlaces } = useSelector((state: RootState) => state.search);
  const { places: historyPlaces } = useSelector((state: RootState) => state.history);
  const { places: bookmarkedPlaces } = useSelector((state: RootState) => state.bookmark);
  
  const [searchKeyword, setSearchKeyword] = useState('');
  const [historyKeyword, setHistoryKeyword] = useState('');
  const [bookmarkKeyword, setBookmarkKeyword] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (!isMenuOpen) {
      setHistoryKeyword('');
      setBookmarkKeyword('');
      setFilteredPlaces([]);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    switch (type) {
      case 'search':
        setFilteredPlaces(searchPlaces);
        break;
      case 'history':
        setFilteredPlaces([...historyPlaces].reverse());
        break;
      case 'bookmark':
        setFilteredPlaces([...bookmarkedPlaces].reverse());
        break;
      default:
        break;
    }
  }, [searchPlaces, historyPlaces, bookmarkedPlaces, type]);

  useEffect(() => {
    if (type !== 'search') {
      const places = type === 'history' ? historyPlaces : bookmarkedPlaces;
      const currentKeyword = type === 'history' ? historyKeyword : bookmarkKeyword;
      const filtered = places.filter(place =>
        place.place_name.includes(currentKeyword) || place.address_name.includes(currentKeyword)
      );
      setFilteredPlaces(filtered.length > 0 ? filtered : []);
    }
  }, [historyKeyword, bookmarkKeyword, type, historyPlaces, bookmarkedPlaces]);

  const performSearch = (key: string) => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 API가 로드되지 않았습니다.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(key, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const placesData = data.map((place: any) => ({
          id: place.id,
          place_name: place.place_name,
          address_name: place.road_address_name || place.address_name,
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
  
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (type === 'search') {
      performSearch(searchKeyword);
    } else {
      const places = type === 'history' ? historyPlaces : bookmarkedPlaces;
      const currentKeyword = type === 'history' ? historyKeyword : bookmarkKeyword;
      const filtered = places.filter(place =>
        place.place_name.includes(currentKeyword) || place.address_name.includes(currentKeyword)
      );
      setFilteredPlaces(filtered.length > 0 ? filtered : []);
    }
  };

  const clearKeyword = () => {
    switch (type) {
      case 'search':
        setSearchKeyword('');
        performSearch('');
        break;
      case 'history':
        setHistoryKeyword('');
        setFilteredPlaces([...historyPlaces].reverse());
        break;
      case 'bookmark':
        setBookmarkKeyword('');
        setFilteredPlaces([...bookmarkedPlaces].reverse());
        break;
      default:
        break;
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    switch (type) {
      case 'search':
        setSearchKeyword(value);
        break;
      case 'history':
        setHistoryKeyword(value);
        break;
      case 'bookmark':
        setBookmarkKeyword(value);
        break;
      default :
        break;
    }
  };

  const handlePlaceClick = (place: Place) => {
    dispatch(setCenter({ latitude: place.y, longitude: place.x }));
    closeMenu();
  };

  const isBookmarked = (placeId: string) => bookmarkedPlaces.some(bookmarkedPlace => bookmarkedPlace.id === placeId);

  const handleBookmarkClick = (place: Place) => {
    if (isBookmarked(place.id)) {
      dispatch(removeBookmark(place.id));
    } else {
      dispatch(addBookmark(place));
    }
  };

  const handleDeleteClick = (placeId: string) => {
    if (type === 'history') {
      dispatch(removeHistory(placeId));
    } else if (type === 'bookmark') {
      dispatch(removeBookmark(placeId));
    }
  };

  const getInputValue = () => {
    switch (type) {
      case 'search':
        return searchKeyword;
      case 'history':
        return historyKeyword;
      case 'bookmark':
        return bookmarkKeyword;
      default:
        return '';
    }
  };

  return (
    <div className='relative p-5 pt-[1.875rem] h-full flex flex-col'>
      <div className='sticky top-0 shadow-md bg-white z-10'>
        <form onSubmit={handleSearch} className="relative">
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
            className="laptop:w-[21.875rem] laptop:h-10 laptop:px-9 
                      w-full tablet-l:h-12 tablet-l:px-12 
                      tablet:h-10 tablet:px-10 
                      mobile:h-10 mobile:px-11
                      border-orange-o3 border-2 rounded-lg bg-snow [filter:drop-shadow(0rgba(0,0,0,0.07))]"
            value={getInputValue()}
            onChange={handleKeywordChange}
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
      <div className='overflow-y-auto laptop:pt-5 tablet-l:pt-10 tablet:pt-9 mobile:pt-[1.125rem] grid laptop:gap-2 tablet-l:gap-5 tablet:gap-[0.875rem] mobile:gap-2 laptop:grid-cols-1 tablet:grid-cols-2'>
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <button
              type='button'
              key={place.id}
              className='relative w-full laptop:h-[8.125rem] 
                                  tablet-l:h-28 
                                  tablet:h-20 
                                  mobile:h-20
                                bg-snow rounded-lg shadow px-5 laptop:mb-2 text-start'
              onClick={() => handlePlaceClick(place)}>
              <p className='text-orange-o1 laptop:text-xl tablet-l:text-lg tablet:text-base font-bold'>{place.place_name}</p>
              <p className='laptop:text-lg tablet-l:text-base tablet:text-sm font-medium'>{place.address_name}</p>
              <a href={`https://place.map.kakao.com/${place.id}`} target="_blank" rel="noopener noreferrer">
                <Image
                  src='/kakaomap_horizontal_en 1.png'
                  alt='kakaomap'
                  width={77.31}
                  height={20}
                  className='objext-contain tablet:w-16 mobile:w-14'
                />
              </a>
              {type !== 'search' && (
                <>
                  {type === 'history' && (
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(place);
                      }}
                      className={`absolute top-2 ${type === 'history' ? 'right-10' : 'right-2'}`}
                    >
                      <Image
                        src={isBookmarked(place.id) ? '/BookedIcon.svg' : '/NotBookedIcon.svg'}
                        alt='bookmark'
                        width={24}
                        height={24}
                        className='object-contain'
                      />
                    </button>
                  )}
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(place.id);
                    }}
                    className={`absolute top-2 ${type === 'history' ? 'right-2' : 'right-2'}`}
                  >
                    <Image
                      src='/DeleteIcon.svg'
                      alt='delete'
                      width={24}
                      height={24}
                      className='object-contain'
                    />
                  </button>
                </>
              )}
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500">검색 결과가 존재하지 않습니다.</p>
        )}
      </div>
    </div>
  );
}
