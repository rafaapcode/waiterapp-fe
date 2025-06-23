import NotFoundOrg from "@/components/org/NotFoundOrg";
import { useUser } from "@/context/user";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout() {
  const state = useUser((state: any) => state);
  console.log(state);
  return (
    <main className="bg-[#FAFAFA] flex h-screen">
      <ToastContainer position="top-center" />
      <Sidebar />
      <section className="w-full h-full px-9">
        {!state.orgId && <NotFoundOrg />}
        {state.orgId && <Outlet />}
      </section>
    </main>
  );
}

export default Layout;
