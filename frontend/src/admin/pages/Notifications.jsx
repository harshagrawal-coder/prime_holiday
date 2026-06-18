import { useState } from "react";
import { FaBell, FaCheck, FaTrash, FaEnvelope, FaSuitcaseRolling, FaExclamation, FaInfo, FaTimes } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "booking", title: "New Booking", message: "Amit Sharma booked Kashmir Premium", time: "2 min ago", read: false },
    { id: 2, type: "message", title: "New Message", message: "Rahul Verma sent a new inquiry", time: "15 min ago", read: false },
    { id: 3, type: "system", title: "System Update", message: "Server backup completed successfully", time: "1 hour ago", read: true },
    { id: 4, type: "booking", title: "Booking Confirmed", message: "Priya Gupta confirmed booking BK-1031", time: "2 hours ago", read: true },
    { id: 5, type: "message", title: "New Review", message: "5-star review on Goa Beach Escape", time: "3 hours ago", read: false },
  ]);
  const [filter, setFilter] = useState("all");

  const getIcon = (type) => {
    switch (type) {
      case "booking": return FaSuitcaseRolling;
      case "message": return FaEnvelope;
      case "system": return FaInfo;
      default: return FaBell;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "booking": return "bg-blue-50 text-blue-600";
      case "message": return "bg-purple-50 text-purple-600";
      case "system": return "bg-slate-50 text-slate-600";
      default: return "bg-orange-50 text-orange-600";
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
          <p className="text-sm text-slate-500">Stay updated with recent activity</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Mark all as read
            </button>
          )}
          <button
            onClick={clearAll}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "all" ? "bg-orange-500 text-white" : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "unread" ? "bg-orange-500 text-white" : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("booking")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "booking" ? "bg-orange-500 text-white" : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setFilter("message")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === "message" ? "bg-orange-500 text-white" : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          Messages
        </button>
      </div>

      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <FaBell className="mx-auto text-3xl text-slate-400 mb-2" />
            <p className="text-sm text-slate-500">No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md ${
                  !notification.read ? "border-l-4 border-l-orange-500" : ""
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconColor(notification.type)}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">{notification.title}</h4>
                    <span className="text-xs text-slate-400">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
                </div>
                <div className="flex items-center gap-1">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-500"
                      title="Mark as read"
                    >
                      <FaCheck size={12} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                    title="Delete"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
