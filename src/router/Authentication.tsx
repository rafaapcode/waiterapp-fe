import { Navigate, Outlet, useLocation } from "react-router";

function Authentication() {
  const location = useLocation();
  const pathname = location.pathname;

  if (!window.localStorage) {
    return <Navigate to="/" replace />;
  }

  const token = localStorage.getItem("token")

  if (!token && pathname.includes("/app")) {
    return <Navigate to="/" replace />;
  }

  if(token && pathname === "/") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Authentication
