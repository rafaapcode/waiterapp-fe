import { Outlet, Route, Routes } from "react-router";
import Login from "./pages/Login/Login.page";
import Orders from "./pages/Orders/OrdersPage";

function Router() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route index element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default Router;
