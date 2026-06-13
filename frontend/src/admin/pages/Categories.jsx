import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaFolder, FaImage, FaBook, FaSuitcase } from "react-icons/fa";
import { categoryService } from "../../services/api";

const iconOptions = [
  { value: "fa-folder", label: "Folder", icon: FaFolder },
  { value: "fa-image", label: "Image", icon: FaImage },
  { value: "fa-book", label: "Blog", icon: FaBook },
  { value: "fa-suitcase", label: "Tour", icon: FaSuitcase },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", icon: "fa-folder" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getAll({ limit: 100 });
      const data = res.data.categories || res.data || [];
      setCategories(data.map(c => ({ ...c, id: c._id || c.id })));
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await categoryService.update(editingId, formData);
      } else {
        await categoryService.create(formData);
      }
      fetchCategories();
      closeModal();
    } catch (err) {
      console.error("Failed to save category:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await categoryService.delete(id);
        fetchCategories();
      } catch (err) {
        console.error("Failed to delete category:", err);
      }
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setFormData({ name: category.name, icon: category.icon });
    } else {
      setEditingId(null);
      setFormData({ name: "", icon: "fa-folder" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const getIconComponent = (iconName) => {
    const found = iconOptions.find((opt) => opt.value === iconName);
    return found ? found.icon : FaFolder;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
          <p className="text-sm text-slate-500">Manage tour, blog, and gallery categories</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <FaPlus size={12} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-sm text-slate-500">No categories yet. Add one to get started.</p>
          </div>
        ) : (
          categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <div
                key={category.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <IconComponent size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{category.name}</h3>
                  <p className="text-xs text-slate-500">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openModal(category)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-500"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit Category" : "Add Category"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Adventure"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {iconOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: opt.value })}
                      className={`flex flex-col items-center justify-center rounded-lg border p-3 transition ${
                        formData.icon === opt.value
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <opt.icon size={16} />
                      <span className="mt-1 text-[10px]">{opt.label}</span>
                    </button>
                  ))}
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

export default Categories;
