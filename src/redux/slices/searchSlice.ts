import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '../../data/types';

interface SearchState {
  places: Place[];
  keyword: string;
}

const initialState: SearchState = {
  places: [],
  keyword: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<Place[]>) {
      state.places = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const { setPlaces, setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
