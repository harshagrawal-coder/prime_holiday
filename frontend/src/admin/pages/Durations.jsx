import { useState, useEffect } from "react";
import {
  FaClock,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { API_URI } from "../../config/config";
const Durations = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", nights: "", days: "" });
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId
      ? `${API_URI}/duration/${editingId}`
      : `${API_URI}/duration`;
    const method = editingId ? "put" : "post";
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "failed to create duration");
    }
    if (editingId) {
      setItems((prev) =>
        prev.map((item) => (item._id === editingId ? data.duration : item)),
      );
    } else {
      setItems((prev) => [data.duration, ...prev]);
    }
    closeModal();
  };
  const fetchDuration = async (isActive) => {
    try {
      let url = `${API_URI}/duration`;
      if (isActive !== undefined) {
        url += `?isActive=${isActive}`;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "failed to fetch duration");
      }
      setItems(data.durations)
      if (isActive === undefined) {
        setActiveFilter("all");
      } else if (isActive) {
        setActiveFilter("active");
      } else {
        setActiveFilter("inactive");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchDuration();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this duration?");
    if (!confirmDelete) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URI}/duration/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete duration");
      }
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleStatus = async (id, current) => {
    const newStatus = !current;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URI}/duration/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isActive: newStatus,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update duration status");
      }
      if (activeFilter === "all") {
        setItems((prev) =>
          prev.map((item) => (item._id === id ? data.duration : item)),
        );
      } else {
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({
        name: item.name,
        nights: String(item.nights),
        days: String(item.days),
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", nights: "", days: "" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Durations</h1>
          <p className="text-sm text-slate-500">
            Manage tour duration packages
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <FaPlus size={12} /> Add Duration
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveFilter("all");
            fetchDuration();
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition
      ${
        activeFilter === "all"
          ? "bg-orange-500 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
        >
          All
        </button>

        <button
          onClick={() => {
            setActiveFilter("active");
            fetchDuration(true);
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition
      ${
        activeFilter === "active"
          ? "bg-orange-500 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:bg-green-50"
      }`}
        >
          Active
        </button>

        <button
          onClick={() => {
            setActiveFilter("inactive");
            fetchDuration(false);
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition
      ${
        activeFilter === "inactive"
          ? "bg-orange-500 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:bg-red-50"
      }`}
        >
          Inactive
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Slug
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No durations yet. Add one to get started.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                        <FaClock size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-800">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        <FaSun size={10} /> {item.days} Days
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                        <FaMoon size={10} /> {item.nights} Nights
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {item.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${item.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openModal(item)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-500"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => toggleStatus(item._id, item.isActive)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-green-500"
                      >
                        {item.isActive ? (
                          <FaToggleOn size={18} />
                        ) : (
                          <FaToggleOff size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit Duration" : "Add Duration"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Duration Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Weekend Getaway"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Days *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.days}
                    onChange={(e) =>
                      setFormData({ ...formData, days: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Nights *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.nights}
                    onChange={(e) =>
                      setFormData({ ...formData, nights: e.target.value })
                    }
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Durations;
