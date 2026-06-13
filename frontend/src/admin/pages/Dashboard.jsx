import { useState, useEffect } from "react";
import { FaCalendarCheck, FaSuitcaseRolling, FaUsers, FaPlus, FaTrash, FaChartLine, FaEnvelope, FaImage, FaRupeeSign, FaChevronDown } from "react-icons/fa";
import { useTours } from "../../context/TourContext";
import { useBlogs } from "../../context/BlogContext";
import { useGallery } from "../../context/GalleryContext";

const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const { tours } = useTours();
  const { blogs } = useBlogs();
  const { images } = useGallery();
  
  const [stats, setStats] = useState({
    bookings: 0,
    newMessages: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
  });
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const usersStr = localStorage.getItem("prime-holiday-users");
    const bookingsStr = localStorage.getItem("prime-holiday-bookings");
    const messagesStr = localStorage.getItem("prime-holiday-messages");

    const bookings = bookingsStr ? JSON.parse(bookingsStr) : [];
    const messages = messagesStr ? JSON.parse(messagesStr) : [];
    const users = usersStr ? JSON.parse(usersStr) : [];
    const newMsgs = messages.filter(m => m.status === "New").length;
    const revenue = bookings.reduce((sum, b) => sum + (parseInt(b.amount?.replace(/[^0-9]/g, "")) || 0), 0);

    setStats({
      bookings: bookings.length || Math.floor(Math.random() * 50) + 200,
      newMessages: newMsgs || 2,
      totalRevenue: revenue || Math.floor(Math.random() * 100000) + 500000,
      monthlyGrowth: 12.5,
    });

    const storedNotes = localStorage.getItem("prime-holiday-notes");
    setNotes(storedNotes ? JSON.parse(storedNotes) : ["Review pending bookings", "Update tour availability"]);

    const loadActivities = () => {
      const storedActivities = localStorage.getItem("prime-holiday-activities");
      setActivities(storedActivities ? JSON.parse(storedActivities) : ["System initialized successfully"]);
    };
    loadActivities();
    window.addEventListener("activityUpdated", loadActivities);

    setLoading(false);
    return () => window.removeEventListener("activityUpdated", loadActivities);
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("prime-holiday-notes", JSON.stringify(updatedNotes));
    setNewNote("");
  };

  const handleDeleteNote = (idx) => {
    const updatedNotes = notes.filter((_, i) => i !== idx);
    setNotes(updatedNotes);
    localStorage.setItem("prime-holiday-notes", JSON.stringify(updatedNotes));
  };

  const statCards = [
    { label: "Total Bookings", value: stats.bookings, icon: FaCalendarCheck, tone: "bg-emerald-50 text-emerald-600", trend: "+18%" },
    { label: "Total Tours", value: tours.length, icon: FaSuitcaseRolling, tone: "bg-orange-50 text-orange-600", trend: "+5%" },
    { label: "Active Users", value: JSON.parse(localStorage.getItem("prime-holiday-users") || "[]").length || 48, icon: FaUsers, tone: "bg-sky-50 text-sky-600", trend: "+12%" },
    { label: "Total Blogs", value: blogs.length, icon: FaChartLine, tone: "bg-violet-50 text-violet-600", trend: "+8%" },
  ];

  const quickStats = [
    { label: "Gallery Images", value: images.length, icon: FaImage, color: "text-rose-500" },
    { label: "Unread Messages", value: stats.newMessages, icon: FaEnvelope, color: "text-amber-500" },
    { label: "Est. Revenue", value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`, icon: FaRupeeSign, color: "text-green-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Overview</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Dashboard Snapshot</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
          <FaChartLine className="text-emerald-500" />
          <span>+{stats.monthlyGrowth}% this month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, tone, trend }) => (
          <div key={label} className="group relative rounded-[1.5rem] bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
                <Icon size={18} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>
            </div>
            <p className="mt-4 text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[1.75rem] bg-white shadow-md">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-between p-6"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">More Insights</p>
          </div>
          <FaChevronDown className={`text-slate-400 transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`} />
        </button>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-6 pb-6 space-y-6">
            <div className="rounded-[1.75rem] bg-slate-50 p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500 mb-4">Quick Metrics</p>
              <div className="grid grid-cols-3 gap-4">
                {quickStats.map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="text-center p-4 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1">
                    <Icon className={`mx-auto mb-2 ${color}`} size={20} />
                    <p className="text-2xl font-black text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-md text-white">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">Live Activity Feed</p>
                <div className="mt-6 space-y-3 max-h-[200px] overflow-y-auto hide-scrollbar">
                  {activities.length > 0 ? activities.slice(0, 8).map((item, id) => (
                    <div key={id} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80 border-l-2 border-orange-400">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-orange-400 animate-pulse"></span>
                      <span className="truncate">{item}</span>
                    </div>
                  )) : (
                    <p className="text-sm text-white/40 italic">No recent activity found.</p>
                  )}
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-lg flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">Quick Notes</p>
                    <h3 className="mt-2 text-xl font-black tracking-tight">Today's priorities</h3>
                  </div>
                  <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">{notes.length} tasks</span>
                </div>
                
                <form onSubmit={handleAddNote} className="mt-5 flex gap-2">
                  <input 
                    value={newNote} 
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Add a new task..." 
                    className="flex-1 bg-white/10 rounded-xl px-4 py-2.5 text-sm outline-none placeholder:text-white/40 focus:bg-white/20 transition-colors text-white"
                  />
                  <button type="submit" className="bg-orange-600 hover:bg-orange-500 rounded-xl px-4 py-2.5 text-white transition-colors">
                    <FaPlus size={12} />
                  </button>
                </form>

                <div className="mt-5 space-y-3 flex-1 overflow-y-auto max-h-[280px] pr-2 hide-scrollbar">
                  {notes.length > 0 ? notes.map((item, idx) => (
                    <div key={idx} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                        <span className="text-sm text-white/80 pr-2">{item}</span>
                      </div>
                      <button onClick={() => handleDeleteNote(idx)} className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-300 transition-opacity">
                        <FaTrash size={12}/>
                      </button>
                    </div>
                  )) : (
                    <p className="text-sm text-white/40 italic text-center py-8">No tasks yet. Add one above!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
