import NotFoundOrg from "@/components/org/NotFoundOrg";
import { useAuth } from "@/hooks/useAuth";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";

function Layout() {
  const { user } = useAuth();
  return (
    <main className="bg-[#FAFAFA] flex h-screen">
      <ToastContainer position="top-center" />
      <Sidebar />
      <section className="w-full h-full px-9">
        {!user.orgId && <NotFoundOrg />}
        {user.orgId && <Outlet />}
      </section>
    </main>
  );
}

export default Layout;
