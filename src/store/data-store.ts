import { DataProductResponse, DataStockResponse } from "@/types";
import { create } from "zustand";

export interface UseDataStore {
  dataProduct: DataProductResponse["Product"];
  setDataProduct: (v: DataProductResponse["Product"]) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  originalDataProduct: DataProductResponse["Product"];
  setOriginalDataProduct: (v: DataProductResponse["Product"]) => void;

  dataStock: DataStockResponse["Products"];
  setDataStock: (v: DataStockResponse["Products"]) => void;
  originalDataStock: DataStockResponse["Products"];
  setOriginalDataStock: (v: DataStockResponse["Products"]) => void;
}

export const useDataStore = create<UseDataStore>((set) => ({
  dataProduct: [],
  setDataProduct: (v) => set({ dataProduct: v }),
  originalDataProduct: [],
  setOriginalDataProduct: (v) => set({ originalDataProduct: v }),
  isLoading: false,
  setIsLoading: (v) => set({ isLoading: v }),

  dataStock: [],
  originalDataStock: [],
  setDataStock: (v) => set({ dataStock: v }),
  setOriginalDataStock: (v) => set({ originalDataStock: v }),
}));
