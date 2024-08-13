import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  y: number;
  x: number;
  category_group_code: string;
}

interface RandomPlaceState {
  randomPlace: Place | null;
}

const initialState: RandomPlaceState = {
  randomPlace: null,
};

const randomPlaceSlice = createSlice({
  name: 'randomPlace',
  initialState,
  reducers: {
    setRandomPlace(state, action: PayloadAction<Place | null>) {
      state.randomPlace = action.payload;
    },
    clearRandomPlace(state) {
      state.randomPlace = null;
    },
  },
});

export const { setRandomPlace, clearRandomPlace } = randomPlaceSlice.actions;
export default randomPlaceSlice.reducer;
