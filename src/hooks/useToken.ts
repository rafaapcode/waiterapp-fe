import { CONSTANTS } from "@/constants";

type SetTokenReturn = (token: string) => boolean;

export const useGetToken = (): string | null => {
  if (!window.localStorage) {
    return null;
  }

  return localStorage.getItem(CONSTANTS.TOKEN);
};

export const useSetToken = (): SetTokenReturn => {
  return (token: string): boolean => {
    if (!window.localStorage) {
      return false;
    }

    localStorage.setItem(CONSTANTS.TOKEN, token);
    return true;
  };
};
