import NotFound from "@/pages/NotFound/NotFound";
import Profile from "@/pages/Profile/profile.page";
import InfoOrgs from "@/view/pages/org/info/index";
import OrgRegister from "@/view/pages/org/register/index";
import { Route, Routes } from "react-router";
import History from "../pages/History/history.page";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/menu.page";
import Users from "../pages/Users/users.page";
import Layout from "../view/layouts/Layout";
import Login from "../view/pages/login";
import AuthenticationGuard from "./AuthenticationGuard";

function Router() {
  return (
    <Routes>
      <Route element={<AuthenticationGuard isPrivate={false}/>}>
        <Route index element={<Login />} />
      </Route>
      <Route element={<AuthenticationGuard isPrivate/>}>
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
