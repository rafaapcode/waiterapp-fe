import { Outlet, Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login.page";
import Orders from "../pages/Orders/OrdersPage";
import Layout from "./Layout";

function Router() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route element={<Outlet />}>
        <Route path="/app" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="history" element={<Orders />} />
          <Route path="menu" element={<Orders />} />
          <Route path="users" element={<Orders />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
