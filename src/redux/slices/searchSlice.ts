import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  places: any[];
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
    setPlaces(state, action: PayloadAction<any[]>) {
      state.places = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
  },
});

export const { setPlaces, setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
