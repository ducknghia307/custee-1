// ../redux/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, Persistor } from 'redux-persist';

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });

  const persistor = persistStore(store) as Persistor;
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['store']['dispatch'];
export type RootState = ReturnType<AppStore['store']['getState']>;
export type { Persistor };
