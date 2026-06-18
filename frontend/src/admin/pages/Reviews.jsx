import { useState } from "react";
import { FaCheck, FaTimes, FaStar, FaTrash, FaSearch, FaFilter } from "react-icons/fa";

const REVIEWS_STORAGE_KEY = "prime-holiday-reviews";

const defaultReviews = [
  { id: "r-1", userName: "Guest", userId: "user-1", tourName: "Sample Tour", rating: 5, comment: "Great tour!", status: "approved" },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultReviews;
    } catch { return defaultReviews; }
  });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const saveReviews = (updated) => {
    setReviews(updated);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  };

  const updateStatus = (id, status) => {
    saveReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReview = (id) => {
    if (window.confirm("Delete this review?")) {
      saveReviews(reviews.filter(r => r.id !== id));
    }
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = !search || 
      r.userName?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} size={12} className={i < rating ? "text-amber-400" : "text-gray-300"} />
    ));
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-orange-50 text-orange-600",
      approved: "bg-green-50 text-green-600",
      rejected: "bg-red-50 text-red-600",
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Review Moderation</h1>
          <p className="text-sm text-slate-500">Approve, reject, or delete user reviews</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
            {reviews.filter(r => r.status === "pending").length} Pending
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews..."
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
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">User</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Tour</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Comment</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-sm text-slate-500">
                  No reviews found.
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-slate-800">{review.userName}</div>
                    <div className="text-xs text-slate-500">{review.userId}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{review.tourName || "General"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-[250px] truncate">{review.comment}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusBadge(review.status)}`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {review.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(review.id, "approved")}
                            className="rounded-lg p-2 text-green-500 hover:bg-green-50"
                            title="Approve"
                          >
                            <FaCheck size={14} />
                          </button>
                          <button
                            onClick={() => updateStatus(review.id, "rejected")}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                            title="Reject"
                          >
                            <FaTimes size={14} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
