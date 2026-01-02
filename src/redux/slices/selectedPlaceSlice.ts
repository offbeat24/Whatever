import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedPlace, PlaceType } from '../../data/types';

interface SelectedPlaceState {
  selectedPlaces: SelectedPlace[];
}

const initialState: SelectedPlaceState = {
  selectedPlaces: [],
};

const selectedPlaceSlice = createSlice({
  name: 'selectedPlace',
  initialState,
  reducers: {
    addOrUpdateSelectedPlace(state, action: PayloadAction<SelectedPlace>) {
      const { place, type } = action.payload;
      const existingIndex = state.selectedPlaces.findIndex(
        selected => selected.place.id === place.id
      );

      if (existingIndex !== -1) {
        if (state.selectedPlaces[existingIndex].type !== type) {
          state.selectedPlaces[existingIndex].type = type;
        }
      } else {
        state.selectedPlaces.push({ place, type });
      }
    },
    removeSelectedPlace(state, action: PayloadAction<string>) {
      state.selectedPlaces = state.selectedPlaces.filter(
        selected => selected.place.id !== action.payload
      );
    },
    clearSelectedPlaces(state) {
      state.selectedPlaces = [];
    },
  },
});

export const { addOrUpdateSelectedPlace, removeSelectedPlace, clearSelectedPlaces } = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;
