"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from "../redux/store";
import type { AppStore } from "../redux/store";

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<{ store: AppStore; persistor: any } | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const { store, persistor } = storeRef.current;

  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
};

export default StoreProvider;
