import { useState } from "react";
import { FaCalendarCheck, FaHome, FaPlusCircle, FaSuitcaseRolling, FaTimes, FaUsers, FaEnvelope, FaImages, FaCog, FaLightbulb, FaComment, FaTag, FaGift, FaHistory, FaList, FaChartBar, FaBell, FaChevronDown, FaChevronRight, FaBlog, FaStar, FaThList, FaTicketAlt, FaClipboardList, FaClock, FaGlobeAsia, FaMapMarkerAlt, FaCity, FaSmile, FaDatabase } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const mainItems = [
  { label: "Dashboard", to: "/admin", icon: FaHome, end: true },
  { label: "Bookings", to: "/admin/bookings", icon: FaCalendarCheck, end: true },
  { label: "Tours", to: "/admin/tours", icon: FaSuitcaseRolling, end: true },
  { label: "Add Tour", to: "/admin/tours/new", icon: FaPlusCircle, parent: "Tours" },
  { label: "Blog", to: "/admin/blog", icon: FaBlog, end: true },
  { label: "Add Blog", to: "/admin/blog/new", icon: FaPlusCircle, parent: "Blog" },
  { label: "Users", to: "/admin/users", icon: FaUsers, end: true },
];

const moreItems = [
  { label: "Analytics", to: "/admin/analytics", icon: FaChartBar, end: true },
  { label: "Testimonials", to: "/admin/testimonials", icon: FaStar, end: true },
  { label: "Categories", to: "/admin/categories", icon: FaThList, end: true },
  { label: "Gallery", to: "/admin/gallery", icon: FaImages, end: true },
  { label: "Coupons", to: "/admin/coupons", icon: FaTicketAlt, end: true },
  { label: "Reviews", to: "/admin/reviews", icon: FaComment, end: true },
  { label: "Messages", to: "/admin/messages", icon: FaEnvelope, end: true },
  { label: "Notifications", to: "/admin/notifications", icon: FaBell, end: true },
  { label: "Activity", to: "/admin/activity", icon: FaClock, end: true },
  { label: "Settings", to: "/admin/settings", icon: FaCog, end: true },
];

const masterDataSubItems = [
  { label: "Regions", to: "/admin/masterdata/regions", icon: FaGlobeAsia },
  { label: "States", to: "/admin/masterdata/states", icon: FaMapMarkerAlt },
  { label: "Cities", to: "/admin/masterdata/cities", icon: FaCity },
  { label: "Moods", to: "/admin/masterdata/moods", icon: FaSmile },
  { label: "Durations", to: "/admin/masterdata/durations", icon: FaClock },
];

const Sidebar = ({ isOpen, onClose }) => {
  const [showMore, setShowMore] = useState(false);
  const [showMasterData, setShowMasterData] = useState(false);
  const location = useLocation();
  const isMasterDataActive = location.pathname.startsWith("/admin/masterdata");

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 flex-shrink-0 flex-col justify-between bg-[#0f172a] px-4 py-5 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:top-0 lg:z-auto lg:flex lg:w-64 lg:min-w-[250px] lg:translate-x-0`}
        style={{ backgroundColor: '#0f172a' }}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden focus:outline-none"
          aria-label="Close sidebar"
        >
          <FaTimes size={14} />
        </button>

        <div className="flex flex-col h-full">
          <div className="mb-6 px-1">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.32em] text-orange-400">
                Admin Panel
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight">
                Prime <span className="text-orange-500">Holiday</span>
              </h2>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-1 px-1 pb-4 hide-scrollbar">
            {mainItems.map(({ label, to, icon: Icon, end, parent }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : parent
                        ? "text-slate-500 pl-8 hover:bg-white/10 hover:text-white focus:outline-none"
                        : "text-slate-400 hover:bg-white/10 hover:text-white focus:outline-none"
                  }`
                }
              >
                <Icon size={14} />
                {label}
              </NavLink>
            ))}

            <div className="my-3 border-t border-white/10" />

            <button
              onClick={() => setShowMasterData(!showMasterData)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                isMasterDataActive
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FaDatabase size={14} />
                Master Data
              </div>
              {isMasterDataActive ? (
                <FaChevronDown size={11} />
              ) : (
                <FaChevronRight size={11} />
              )}
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showMasterData || isMasterDataActive ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="space-y-1 pl-2 pt-1">
                {masterDataSubItems.map(({ label, to, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                        isActive
                          ? "bg-orange-500/80 text-white"
                          : "text-slate-500 hover:bg-white/10 hover:text-slate-300 focus:outline-none"
                      }`
                    }
                  >
                    <Icon size={13} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="my-3 border-t border-white/10" />

            <button
              onClick={() => setShowMore(!showMore)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <FaList size={14} />
                More
              </div>
              <FaChevronDown className={`transition-transform duration-300 ${showMore ? "rotate-180" : ""}`} size={12} />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showMore ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="space-y-1 pl-2">
                {moreItems.map(({ label, to, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                        isActive
                          ? "bg-orange-500/80 text-white"
                          : "text-slate-500 hover:bg-white/10 hover:text-slate-300 focus:outline-none"
                      }`
                    }
                  >
                    <Icon size={13} />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-start gap-3 rounded-xl bg-white/5 px-3 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <FaLightbulb size={12} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-amber-400">Quick Tip 💡</p>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                Manage tours & bookings easily
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
