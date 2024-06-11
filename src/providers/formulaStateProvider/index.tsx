"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type FormulaStore, createStore } from "@/stores";

export const FormulaStateStoreContext =
  createContext<StoreApi<FormulaStore> | null>(null);

export interface StoreProviderProps {
  children: ReactNode;
}

export const FormulaStateProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<StoreApi<FormulaStore>>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return (
    <FormulaStateStoreContext.Provider value={storeRef.current}>
      {children}
    </FormulaStateStoreContext.Provider>
  );
};

export const useFormulaStore = <T,>(
  selector: (store: FormulaStore) => T
): T => {
  const storeContext = useContext(FormulaStateStoreContext);

  if (!storeContext) {
    throw new Error(`useStore must be use within GlobalStoreProvider`);
  }

  return useStore(storeContext, selector);
};
