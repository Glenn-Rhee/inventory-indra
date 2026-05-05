import { DataProductResponse } from "@/types";
import { create } from "zustand";

export interface UseDataStore {
  dataProduct: DataProductResponse["Product"];
  setDataProduct: (v: DataProductResponse["Product"]) => void;
  originalDataProduct: DataProductResponse["Product"];
  setOriginalDataProduct: (v: DataProductResponse["Product"]) => void;
}

export const useDataStore = create<UseDataStore>((set) => ({
  dataProduct: [],
  setDataProduct: (v) => set({ dataProduct: v }),
  originalDataProduct: [],
  setOriginalDataProduct: (v) => set({ originalDataProduct: v }),
}));
