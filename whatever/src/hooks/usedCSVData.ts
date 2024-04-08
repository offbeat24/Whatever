import { useState, useEffect } from 'react';

const useCSVData = (): string[] => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    fetch('/foods_list.csv')
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n').map(row => row.split(',')[0]);
        setData(rows);
      })
      .catch(error => console.error('CSV 데이터 불러오기 실패:', error));
  }, []);

  return data;
};

export default useCSVData;