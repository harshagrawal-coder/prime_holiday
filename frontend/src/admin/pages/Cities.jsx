import { useState } from "react";
import { FaCity, FaEdit, FaTrash, FaPlus, FaTimes, FaToggleOn, FaToggleOff } from "react-icons/fa";

const STORAGE_KEY = "prime-holiday-masterdata-cities";
const STATES_KEY = "prime-holiday-masterdata-states";
const REGIONS_KEY = "prime-holiday-masterdata-regions";

const defaultStates = [
  { _id: "s-1", name: "Uttarakhand", regionId: "r-1" },
  { _id: "s-2", name: "Kerala", regionId: "r-2" },
  { _id: "s-3", name: "Rajasthan", regionId: "r-4" },
];

const defaultRegions = [
  { _id: "r-1", name: "North India" },
  { _id: "r-2", name: "South India" },
  { _id: "r-4", name: "West India" },
];

const defaultData = [
  { _id: "c-1", name: "Rishikesh", slug: "rishikesh", stateId: "s-1", isActive: true, createdAt: new Date().toISOString() },
  { _id: "c-2", name: "Munnar", slug: "munnar", stateId: "s-2", isActive: true, createdAt: new Date().toISOString() },
  { _id: "c-3", name: "Jaipur", slug: "jaipur", stateId: "s-3", isActive: true, createdAt: new Date().toISOString() },
];

const getFromLS = (key, fallback) => {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; }
  catch { return fallback; }
};

const Cities = () => {
  const [items, setItems] = useState(() => getFromLS(STORAGE_KEY, defaultData));
  const [states] = useState(() => getFromLS(STATES_KEY, defaultStates));
  const [regions] = useState(() => getFromLS(REGIONS_KEY, defaultRegions));
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", stateId: "" });

  const persist = (updated) => {
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      _id: editingId || `c-${Date.now()}`,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      stateId: formData.stateId,
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
    if (window.confirm("Delete this city?")) {
      persist(items.filter(i => i._id !== id));
    }
  };

  const toggleStatus = (id, current) => {
    persist(items.map(i => i._id === id ? { ...i, isActive: !current } : i));
  };

  const getStateName = (id) => states.find(s => s._id === id)?.name || "Unknown";
  const getRegionForState = (stateId) => {
    const st = states.find(s => s._id === stateId);
    if (!st) return "Unknown";
    return regions.find(r => r._id === st.regionId)?.name || "Unknown";
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setFormData({ name: item.name, stateId: item.stateId });
    } else {
      setEditingId(null);
      setFormData({ name: "", stateId: states.length > 0 ? states[0]._id : "" });
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
          <h1 className="text-2xl font-bold text-slate-800">Cities</h1>
          <p className="text-sm text-slate-500">Manage cities under states</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600">
          <FaPlus size={12} /> Add City
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">State</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Region</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No cities yet. Add one to get started.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                        <FaCity size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-600">{getStateName(item.stateId)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">{getRegionForState(item.stateId)}</span>
                  </td>
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
              <h3 className="text-lg font-bold text-slate-800">{editingId ? "Edit City" : "Add City"}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">City Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none" placeholder="Rishikesh" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">State *</label>
                <select required value={formData.stateId} onChange={(e) => setFormData({ ...formData, stateId: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none">
                  <option value="">Select State</option>
                  {states.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
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

export default Cities;
