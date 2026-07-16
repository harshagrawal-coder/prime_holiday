import { useState, useEffect } from "react";
import {
  FaSmile,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { API_URI } from "../../config/config";
const Moods = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = editingId ? `${API_URI}/mood/${editingId}` : `${API_URI}/mood`;
    let method = editingId ? "put" : "post";
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "Application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "mood not fetched");
    }
    if (editingId) {
      setItems((prev) =>
        prev.map((item) => (item._id === editingId ? data.mood : item)),
      );
    } else {
      setItems((prev) => [data.mood, ...prev]);
    }
    closeModal();
  };
  const fetchMoods = async (isActive) => {
    const token = localStorage.getItem("token");
    try {
      let url = `${API_URI}/mood`;
      if (isActive !== undefined) {
        url += `?isActive=${isActive}`;
      }
      const response = await fetch(url, {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "mood not fetched");
      }
      setItems(data.mood);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchMoods();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this mood?");
    if (!confirmDelete) {
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URI}/mood/${id}`, {
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete mood");
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
      const response = await fetch(`${API_URI}/mood/${id}/status`, {
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
      if (activeFilter === "all") {
        setItems((prev) =>
          prev.map((item) => (item._id === id ? data.mood : item)),
        );
      } else {
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {}
  };
  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({ name: item.name });
    } else {
      setEditingId(null);
      setFormData({ name: "" });
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
          <h1 className="text-2xl font-bold text-slate-800">Moods</h1>
          <p className="text-sm text-slate-500">Manage tour moods and vibes</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <FaPlus size={12} /> Add Mood
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setActiveFilter("all");
            fetchMoods();
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
            fetchMoods(true);
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
            fetchMoods(false);
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
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No moods yet. Add one to get started.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                        <FaSmile size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-800">
                        {item.name}
                      </span>
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
                        className={`rounded-lg p-2 hover:bg-slate-100 transition
${
  item.isActive
    ? "text-green-600 hover:text-green-700"
    : "text-red-500 hover:text-red-600"
}`}
                      >
                        {item.isActive ? (
                          <FaToggleOn size={22} />
                        ) : (
                          <FaToggleOff size={22} />
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
                {editingId ? "Edit Mood" : "Add Mood"}
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
                  Mood Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Adventure"
                />
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

export default Moods;
