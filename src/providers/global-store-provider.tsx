'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type GlobalStore,
  createGlobalStore,
  initGlobalStore,
} from '@/stores/global-store';

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

/** React context holding the global Zustand store instance. */
export const GlobalStoreContext = createContext<GlobalStoreApi | undefined>(
  undefined
);

/** Props for the GlobalStoreProvider component. */
export interface GlobalStoreProviderProps {
  children: ReactNode;
}

/** Provides the global store to the React component tree. */
export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<GlobalStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createGlobalStore(initGlobalStore());
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

/**
 * Hook to read values from the global store using a selector.
 */
export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be used within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};
