import { useState, useEffect } from "react";
import { API_URI } from "../../config/config.js";
import {
  FaGlobeAsia,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
const Regions = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // console.log("Token from localStorage:", token);
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URI}/api/region/${editingId}`
        : `${API_URI}/api/region`;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to create region");
      }
      if (editingId) {
        setItems((prev) =>
          prev.map((item) => (item._id === editingId ? data.region : item)),
        );
      } else {
        setItems((prev) => [data.region, ...prev]);
      }
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchRegion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URI}/api/region`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "failed to fetch regions");
      }
      setItems(data.regions);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRegion();
  }, []);
  const handleDelete = async (regionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this region?",
    );

    if (!confirmDelete) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URI}/api/region/${regionId}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete region");
      }
      setItems((prev) => prev.filter((item) => item._id !== regionId));
    } catch (error) {
      console.log(error.message)
    }
  };

  const toggleStatus = (id, current) => {
    persist(
      items.map((i) => (i._id === id ? { ...i, isActive: !current } : i)),
    );
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
          <h1 className="text-2xl font-bold text-slate-800">Regions</h1>
          <p className="text-sm text-slate-500">
            Manage geographic tour regions
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <FaPlus size={12} /> Add Region
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
                  No regions yet. Add one to get started.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                        <FaGlobeAsia size={14} />
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
                {editingId ? "Edit Region" : "Add Region"}
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
                  Region Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="North India"
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

export default Regions;
