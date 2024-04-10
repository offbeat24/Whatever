"use client"

import { useState, useEffect } from 'react';

interface APIItem {
  name: string;
}

const useAPIData = (): string[] => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(json => {
        const items = json.items.map((item: APIItem) => item.name);
        setData(items);
      })
      .catch(error => console.error('API 데이터 불러오기 실패:', error));
  }, []);

  return data;
};

export default useAPIData;