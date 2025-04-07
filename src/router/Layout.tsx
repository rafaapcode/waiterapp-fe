import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout() {
  return (
    <main className="bg-[#FAFAFA] flex h-screen">
      <Sidebar />
      <section className="w-full h-full p-6">
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;
