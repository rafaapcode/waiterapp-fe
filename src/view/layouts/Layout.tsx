import NotFoundOrg from "@/components/org/NotFoundOrg";
import { useAuth } from "@/hooks/useAuth";
import { UserRoles } from "@/types/Users";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import UnpermissionlessPage from "../components/UnpermissionlessPage";

function Layout() {
  const { user } = useAuth();
  console.log(user.role);
  return (
    <main className="bg-[#FAFAFA] flex h-screen">
      <ToastContainer position="top-center" />
      {user.role === UserRoles.ADMIN && <Sidebar />}
      <section className="w-full h-full px-9">
        {user.role !== UserRoles.ADMIN && <UnpermissionlessPage />}
        {!user.orgId && <NotFoundOrg />}
        {user.orgId && <Outlet />}
      </section>
    </main>
  );
}

export default Layout;
