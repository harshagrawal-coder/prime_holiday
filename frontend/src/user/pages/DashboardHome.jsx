import { useState } from "react";
import { FaWallet, FaSuitcaseRolling, FaHeart, FaPlaneArrival, FaArrowRight, FaChevronDown } from "react-icons/fa";
import { useUserAuth } from "../../context/UserAuthContext";

const DashboardHome = () => {
  const { user } = useUserAuth();
  const [showQuickLinks, setShowQuickLinks] = useState(false);

  const stats = [
    {
      label: "Total Bookings",
      value: "3",
      icon: FaSuitcaseRolling,
      accent: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Upcoming Trips",
      value: "1",
      icon: FaPlaneArrival,
      accent: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Wishlist Saved",
      value: "4",
      icon: FaHeart,
      accent: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      label: "Total Spent",
      value: "₹45,000",
      icon: FaWallet,
      accent: "text-sky-500",
      bg: "bg-sky-500/10",
    },
  ];

  const notifications = [
    {
      title: "Booking Confirmed!",
      desc: "Your Manali trip has been confirmed.",
      color: "bg-emerald-500",
    },
    {
      title: "Payment Success",
      desc: "Received ₹25,000 for upcoming booking.",
      color: "bg-sky-500",
    },
    {
      title: "Flash Offer Alive",
      desc: "Get 20% off on all Beach destinations today.",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="animate-fade-in space-y-12">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
              Dashboard
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-black uppercase italic leading-none tracking-tight text-slate-900 sm:text-5xl">
            Welcome Back, <span className="text-slate-200">{user?.name?.split(" ")[0] || "Traveler"}</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, accent, bg }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-orange-200"
          >
            <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} ${accent} transition-transform duration-300 group-hover:scale-110`}>
              <Icon size={22} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
              {label}
            </p>
            <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 to-slate-900 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.15)] lg:col-span-3">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          
          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                  Next Adventure
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase italic tracking-tight text-white">
                  Upcoming <span className="text-slate-600">Trips</span>
                </h3>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-400 transition-all hover:translate-x-1 hover:text-orange-300">
                View All <FaArrowRight />
              </button>
            </div>

            <div className="space-y-4">
              <div className="group/card cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-orange-500/30 hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-black text-white transition-colors group-hover/card:text-orange-400">
                      Manali Tri-Valley Escape
                    </h4>
                    <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
                      <span>12 Aug 2026</span>
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <span>5 Days</span>
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 transition-transform duration-300 group-hover/card:scale-110">
                    <FaPlaneArrival size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2">
          <button
            onClick={() => setShowQuickLinks(!showQuickLinks)}
            className="flex w-full items-center justify-between p-8 pb-4"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Quick Links</p>
            </div>
            <FaChevronDown className={`text-slate-400 transition-transform duration-300 ${showQuickLinks ? "rotate-180" : ""}`} />
          </button>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showQuickLinks ? "max-h-[500px] pb-8 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="px-8 space-y-5">
              <div className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-slate-50">
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Booking Confirmed!</h4>
                  <p className="mt-1 text-sm text-slate-500">Your Manali trip has been confirmed.</p>
                </div>
              </div>
              <div className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-slate-50">
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500 group-hover:scale-125 transition-transform" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Payment Success</h4>
                  <p className="mt-1 text-sm text-slate-500">Received ₹25,000 for upcoming booking.</p>
                </div>
              </div>
              <div className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-slate-50">
                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-500 group-hover:scale-125 transition-transform" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Flash Offer Alive</h4>
                  <p className="mt-1 text-sm text-slate-500">Get 20% off on all Beach destinations today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
