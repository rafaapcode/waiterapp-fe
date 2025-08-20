import Profile from "@/pages/Profile/profile.page";
import Layout from "@/view/layouts/Layout";
import History from "@/view/pages/history";
import Home from "@/view/pages/home/index";
import Login from "@/view/pages/login";
import Menu from "@/view/pages/menu/index";
import NotFound from "@/view/pages/NotFound";
import InfoOrgs from "@/view/pages/org/info/index";
import OrgRegister from "@/view/pages/org/register/index";
import Users from "@/view/pages/users/index";
import { Route, Routes } from "react-router";
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
