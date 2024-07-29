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
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
