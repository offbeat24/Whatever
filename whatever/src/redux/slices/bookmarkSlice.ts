import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface BookmarkState {
  bookmarks: Place[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<Place>) {
      state.bookmarks.push(action.payload);
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter(place => place.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
