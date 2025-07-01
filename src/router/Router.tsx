import NotFound from "@/pages/NotFound/NotFound";
import InfoOrgs from "@/pages/Org/info";
import OrgRegister from "@/pages/Org/register";
import Profile from "@/pages/Profile/profile.page";
import { Route, Routes } from "react-router";
import History from "../pages/History/history.page";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login.page";
import Menu from "../pages/Menu/menu.page";
import Users from "../pages/Users/users.page";
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
          <Route path="profile" element={<Profile />} />
          <Route path="org" element={<InfoOrgs />} />
        </Route>
        <Route path="/org/register" element={<OrgRegister />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
