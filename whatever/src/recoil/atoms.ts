import { atom } from 'recoil';

export interface Place {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  url: string;
  dist: number;
}

export const savedPlacesState = atom<Place[]>({
  key: 'savedPlacesState',
  default: [],
});

export const historyState = atom<Place[]>({
  key: 'historyState',
  default: [],
});