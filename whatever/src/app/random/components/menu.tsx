import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { savedPlacesState, historyState } from '../../../recoil/atoms';
import SearchBox from './searchBox';
import PlaceBox from './placeBox';

interface MenuProps {
  type: 'search' | 'bookmark' | 'history';
  onSelectPlace: (place: any) => void;
}

const Menu: React.FC<MenuProps> = ({ type, onSelectPlace }) => {
  const [savedPlaces, setSavedPlaces] = useRecoilState(savedPlacesState);
  const history = useRecoilValue(historyState);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  const handleSavePlace = (place: any) => {
    setSavedPlaces([...savedPlaces, place]);
  };

  const handleRemovePlace = (id: string) => {
    setSavedPlaces(savedPlaces.filter(place => place.id !== id));
  };

  const placesToShow = type === 'search' ? searchResults : type === 'bookmark' ? savedPlaces : history;

  return (
    <div className="menu">
      <SearchBox onSearch={handleSearch} type={type} />
      <div className="place-list">
        {placesToShow.map(place => (
          <PlaceBox
            key={place.id}
            place={place}
            onSelectPlace={onSelectPlace}
            onSavePlace={handleSavePlace}
            onRemovePlace={handleRemovePlace}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;