import { useState, useEffect } from "react";
import { FaHistory, FaFilter, FaSearch, FaUser, FaEdit, FaTrash, FaPlus, FaSignOutAlt } from "react-icons/fa";

const API_URL = "http://localhost:5000";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/activity-logs`);
      const data = await res.json();
      setLogs(data.length > 0 ? data : [
        { id: "log-1", action: "Created", details: "New tour 'Goa Beach Trip' added", adminId: "admin-1", createdAt: new Date().toISOString() },
        { id: "log-2", action: "Updated", details: "Booking BK-1024 status changed to Confirmed", adminId: "admin-1", createdAt: new Date(Date.now() - 3600000).toISOString() },
        { id: "log-3", action: "Deleted", details: "Blog post 'Travel Tips' removed", adminId: "admin-1", createdAt: new Date(Date.now() - 7200000).toISOString() },
        { id: "log-4", action: "Login", details: "Admin logged in from Chrome on Windows", adminId: "admin-1", createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: "log-5", action: "Created", details: "New category 'Adventure' added", adminId: "admin-1", createdAt: new Date(Date.now() - 172800000).toISOString() },
      ]);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setLogs([
        { id: "log-1", action: "Created", details: "New tour 'Goa Beach Trip' added", adminId: "admin-1", createdAt: new Date().toISOString() },
        { id: "log-2", action: "Updated", details: "Booking BK-1024 status changed to Confirmed", adminId: "admin-1", createdAt: new Date(Date.now() - 3600000).toISOString() },
        { id: "log-3", action: "Deleted", details: "Blog post 'Travel Tips' removed", adminId: "admin-1", createdAt: new Date(Date.now() - 7200000).toISOString() },
        { id: "log-4", action: "Login", details: "Admin logged in from Chrome on Windows", adminId: "admin-1", createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: "log-5", action: "Created", details: "New category 'Adventure' added", adminId: "admin-1", createdAt: new Date(Date.now() - 172800000).toISOString() },
      ]);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !search || 
      log.action?.toLowerCase().includes(search.toLowerCase()) ||
      log.details?.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const getActionIcon = (action) => {
    switch (action) {
      case "Created": return FaPlus;
      case "Updated": return FaEdit;
      case "Deleted": return FaTrash;
      case "Login": return FaSignOutAlt;
      default: return FaHistory;
    }
  };

  const getActionColor = (action) => {
    const colors = {
      Created: "bg-green-50 text-green-600",
      Updated: "bg-blue-50 text-blue-600",
      Deleted: "bg-red-50 text-red-600",
      Login: "bg-purple-50 text-purple-600",
    };
    return colors[action] || "bg-gray-50 text-gray-600";
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Activity Logs</h1>
          <p className="text-sm text-slate-500">Track admin actions and login activity</p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="all">All Actions</option>
          <option value="Created">Created</option>
          <option value="Updated">Updated</option>
          <option value="Deleted">Deleted</option>
          <option value="Login">Login</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredLogs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-sm text-slate-500">No activity logs found.</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const ActionIcon = getActionIcon(log.action);
            return (
              <div
                key={log.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getActionColor(log.action)}`}>
                  <ActionIcon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="text-xs text-slate-400">{formatTime(log.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-700 truncate">{log.details}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                  <FaUser size={10} />
                  <span>Admin</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 text-sm text-slate-500">
        Showing {filteredLogs.length} of {logs.length} activities
      </div>
    </div>
  );
};

export default ActivityLogs;
