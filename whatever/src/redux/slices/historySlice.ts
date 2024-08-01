import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  places: any[];
}

const initialState: HistoryState = {
  places: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<any>) {
      state.places.push(action.payload);
    },
    removeHistory(state, action: PayloadAction<string>) {
      state.places = state.places.filter(place => place.id !== action.payload);
    },
  },
});

export const { addHistory, removeHistory } = historySlice.actions;
export default historySlice.reducer;
