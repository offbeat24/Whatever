import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '../../data/types';

interface BookmarkState {
  places: Place[];
}

const initialState: BookmarkState = {
  places: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<Place>) {
      state.places.push(action.payload);
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.places = state.places.filter(place => place.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
