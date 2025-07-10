import SplashScreen from "@/components/SplashScreen/SplashScreen";
import { CONSTANTS } from "@/constants";
import { UsersService } from "@/services/api/users";
import { UserRoles } from "@/types/Users";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserContext {
  id: string;
  orgId?: string;
  role?: UserRoles;
}

interface AuthStateValue {
  user: {
    id: string;
    orgId: string;
    role?: UserRoles;
    orgImageUrl: string;
    orgName: string;
  };
  setUser: (user: UserContext) => void;
  setOrgInfo: (props: { imgUrl: string; orgId: string; name: string }) => void;
}

export const AuthenticatioContext = createContext(
  {} as AuthStateValue & {
    isSignedIn: boolean;
    signIn: (acess_token: string, refresh_token: string) => void;
    signOut: () => void;
  }
);

export default function AuthenticationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(CONSTANTS.TOKEN);

    return !!storedAccessToken;
  });
  const useUser = create<AuthStateValue>()(
    persist(
      (set) => ({
        user: {
          id: "",
          orgId: "",
          orgImageUrl: "",
          orgName: "",
          role: UserRoles.CLIENT,
          signedIn: false,
        },
        setUser: (user: UserContext) =>
          set({
            user: {
              id: user.id,
              orgId: user.orgId || "",
              role: user.role || UserRoles.CLIENT,
              orgImageUrl: "",
              orgName: "",
            },
          }),
        setOrgInfo: (props: { imgUrl: string; orgId: string; name: string }) =>
          set((state) => ({
            ...state,
            user: {
              id: state.user.id,
              orgId: props.orgId,
              orgImageUrl: props.imgUrl,
              orgName: props.name,
              role: state.user.role
            },
          })),
      }),
      {
        name: "user",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );

  const { isError, isFetching, isSuccess } = useQuery({
    enabled: signedIn,
    queryKey: ['user', 'me'],
    queryFn: () => UsersService.getMe(),
    staleTime: Infinity
  });

  const signIn = useCallback((acess_token: string, refresh_token: string) => {
    localStorage.setItem(CONSTANTS.TOKEN, acess_token);
    localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh_token);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(CONSTANTS.TOKEN);
    setSignedIn(false);
  }, []);

  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const setOrgInfo = useUser((state) => state.setOrgInfo);


  useEffect(() => {
    if(isError) {
      toast.error('Sua sessão expirou.');
      signOut();
    }
  }, [isError, signOut]);
  return (
    <AuthenticatioContext.Provider
      value={{
        user,
        setOrgInfo,
        setUser,
        signOut,
        isSignedIn: signedIn && isSuccess,
        signIn,
      }}
    >
      <SplashScreen isLoading={isFetching}/>
      {!isFetching && children}
    </AuthenticatioContext.Provider>
  );
}
