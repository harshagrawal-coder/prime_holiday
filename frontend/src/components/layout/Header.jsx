import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
  const location = useLocation();

  const isAccountActive =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

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
                className={`font-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-orange-500 xl:text-xs ${
                  location.pathname === link.path ? "text-orange-500" : "text-white dark:text-slate-200"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/admin/login"
              className={`inline-flex items-center rounded-full border px-5 py-2.5 font-primary text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-500 hover:text-white xl:text-xs ${
                isAccountActive
                  ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "border-white/30 bg-white/10 text-white backdrop-blur-md"
              }`}
            >
              Sign In
            </Link>
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

        <Link
          to="/admin/login"
          onClick={() => setIsOpen(false)}
          className={`mt-4 inline-flex items-center justify-center rounded-full px-5 py-3 font-primary text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
            isAccountActive
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
              : "bg-slate-950 text-white"
          }`}
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
};

export default Header;
