import { selector } from 'recoil';
import { savedPlacesState, historyState } from './atoms';

export const savedPlacesSelector = selector({
  key: 'savedPlacesSelector',
  get: ({ get }) => get(savedPlacesState),
});

export const historySelector = selector({
  key: 'historySelector',
  get: ({ get }) => get(historyState),
});