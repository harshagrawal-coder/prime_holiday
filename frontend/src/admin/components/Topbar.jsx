import { FaBars, FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useState, useEffect } from "react";

const Topbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAdminAuth();
  const [unreadCount, setUnreadCount] = useState(3);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/85 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="rounded-2xl bg-slate-950 p-3 text-white lg:hidden"
          aria-label="Open admin sidebar"
        >
          <FaBars />
        </button>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-500">Admin Workspace</p>
          <h1 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Welcome back, {admin?.name ?? "Admin"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate("/admin/notifications")}
          className="relative rounded-full border border-slate-200 bg-white p-3 text-slate-500 shadow-sm transition-colors hover:text-orange-500"
        >
          <FaBell />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
        >
          <FaSignOutAlt size={11} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
