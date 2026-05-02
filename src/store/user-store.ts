import { Session } from "next-auth";
import { create } from "zustand";

interface UserStore {
  user: Session["user"] | null;
  setUser: (v: UserStore["user"]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (value) => set({ user: value }),
}));
