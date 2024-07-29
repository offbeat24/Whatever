import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface HistoryState {
  history: Place[];
}

const initialState: HistoryState = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<Place>) {
      state.history.push(action.payload);
    },
  },
});

export const { addToHistory } = historySlice.actions;
export default historySlice.reducer;
