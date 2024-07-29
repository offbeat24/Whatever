import React, { useState } from 'react';

interface SearchBoxProps {
  onSearch: (results: any[]) => void;
  type: 'search' | 'bookmark' | 'history';
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, type }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (type === 'search') {
      // 카카오맵 키워드 검색 API 호출
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(query, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          onSearch(data);
        }
      });
    } else {
      // 다른 검색 로직 (북마크 및 히스토리 검색)
      // 예시: onSearch(savedPlaces.filter(place => place.name.includes(query)));
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="지역을 검색하세요"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBox;