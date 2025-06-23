import { UserContext } from "@/types/Users";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: { id: string; orgId: string; orgImageUrl: string; orgName: string; };
  setUser: (user: UserContext) => void;
  setOrgInfo: (props: {imgUrl: string;orgId: string; name: string;}) => void;
  logout: () => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: { id: "", orgId: "", orgImageUrl: "", orgName: '' },
      setUser: (user: UserContext) =>
        set({
          user: { id: user.id, orgId: user.orgId || "", orgImageUrl: "", orgName: '' },
        }),
      setOrgInfo: (props: {imgUrl: string;orgId: string; name: string;}) =>
        set((state) => ({
          ...state,
          user: {
            id: state.user.id,
            orgId: props.orgId,
            orgImageUrl: props.imgUrl,
            orgName: props.name
          },
        })),
      logout: () => set({ user: { id: "", orgId: "", orgImageUrl: "", orgName: "" } }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
