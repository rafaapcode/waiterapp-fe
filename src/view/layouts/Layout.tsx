import { useAuth } from "@/hooks/useAuth";
import { UserRoles } from "@/types/Users";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import NotFoundOrg from "@/components/org/NotFoundOrg";
import { Outlet } from "react-router";

function Layout() {
  const { user } = useAuth();
  return (
    <main className="bg-[#FAFAFA] flex h-screen">
      <ToastContainer position="top-center" />
      {user.role === UserRoles.ADMIN && <Sidebar />}
      <section className="w-full h-full px-9">
        {!user.orgId && <NotFoundOrg />}
        {user.orgId && <Outlet />}
        {/* <UnpermissionlessPage /> */}
      </section>
    </main>
  );
}

export default Layout;
