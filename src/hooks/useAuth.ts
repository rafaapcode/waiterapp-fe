import { AuthenticatioContext } from "@/store/auth/AuthenticationProvider";
import { use } from "react";

export function useAuth() {
  const ctx = use(AuthenticatioContext);

  if(!ctx) {
    throw new Error('Auth Context must be in a auth provider');
  }

  return ctx;
}
