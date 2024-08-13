import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  y: number;
  x: number;
  category_group_code: string;
}

interface SelectedPlace {
  place: Place;
  type: string;
}

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
