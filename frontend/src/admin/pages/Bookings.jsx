import { useState } from "react";
import { FaSearch, FaFilter, FaDownload, FaEllipsisH, FaCheck, FaTimes, FaClock } from "react-icons/fa";

const BOOKINGS_STORAGE_KEY = "prime-holiday-bookings";

const statusOptions = [
  { value: "pending", label: "Pending", color: "orange" },
  { value: "confirmed", label: "Confirmed", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "red" },
];

const paymentOptions = [
  { value: "unpaid", label: "Unpaid", color: "red" },
  { value: "paid", label: "Paid", color: "green" },
  { value: "refunded", label: "Refunded", color: "gray" },
];

const defaultBookings = [
  { id: "BK-001", userName: "Guest User", tourName: "Sample Tour", date: new Date().toISOString().split("T")[0], status: "pending", payment: "unpaid", amount: "5000" },
];

const Bookings = () => {
  const [bookings, setBookings] = useState(() => {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultBookings;
    } catch { return defaultBookings; }
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);

  const saveBookings = (updatedBookings) => {
    setBookings(updatedBookings);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
  };

  const updateStatus = (id, status) => {
    saveBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    setOpenDropdown(null);
  };

  const deleteBooking = (id) => {
    if (window.confirm("Delete this booking?")) {
      saveBookings(bookings.filter(b => b.id !== id));
    }
    setOpenDropdown(null);
  };

  const exportCSV = () => {
    const headers = ["ID", "User Name", "Tour", "Date", "Amount", "Status", "Payment"];
    const rows = filteredBookings.map(b => [
      b.id,
      b.userName,
      b.tourName,
      b.date,
      b.amount,
      b.status,
      b.payment,
    ]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = !search || 
      b.userName.toLowerCase().includes(search.toLowerCase()) ||
      b.tourName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || b.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status) => {
    const s = statusOptions.find(o => o.value === status);
    if (!s) return "bg-gray-100 text-gray-600";
    const colors = {
      pending: "bg-orange-50 text-orange-600",
      confirmed: "bg-green-50 text-green-600",
      cancelled: "bg-red-50 text-red-600",
    };
    return colors[status] || colors.pending;
  };

  const getPaymentColor = (payment) => {
    const colors = {
      unpaid: "bg-red-50 text-red-600",
      paid: "bg-green-50 text-green-600",
      refunded: "bg-gray-50 text-gray-600",
    };
    return colors[payment] || colors.unpaid;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bookings</h1>
          <p className="text-sm text-slate-500">Manage tour bookings with search and filters</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <FaDownload size={12} />
          Export CSV
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, tour, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          {statusOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="all">All Payments</option>
          {paymentOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Tour</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Payment</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-sm text-slate-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{booking.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-slate-800">{booking.userName}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-[200px] truncate">{booking.tourName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{booking.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">₹{parseInt(booking.amount).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getPaymentColor(booking.payment)}`}>
                      {booking.payment}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === booking.id ? null : booking.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      >
                        <FaEllipsisH />
                      </button>
                      {openDropdown === booking.id && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                          <div className="border-b border-slate-100 px-3 py-2">
                            <p className="text-xs font-semibold text-slate-400">Change Status</p>
                          </div>
                          {statusOptions.map(o => (
                            <button
                              key={o.value}
                              onClick={() => updateStatus(booking.id, o.value)}
                              className="w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                            >
                              {o.label}
                            </button>
                          ))}
                          <div className="border-t border-slate-100 mt-1 pt-1">
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-slate-500">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>
    </div>
  );
};

export default Bookings;
