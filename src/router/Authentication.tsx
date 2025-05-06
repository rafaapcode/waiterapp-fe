import { useGetToken } from "@/hooks/useToken";
import { Navigate, Outlet } from "react-router";

function Authentication({ isPrivate }: {isPrivate: boolean}) {
  const token = useGetToken();

  if (!window.localStorage) {
    return <Navigate to="/" replace />;
  }

  if (!token && isPrivate) {
    return <Navigate to="/" replace />;
  }

  if(token && !isPrivate) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
}

export default Authentication
