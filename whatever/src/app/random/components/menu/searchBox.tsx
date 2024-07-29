import React from 'react';

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

function SearchBox({ searchTerm, setSearchTerm }: SearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="지역을 검색하세요"
      />
      <button type='button' onClick={() => { /* 검색 로직 추가 */ }}>검색</button>
    </div>
  );
}

export default SearchBox;
