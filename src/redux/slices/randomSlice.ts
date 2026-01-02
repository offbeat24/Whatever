import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '../../data/types';

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
