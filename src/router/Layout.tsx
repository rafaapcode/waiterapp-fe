import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout() {
  return (
    <main className="bg-[#FAFAFA] flex h-screen">
      <ToastContainer position="top-center"/>
      <Sidebar />
      <section className="w-full h-full px-9">
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;
