import { UserContext } from "@/types/Users";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useUser = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserContext | null) => set({ user }),
      setOrgId: (orgId: string) => set((state: UserContext) => ({user: state.id, orgId: orgId})),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
