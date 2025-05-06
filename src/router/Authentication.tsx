import { Navigate, Outlet } from "react-router";

function Authentication() {
  console.log("teste");
  if (!window.localStorage) {
    return <Navigate to="/" replace />;
  }
  console.log("teste");
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/" replace />;
  }
  console.log("teste");
  return <Outlet />;
}

export default Authentication
