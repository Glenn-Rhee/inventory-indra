import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UseImageUrl {
  imageUrl: string;
  setImageUrl: (v: UseImageUrl["imageUrl"]) => void;
}

export const useImageUrl = create<UseImageUrl>()(
  persist(
    (set) => ({
      imageUrl: "",
      setImageUrl: (v) => set({ imageUrl: v }),
    }),
    {
      name: "imageUrl",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        imageUrl: state.imageUrl,
      }),
    },
  ),
);
