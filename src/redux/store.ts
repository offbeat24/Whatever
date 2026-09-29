import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from './reduxStorage';
import searchReducer from './slices/searchSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import historyReducer from './slices/historySlice';
import mapReducer from './slices/mapSlice';
import selectedPlaceReducer from './slices/selectedPlaceSlice';
import randomReducer from './slices/randomSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  bookmark: bookmarkReducer,
  history: historyReducer,
  map: mapReducer,
  selectedPlace: selectedPlaceReducer,
  random: randomReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bookmark', 'history'], // 유지할 슬라이스를 지정합니다.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
