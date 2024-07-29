import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setLocation } from '../../../../redux/slices/locationSlice';
import { setPlaces, selectPlace } from '../../../../redux/slices/placeSlice';
import SearchBox from './searchBox';
import PlaceBox from './placeBox';
import { Place } from '../../../types';

interface MenuProps {
  type: 'search' | 'bookmark' | 'history';
}

function Menu({ type }: MenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const places = useSelector((state: RootState) => state.places.places);
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);
  const history = useSelector((state: RootState) => state.history.history);

  useEffect(() => {
    if (type === 'search' && searchTerm) {
      // 카카오맵 키워드 검색 API 호출 로직
      // dispatch(setPlaces(fetchedPlaces));
    }
  }, [searchTerm, type, dispatch]);

  const handlePlaceClick = (place: Place) => {
    dispatch(selectPlace(place));
    dispatch(setLocation({ latitude: place.latitude, longitude: place.longitude }));
    if (type === 'history') {
      dispatch(addToHistory(place));
    }
  };

  return (
    <div className="menu-container">
      {type === 'search' && (
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
      <div className="places-list">
        {type === 'search' && places.map((place) => (
          <PlaceBox key={place.id} place={place} onClick={() => handlePlaceClick(place)} />
        ))}
        {type === 'bookmark' && bookmarks.map((place) => (
          <PlaceBox key={place.id} place={place} onClick={() => handlePlaceClick(place)} />
        ))}
        {type === 'history' && history.map((place) => (
          <PlaceBox key={place.id} place={place} onClick={() => handlePlaceClick(place)} />
        ))}
      </div>
    </div>
  );
}

export default Menu;
