// src/redux/slices/selectedPlaceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  y: number;
  x: number;
  category_group_code: string;
}

interface SelectedPlaceState {
  place: Place | null;
  type: string | null;
}

const initialState: SelectedPlaceState = {
  place: null,
  type: null,
};

const selectedPlaceSlice = createSlice({
  name: 'selectedPlace',
  initialState,
  reducers: {
    setSelectedPlace(state, action: PayloadAction<{ place: Place, type: string }>) {
      state.place = action.payload.place;
      state.type = action.payload.type;
    },
    clearSelectedPlace(state) {
      state.place = null;
      state.type = null;
    },
  },
});

export const { setSelectedPlace, clearSelectedPlace } = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;
