import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
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


const createNoopStorage = () => ({
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  });

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;

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