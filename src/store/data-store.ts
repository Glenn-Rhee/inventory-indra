import {
  DataProductResponse,
  DataStockResponse,
  DataTransactionResponse,
} from "@/types";
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

  dataTransaction: DataTransactionResponse["Transactions"];
  setDataTransaction: (v: DataTransactionResponse["Transactions"]) => void;
  originalDataTransaction: DataTransactionResponse["Transactions"];
  setOriginalDataTransaction: (
    v: DataTransactionResponse["Transactions"],
  ) => void;
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

  dataTransaction: [],
  originalDataTransaction: [],
  setDataTransaction: (v) => set({ dataTransaction: v }),
  setOriginalDataTransaction: (v) => set({ originalDataTransaction: v }),
}));
