import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarCheck2,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Heart,
  Settings,
  X,
} from "lucide-react";
import { useAdminAuth } from "../../admin/context/AdminAuthContext";
import { useUserAuth } from "../../context/UserAuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tour", path: "/tour" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const accountMenuRef = useRef(null);
  const { admin, isAuthenticated: isAdminAuth, logout: adminLogout } = useAdminAuth();
  const { user, isAuthenticated: isUserAuth, logout: userLogout } = useUserAuth();

  const isAuthenticated = isAdminAuth || isUserAuth;
  const isAccountActive =
    location.pathname === "/login" ||
    location.pathname === "/admin/login" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard");

  const adminLinks = [
    { name: "Content", path: "/admin", icon: LayoutDashboard, description: "Manage site" },
    { name: "Requests", path: "/admin/bookings", icon: CalendarCheck2, description: "See bookings" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, description: "My overview" },
    { name: "My Bookings", path: "/dashboard/bookings", icon: CalendarCheck2, description: "Manage trips" },
    { name: "Wishlist", path: "/dashboard/saved", icon: Heart, description: "Saved tours" },
    { name: "Profile", path: "/dashboard/profile", icon: Settings, description: "Account settings" },
  ];

  const accountLinks = isAdminAuth ? adminLinks : isUserAuth ? userLinks : [];
  const activeName = isAdminAuth ? admin?.name : isUserAuth ? user?.name : "";
  const activeEmail = isAdminAuth ? admin?.email : isUserAuth ? user?.email : "";
  const roleLabel = isAdminAuth ? "Admin" : isUserAuth ? "Traveler" : "";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    if (isAdminAuth) adminLogout();
    if (isUserAuth) userLogout();
    setIsOpen(false);
    setIsAccountMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="absolute left-0 top-0 z-[1000] w-full">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between md:h-28">
          <Link to="/" className="relative z-[1100]">
            <h1 className="font-primary text-base font-bold uppercase tracking-[0.2em] text-white drop-shadow-lg sm:text-xl md:text-2xl dark:text-white dark:drop-shadow-none">
              Prime <span className="text-orange-500">Holiday</span>
            </h1>
          </Link>

          <nav className="hidden items-center space-x-6 lg:flex xl:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsAccountMenuOpen(false)}
                className={`font-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-orange-500 xl:text-xs ${
                  location.pathname === link.path ? "text-orange-500" : "text-white dark:text-slate-200"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsAccountMenuOpen((open) => !open)}
                    className={`flex items-center gap-2 rounded-full border p-1 pr-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-500/10 ${
                    isAccountActive || isAccountMenuOpen
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-white/30 bg-white/10 backdrop-blur-md"
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
                    {activeName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-white transition-transform duration-300 ${
                      isAccountMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute right-0 top-full mt-3 w-72 rounded-3xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl transition-all duration-300 ${
                    isAccountMenuOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">{roleLabel}</p>
                    <p className="mt-1 text-sm font-bold text-white truncate">{activeName}</p>
                    <p className="text-xs text-slate-400 truncate">{activeEmail}</p>
                  </div>

                  <div className="mt-3 space-y-1">
                    {accountLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-300 hover:bg-white/10"
                        >
                          <span className="rounded-2xl bg-orange-500/15 p-2 text-orange-300">
                            <Icon size={16} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-white">{item.name}</span>
                            <span className="block text-xs text-slate-300">{item.description}</span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-orange-400/40 hover:bg-orange-500 hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className={`inline-flex items-center rounded-full border px-5 py-2.5 font-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-500 hover:text-white xl:text-xs ${
                  isAccountActive
                    ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "border-white/30 bg-white/10 text-white backdrop-blur-md"
                }`}
              >
                Sign In
              </Link>
            )}
          </nav>

          <button
            onClick={() => setIsOpen((open) => !open)}
            className={`z-[1100] p-2 transition-colors duration-300 lg:hidden ${
              isOpen ? "text-black" : "text-white"
            }`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[1050] bg-black/60 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <nav
        className={`fixed right-0 top-0 z-[1080] flex h-screen w-[min(80vw,280px)] transform flex-col space-y-4 bg-white px-6 pt-24 shadow-2xl transition-transform duration-500 ease-in-out sm:w-[350px] lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={`font-primary border-b border-gray-50 py-3 text-base font-bold uppercase tracking-[0.2em] transition-all ${
              location.pathname === link.path ? "translate-x-2 text-orange-500" : "text-black"
            }`}
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated ? (
          <div className="mt-4 rounded-3xl bg-slate-950 px-4 py-4 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">{roleLabel}</p>
            <p className="mt-1 text-sm font-bold truncate">{activeName}</p>
            <p className="text-xs text-slate-400 truncate">{activeEmail}</p>

            <div className="mt-4 space-y-2">
              {accountLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 text-sm font-semibold transition-all duration-300 hover:bg-orange-500"
                  >
                    <Icon size={16} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold transition-all duration-300 hover:border-orange-400 hover:bg-orange-500"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className={`mt-4 inline-flex items-center justify-center rounded-full px-5 py-3 font-primary text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
              isAccountActive
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "bg-slate-950 text-white"
            }`}
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
