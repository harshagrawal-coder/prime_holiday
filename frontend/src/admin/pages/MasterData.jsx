import { FaGlobeAsia, FaMapMarkerAlt, FaCity, FaSmile, FaClock, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Regions",
    description: "Manage geographic regions",
    icon: FaGlobeAsia,
    path: "/admin/masterdata/regions",
    color: "from-orange-500 to-amber-500",
    countLabel: "Regions",
  },
  {
    title: "States",
    description: "Manage states under regions",
    icon: FaMapMarkerAlt,
    path: "/admin/masterdata/states",
    color: "from-emerald-500 to-teal-500",
    countLabel: "States",
  },
  {
    title: "Cities",
    description: "Manage cities under states",
    icon: FaCity,
    path: "/admin/masterdata/cities",
    color: "from-sky-500 to-blue-500",
    countLabel: "Cities",
  },
  {
    title: "Moods",
    description: "Manage tour moods/vibes",
    icon: FaSmile,
    path: "/admin/masterdata/moods",
    color: "from-violet-500 to-purple-500",
    countLabel: "Moods",
  },
  {
    title: "Durations",
    description: "Manage tour durations",
    icon: FaClock,
    path: "/admin/masterdata/durations",
    color: "from-rose-500 to-pink-500",
    countLabel: "Durations",
  },
];

const MasterData = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">
          Data Management
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
          Master Data
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage all reference data used across the platform
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ title, description, icon: Icon, path, color }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="group relative overflow-hidden rounded-[1.75rem] bg-white p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className={`absolute right-0 top-0 h-32 w-32 -translate-y-6 translate-x-6 rounded-full bg-gradient-to-br ${color} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-110`} />
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
              <Icon className="text-xl text-white" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
              <span>Manage</span>
              <FaArrowRight size={10} />
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20">
            <FaGlobeAsia className="text-orange-400" size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Master Data Hierarchy</p>
            <p className="text-xs text-slate-400">
              Region → State → City | Mood & Duration are standalone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterData;
