import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  center: {
    latitude: number;
    longitude: number;
  };
}

const initialState: MapState = {
  center: {
    latitude: 33.450701,
    longitude: 126.570667,
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter(state, action: PayloadAction<{ latitude: number; longitude: number }>) {
      state.center = action.payload;
    },
  },
});

export const { setCenter } = mapSlice.actions;
export default mapSlice.reducer;