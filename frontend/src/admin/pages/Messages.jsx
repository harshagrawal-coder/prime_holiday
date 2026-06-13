import { useState, useEffect } from "react";
import { FaEnvelope, FaCheck, FaClock, FaUser, FaEnvelopeOpen } from "react-icons/fa";

const API_URL = "http://localhost:5000";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
      setMessages([
        { id: 1, name: "Arjun Mehta", email: "arjun@example.com", subject: "Kashmir Tour Info", msg: "Hey! Can I book the 5-day Kashmir family package for next month?", date: "Today", status: "New" },
        { id: 2, name: "Sneha Rao", email: "sneha@example.com", subject: "Group Discount", msg: "We are a group of 12 looking for an adventure trip. Any bulk discounts?", date: "Yesterday", status: "New" },
        { id: 3, name: "Rahul Verma", email: "rahul@example.com", subject: "Wedding Anniversary", msg: "Looking for a romantic destination for our 10th anniversary in June.", date: "2 days ago", status: "Resolved" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleResolve = async (id) => {
    const msg = messages.find(m => m.id === id);
    const newStatus = msg.status === "New" ? "Resolved" : "New";
    
    setMessages(msgs => 
      msgs.map(m => m.id === id ? { ...m, status: newStatus } : m)
    );

    try {
      await fetch(`${API_URL}/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const filteredMessages = filter === "all" ? messages : messages.filter(m => m.status === filter);
  const newCount = messages.filter(m => m.status === "New").length;
  const resolvedCount = messages.filter(m => m.status === "Resolved").length;

  const getStatusIcon = (status) => {
    return status === "New" ? <FaEnvelope className="text-xs" /> : <FaEnvelopeOpen className="text-xs" />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Messages</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Contact Inquiries</h2>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Messages</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Contact Inquiries</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-full bg-white p-1 shadow-md">
            <button 
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${filter === "all" ? "bg-orange-500 text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              All ({messages.length})
            </button>
            <button 
              onClick={() => setFilter("New")}
              className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${filter === "New" ? "bg-orange-500 text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              New ({newCount})
            </button>
            <button 
              onClick={() => setFilter("Resolved")}
              className={`rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${filter === "Resolved" ? "bg-orange-500 text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700 flex items-center gap-2">
          <FaClock className="text-yellow-500" />
          Using offline data. Server error: {error}
        </div>
      )}

      {newCount > 0 && filter !== "Resolved" && (
        <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <FaEnvelope className="text-white" />
              </div>
              <div>
                <p className="font-bold">{newCount} new message{newCount > 1 ? "s" : ""} pending</p>
                <p className="text-xs text-white/80">Click to mark as resolved</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {filteredMessages.length > 0 ? filteredMessages.map((m, index) => (
          <div 
            key={m.id} 
            className={`group relative overflow-hidden rounded-[1.5rem] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${m.status === "Resolved" ? "bg-slate-50 border border-slate-100" : "bg-white border border-transparent"}`}
          >
            {m.status === "New" && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-[1.5rem]" />
            )}
            
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${m.status === "New" ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-500"}`}>
                  <FaUser className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-slate-900 text-lg truncate">{m.subject}</h3>
                    {m.status === "New" && (
                      <span className="shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">New</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{m.msg}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <FaUser className="text-orange-400" />
                      <span className="font-semibold text-slate-700">{m.name}</span>
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">{m.email}</span>
                    <span className="text-slate-400">•</span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-slate-400" />
                      {m.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 lg:shrink-0">
                <button 
                  onClick={() => toggleResolve(m.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${m.status === "New" ? "bg-orange-50 text-orange-600 hover:bg-orange-100 hover:-translate-y-0.5" : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:-translate-y-0.5"}`}
                >
                  {m.status === "New" ? <><FaCheck className="text-xs" /> Resolve</> : <><FaEnvelope className="text-xs" /> Reopen</>}
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 mb-4">
              <FaEnvelope className="text-3xl text-slate-400" />
            </div>
            <p className="text-lg font-black text-slate-400">No messages found</p>
            <p className="text-sm text-slate-400 mt-1">Messages will appear here when received</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
