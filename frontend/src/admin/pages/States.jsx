import { useState } from "react";
import { FaMapMarkerAlt, FaEdit, FaTrash, FaPlus, FaTimes, FaToggleOn, FaToggleOff } from "react-icons/fa";

const STORAGE_KEY = "prime-holiday-masterdata-states";
const REGIONS_KEY = "prime-holiday-masterdata-regions";

const defaultRegions = [
  { _id: "r-1", name: "North India" },
  { _id: "r-2", name: "South India" },
  { _id: "r-3", name: "East India" },
  { _id: "r-4", name: "West India" },
  { _id: "r-5", name: "North East India" },
];

const defaultData = [
  { _id: "s-1", name: "Uttarakhand", slug: "uttarakhand", regionId: "r-1", isActive: true, createdAt: new Date().toISOString() },
  { _id: "s-2", name: "Kerala", slug: "kerala", regionId: "r-2", isActive: true, createdAt: new Date().toISOString() },
  { _id: "s-3", name: "Rajasthan", slug: "rajasthan", regionId: "r-4", isActive: true, createdAt: new Date().toISOString() },
];

const getRegions = () => {
  try { const s = localStorage.getItem(REGIONS_KEY); return s ? JSON.parse(s) : defaultRegions; }
  catch { return defaultRegions; }
};

const States = () => {
  const [items, setItems] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : defaultData; }
    catch { return defaultData; }
  });
  const [regions] = useState(() => getRegions());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", regionId: "" });

  const persist = (updated) => {
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      _id: editingId || `s-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      regionId: formData.regionId,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    if (editingId) {
      persist(items.map(i => i._id === editingId ? { ...i, ...entry } : i));
    } else {
      persist([entry, ...items]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this state?")) {
      persist(items.filter(i => i._id !== id));
    }
  };

  const toggleStatus = (id, current) => {
    persist(items.map(i => i._id === id ? { ...i, isActive: !current } : i));
  };

  const getRegionName = (id) => regions.find(r => r._id === id)?.name || "Unknown";

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({ name: item.name, regionId: item.regionId });
    } else {
      setEditingId(null);
      setFormData({ name: "", regionId: regions.length > 0 ? regions[0]._id : "" });
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
          <h1 className="text-2xl font-bold text-slate-800">States</h1>
          <p className="text-sm text-slate-500">Manage states under geographic regions</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
          <FaPlus size={12} /> Add State
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Region</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No states yet. Add one to get started.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                        <FaMapMarkerAlt size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{getRegionName(item.regionId)}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{item.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${item.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openModal(item)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-500"><FaEdit size={14} /></button>
                      <button onClick={() => toggleStatus(item._id, item.isActive)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-green-500">
                        {item.isActive ? <FaToggleOn size={18} /> : <FaToggleOff size={18} />}
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"><FaTrash size={14} /></button>
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
              <h3 className="text-lg font-bold text-slate-800">{editingId ? "Edit State" : "Add State"}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">State Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Uttarakhand" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Region *</label>
                <select required value={formData.regionId} onChange={(e) => setFormData({ ...formData, regionId: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  <option value="">Select Region</option>
                  {regions.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">{editingId ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default States;
