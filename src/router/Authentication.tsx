import { Navigate, Outlet } from "react-router";

function Authentication({ isPrivate }: {isPrivate: boolean}) {
  if (!window.localStorage) {
    return <Navigate to="/" replace />;
  }

  const token = localStorage.getItem("token")

  if (!token && isPrivate) {
    return <Navigate to="/" replace />;
  }

  if(token && !isPrivate) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
}

export default Authentication
