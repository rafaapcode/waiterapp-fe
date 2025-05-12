import { Route, Routes } from "react-router";
import History from "../pages/History/history.page";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login.page";
import Menu from "../pages/Menu/menu.view";
import Users from "../pages/Users/users.view";
import Authentication from "./Authentication";
import Layout from "./Layout";

function Router() {
  return (
    <Routes>
      <Route element={<Authentication isPrivate={false}/>}>
        <Route index element={<Login />} />
      </Route>
      <Route element={<Authentication isPrivate/>}>
        <Route path="/app" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="history" element={<History />} />
          <Route path="menu" element={<Menu />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
