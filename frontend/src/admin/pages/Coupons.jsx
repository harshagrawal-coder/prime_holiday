import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaTag, FaToggleOn, FaToggleOff, FaRandom } from "react-icons/fa";

const COUPONS_STORAGE_KEY = "prime-holiday-coupons";

const generateCouponCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PRIME";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const defaultCoupons = [
  { id: "cp-1", code: "PRIMEWELCOME", discount: "20", type: "percentage", expiryDate: "", usageLimit: "100", minPurchase: 0, maxDiscount: "2000", active: true, usageCount: 5, createdAt: new Date().toISOString() },
];

const Coupons = () => {
  const [coupons, setCoupons] = useState(() => {
    try {
      const stored = localStorage.getItem(COUPONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultCoupons;
    } catch { return defaultCoupons; }
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "percentage",
    expiryDate: "",
    usageLimit: "",
    minPurchase: 0,
    maxDiscount: "",
  });

  const saveCoupons = (updated) => {
    setCoupons(updated);
    localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coupon = {
      ...formData,
      id: editingId || `cp-${Date.now()}`,
      active: true,
      usageCount: 0,
    };
    if (editingId) {
      saveCoupons(coupons.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      saveCoupons([coupon, ...coupons]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this coupon?")) {
      saveCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const toggleActive = (id, currentActive) => {
    saveCoupons(coupons.map(c => c.id === id ? { ...c, active: !currentActive } : c));
  };

  const openModal = (coupon = null) => {
    if (coupon) {
      setEditingId(coupon.id);
      setFormData({
        code: coupon.code,
        discount: coupon.discount?.toString() || "",
        type: coupon.type || "percentage",
        expiryDate: coupon.expiryDate ? coupon.expiryDate.split("T")[0] : "",
        usageLimit: coupon.usageLimit?.toString() || "",
        minPurchase: coupon.minPurchase || 0,
        maxDiscount: coupon.maxDiscount?.toString() || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        code: generateCouponCode(),
        discount: "",
        type: "percentage",
        expiryDate: "",
        usageLimit: "",
        minPurchase: 0,
        maxDiscount: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const filteredCoupons = coupons.filter(c =>
    !search || c.code?.toLowerCase().includes(search.toLowerCase())
  );

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Coupons</h1>
          <p className="text-sm text-slate-500">Manage discount codes and promotions</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <FaPlus size={12} />
          Create Coupon
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search coupons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Discount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Expiry</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Usage</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCoupons.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-sm text-slate-500">
                  No coupons found.
                </td>
              </tr>
            ) : (
              filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-orange-600">{coupon.code}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-slate-800">
                      {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 capitalize">
                      {coupon.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {coupon.expiryDate ? (
                      <span className={isExpired(coupon.expiryDate) ? "text-red-500" : ""}>
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </span>
                    ) : (
                      "Never"
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {coupon.usageCount || 0} / {coupon.usageLimit || "∞"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      !coupon.active ? "bg-slate-100 text-slate-500" :
                      isExpired(coupon.expiryDate) ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    }`}>
                      {!coupon.active ? "Inactive" : isExpired(coupon.expiryDate) ? "Expired" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleActive(coupon.id, coupon.active)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-green-500"
                        title={coupon.active ? "Deactivate" : "Activate"}
                      >
                        {coupon.active ? <FaToggleOn size={18} /> : <FaToggleOff size={18} />}
                      </button>
                      <button
                        onClick={() => openModal(coupon)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-500"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
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
                {editingId ? "Edit Coupon" : "Create Coupon"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Coupon Code *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono uppercase focus:border-orange-500 focus:outline-none"
                    placeholder="SAVE20"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, code: generateCouponCode() })}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
                    title="Generate Code"
                  >
                    <FaRandom size={14} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Discount *</label>
                  <input
                    type="number"
                    required
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Usage Limit</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Min Purchase (₹)</label>
                  <input
                    type="number"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Max Discount (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="No limit"
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
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
