import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '../../data/types';

interface HistoryState {
  places: Place[];
}

const initialState: HistoryState = {
  places: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<Place>) {
      state.places.push(action.payload);
    },
    removeHistory(state, action: PayloadAction<string>) {
      state.places = state.places.filter(place => place.id !== action.payload);
    },
  },
});

export const { addHistory, removeHistory } = historySlice.actions;
export default historySlice.reducer;
