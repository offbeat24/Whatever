import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  latitude: number;
  longitude: number;
}

const initialState: LocationState = {
  latitude: 33.450701,
  longitude: 126.570667,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<LocationState>) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
