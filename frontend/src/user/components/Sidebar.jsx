import { Link, NavLink } from "react-router-dom";
import { FaHome, FaSuitcaseRolling, FaHeart, FaUserCircle } from "react-icons/fa";

const navItems = [
  { label: "Overview", to: "/dashboard", icon: FaHome, end: true },
  { label: "My Bookings", to: "/dashboard/bookings", icon: FaSuitcaseRolling },
  { label: "Wishlist", to: "/dashboard/saved", icon: FaHeart },
  { label: "Profile Settings", to: "/dashboard/profile", icon: FaUserCircle },
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-col bg-white border-r border-slate-100 lg:flex sticky top-0 h-screen">
      <div className="flex h-20 items-center px-8 border-b border-slate-50">
        <Link to="/" className="text-xl font-black uppercase tracking-widest text-slate-900">
          Prime <span className="text-orange-600">Holiday</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-black text-xl">
            U
          </div>
          <div>
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider">Welcome back</p>
            <p className="text-sm font-bold text-slate-900 truncate w-32">Traveler</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              end={item.end}
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
