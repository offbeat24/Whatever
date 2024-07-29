import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './slices/locationSlice';
import placesReducer from './slices/placesSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import historyReducer from './slices/historySlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    places: placesReducer,
    bookmark: bookmarkReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;