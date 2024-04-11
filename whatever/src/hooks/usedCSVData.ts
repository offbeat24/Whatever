import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = 'src/data/foods_list.csv';

export default async function usedCSVData () {
  const filePath = path.join(process.cwd(), DATA_FILE_PATH);
  const data = fs.readFileSync(filePath, 'utf8');
  const foodList = data.split('\n').map((row) => row.split(',')[0]);

  return foodList;
};