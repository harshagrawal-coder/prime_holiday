import { useState, useEffect } from "react";
import { FaStar, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus, FaTimes } from "react-icons/fa";
import { testimonialService } from "../../services/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    rating: 5,
    message: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialService.getAll({ limit: 100 });
      const data = res.data.testimonials || res.data || [];
      setTestimonials(data.map(t => ({ ...t, id: t._id || t.id })));
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "imagePreview" && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingId) {
        await testimonialService.update(editingId, data);
      } else {
        await testimonialService.create(data);
      }
      fetchTestimonials();
      closeModal();
    } catch (err) {
      console.error("Failed to save testimonial:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      try {
        await testimonialService.delete(id);
        fetchTestimonials();
      } catch (err) {
        console.error("Failed to delete testimonial:", err);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "hidden" : "active";
    try {
      await testimonialService.update(id, { status: newStatus });
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        location: testimonial.location,
        rating: testimonial.rating,
        message: testimonial.message,
        image: null,
        imagePreview: testimonial.image,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        role: "",
        location: "",
        rating: 5,
        message: "",
        image: null,
        imagePreview: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} size={12} className={i < rating ? "text-amber-400" : "text-gray-300"} />
    ));
  };

  const preview = testimonials.find((t) => t.id === previewId);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Testimonials</h1>
          <p className="text-sm text-slate-500">Manage customer testimonials</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <FaPlus size={12} />
          Add Testimonial
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Image</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Rating</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-sm text-slate-500">
                  No testimonials yet. Add one to get started.
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    {testimonial.image ? (
                      <img
                        src={`http://localhost:5000${testimonial.image}`}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-slate-800">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">{renderStars(testimonial.rating)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        testimonial.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {testimonial.status === "active" ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewId(previewId === testimonial.id ? null : testimonial.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        title="Preview"
                      >
                        <FaStar size={14} />
                      </button>
                      <button
                        onClick={() => openModal(testimonial)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-orange-500"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
                      >
                        <FaTrash size={14} />
                      </button>
                      <button
                        onClick={() => toggleStatus(testimonial.id, testimonial.status)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-green-500"
                      >
                        {testimonial.status === "active" ? <FaToggleOn size={18} /> : <FaToggleOff size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Preview</h3>
              <button onClick={() => setPreviewId(null)} className="text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>
            <div className="flex flex-col items-center text-center">
              {preview.image ? (
                <img
                  src={`http://localhost:5000${preview.image}`}
                  alt={preview.name}
                  className="mb-4 h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-500">
                  {preview.name.charAt(0)}
                </div>
              )}
              <h4 className="text-xl font-bold text-slate-800">{preview.name}</h4>
              <p className="text-sm text-slate-500">{preview.role}</p>
              <p className="text-xs text-slate-400">{preview.location}</p>
              <div className="mt-2 flex gap-0.5">{renderStars(preview.rating)}</div>
              <p className="mt-4 text-sm text-slate-600">{preview.message}</p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Customer"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="New York, USA"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <FaStar
                        size={24}
                        className={star <= formData.rating ? "text-amber-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  rows={4}
                  placeholder="Write testimonial message..."
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm file:mr-2 file:rounded-lg file:border-0 file:bg-orange-100 file:px-3 file:py-1 file:text-xs file:font-medium file:text-orange-700"
                />
                {formData.imagePreview && (
                  <div className="mt-2">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                )}
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

export default Testimonials;
