import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F7F7FB] font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 hide-scrollbar">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
