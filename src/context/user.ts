import { UserContext } from "@/types/Users";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: { id: string; orgId: string };
  setUser: (user: UserContext) => void;
  setOrgId: (orgId: string) => void;
  logout: () => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: { id: "", orgId: "" },
      setUser: (user: UserContext) =>
        set({ user: { id: user.id, orgId: user.orgId || '' } }),
      setOrgId: (orgId: string) =>
        set((state) => ({...state, user: {id: state.user.id, orgId: orgId}})),
      logout: () => set({ user: { id: "", orgId: "" } }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
