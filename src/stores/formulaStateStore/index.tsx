import { Formula, Variable } from "@prisma/client";
import { createStore as createZustandStore } from "zustand/vanilla";

export type FormulaStoreState = {
  rawState: string;
  searchQuery: string;
};

export type FormulaStoreActions = {
  updateRawState: (newValue: string) => void;
  applyTargetOption: (option: Variable | Formula, content: string) => void;
  setSearchQuery: (newValue: string) => void;
};

export type FormulaStore = FormulaStoreState & FormulaStoreActions;

export const defaultInitState: FormulaStoreState = {
  rawState: "",
  searchQuery: "",
};

export const createStore = (
  initState: FormulaStoreState = defaultInitState
) => {
  return createZustandStore<FormulaStore>()((set) => ({
    ...initState,
    updateRawState: (newValue: string) => set(() => ({ rawState: newValue })),
    setSearchQuery: (newValue: string) =>
      set(() => ({ searchQuery: newValue })),
    applyTargetOption: (option: Variable | Formula, content: string) =>
      set(({ searchQuery }) => {
        const state = content
          .trim()
          .replace(
            new RegExp(`${searchQuery}$`),
            `{{${Object.hasOwn(option, "state") ? "f" : "v"}:${option.id}}}`
          );

        return {
          rawState: state,
          searchQuery: "",
        };
      }),
  }));
};
