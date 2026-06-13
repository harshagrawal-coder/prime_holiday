import { useState, useEffect } from "react";
import { FaChartLine, FaMoneyBillWave, FaUsers, FaSuitcaseRolling, FaArrowUp, FaArrowDown, FaCalendar, FaSearch } from "react-icons/fa";

const API_URL = "http://localhost:5000";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");
  
  const [stats, setStats] = useState({
    totalRevenue: 2450000,
    totalBookings: 156,
    totalUsers: 1240,
    totalTours: 28,
    revenueGrowth: 12.5,
    bookingsGrowth: 8.3,
    usersGrowth: 15.2,
    toursGrowth: 4.1,
  });

  const [topTours, setTopTours] = useState([
    { name: "Kashmir Premium", bookings: 45, revenue: 890000 },
    { name: "Goa Beach Escape", bookings: 38, revenue: 520000 },
    { name: "Leh-Ladakh Adventure", bookings: 28, revenue: 780000 },
    { name: "Kerala Backwaters", bookings: 22, revenue: 340000 },
    { name: "Rishikesh Spiritual", bookings: 18, revenue: 210000 },
  ]);

  const [monthlyData, setMonthlyData] = useState([
    { month: "Jan", revenue: 180000, bookings: 12 },
    { month: "Feb", revenue: 220000, bookings: 15 },
    { month: "Mar", revenue: 280000, bookings: 18 },
    { month: "Apr", revenue: 350000, bookings: 22 },
    { month: "May", revenue: 320000, bookings: 20 },
    { month: "Jun", revenue: 280000, bookings: 16 },
  ]);

  const [recentBookings, setRecentBookings] = useState([
    { id: "BK-1032", guest: "Amit Sharma", tour: "Kashmir Premium", amount: 45000, date: "2026-04-05", status: "confirmed" },
    { id: "BK-1031", guest: "Priya Gupta", tour: "Goa Beach Escape", amount: 28000, date: "2026-04-05", status: "pending" },
    { id: "BK-1030", guest: "Raj Patel", tour: "Leh-Ladakh Adventure", amount: 65000, date: "2026-04-04", status: "confirmed" },
    { id: "BK-1029", guest: "Simran Kaur", tour: "Kerala Backwaters", amount: 32000, date: "2026-04-04", status: "confirmed" },
  ]);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, toursRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/api/bookings`),
        fetch(`${API_URL}/api/tours`),
        fetch(`${API_URL}/api/users`),
      ]);

      const bookings = await bookingsRes.json();
      const tours = await toursRes.json();
      const users = await usersRes.json();

      const totalRevenue = bookings.reduce((sum, b) => sum + (parseInt(b.amount?.replace(/[^0-9]/g, "") || 0)), 0);

      setStats(prev => ({
        ...prev,
        totalBookings: bookings.length,
        totalTours: tours.length,
        totalUsers: users.length,
        totalRevenue,
      }));
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h1>
          <p className="text-sm text-slate-500">Track performance and insights</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FaMoneyBillWave size={18} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.revenueGrowth >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
              {Math.abs(stats.revenueGrowth)}%
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Total Revenue</p>
          <p className="text-xl font-bold text-slate-800">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <FaSuitcaseRolling size={18} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.bookingsGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.bookingsGrowth >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
              {Math.abs(stats.bookingsGrowth)}%
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Total Bookings</p>
          <p className="text-xl font-bold text-slate-800">{stats.totalBookings}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaUsers size={18} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.usersGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.usersGrowth >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
              {Math.abs(stats.usersGrowth)}%
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Total Users</p>
          <p className="text-xl font-bold text-slate-800">{stats.totalUsers}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FaChartLine size={18} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${stats.toursGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {stats.toursGrowth >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
              {Math.abs(stats.toursGrowth)}%
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500">Active Tours</p>
          <p className="text-xl font-bold text-slate-800">{stats.totalTours}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Revenue Overview</h3>
          <div className="flex items-end gap-2 h-48">
            {monthlyData.map((item, index) => (
              <div key={item.month} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t-lg bg-orange-500 transition-all hover:bg-orange-600"
                  style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                />
                <p className="mt-2 text-[10px] text-slate-500">{item.month}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Top Performing Tours</h3>
          <div className="space-y-3">
            {topTours.map((tour, index) => (
              <div key={tour.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800 truncate">{tour.name}</p>
                    <p className="text-sm font-semibold text-slate-800">₹{(tour.revenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-orange-500"
                      style={{ width: `${(tour.bookings / topTours[0].bookings) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-800">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Guest</th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Tour</th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Amount</th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{booking.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{booking.guest}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{booking.tour}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">₹{booking.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      booking.status === "confirmed" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
