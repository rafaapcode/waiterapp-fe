import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

function AuthenticationGuard({ isPrivate }: { isPrivate: boolean }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn && isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (isSignedIn && !isPrivate) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
}

export default AuthenticationGuard;
