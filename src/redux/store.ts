import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import storage from 'redux-persist/lib/storage'; // Import storage from redux-persist
import { persistReducer, persistStore } from 'redux-persist';

// Create a persist configuration
const persistConfig = {
  key: 'root',
  storage, // Use the storage imported from redux-persist
  whitelist: ['auth'], // Only persist the auth reducer
};

// Create a persisted reducer
const rootReducer = combineReducers({
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  const store = configureStore({
    reducer: persistedReducer, // Use persisted reducer
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check
        immutableCheck: false, // Disable immutable check
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['store']['dispatch'];
export type RootState = ReturnType<AppStore['store']['getState']>;
