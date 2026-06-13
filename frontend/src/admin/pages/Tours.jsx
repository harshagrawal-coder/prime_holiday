import { useState, useEffect } from "react";
import { useTours } from "../../context/TourContext";
import { getStartingPrice } from "../../components/tour/tourUtils";
import { FaTimes } from "react-icons/fa";
import { readImageFileAsDataUrl } from "../../utils/readImageFileAsDataUrl";
import { tourService } from "../../services/api";

const getImageSrc = (image) => {
  if (!image) return "https://placehold.co/400x300?text=No+Image";
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  return `http://localhost:5000${image}`;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500";

const getEditablePrice = (tour) => {
  if (tour.price) return String(tour.price);
  const matchedPrice = String(tour.priceRange || "").match(/\d[\d,]*/);
  return matchedPrice ? matchedPrice[0] : "";
};

const createEditDraft = (tour) => ({
  ...tour,
  price: getEditablePrice(tour),
  bestTimeToVisit: tour.bestTimeToVisit || tour.bestTime || "",
  prec: tour.prec || tour.description || "",
});

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await tourService.getAll({ limit: 100 });
        const backendTours = res.data.tours || [];
        
        const mappedTours = backendTours.map(tour => ({
          id: tour._id,
          name: tour.title || tour.packageName || "",
          city: tour.location?.city || tour.city || "",
          state: tour.location?.state || tour.state || "",
          mood: tour.category || tour.mood || "",
          days: tour.duration || tour.days || "",
          price: tour.price || "",
          priceRange: tour.price ? `₹${tour.price}` : "",
          bestTimeToVisit: tour.bestTimeToVisit || "",
          prec: tour.description || tour.prec || "",
          image: tour.images?.[0] || tour.image || "",
          rating: tour.rating || "New",
          trending: tour.trending || false,
          featured: tour.featured || false,
        }));
        
        setTours(mappedTours);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
      }
    };
    fetchTours();
  }, []);

  const openEditModal = (tour) => {
    setEditingTour(createEditDraft(tour));
    setUploadError("");
    setIsUploadingImage(false);
    setImageFile(null);
    setImagePreview(tour.image || "");
  };

  const closeEditModal = () => {
    setEditingTour(null);
    setUploadError("");
    setIsUploadingImage(false);
    setImageFile(null);
    setImagePreview("");
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setUploadError("");

    try {
      const data = new FormData();
      data.append("name", editingTour.name);
      data.append("city", editingTour.city);
      data.append("state", editingTour.state);
      data.append("mood", editingTour.mood);
      data.append("days", editingTour.days);
      data.append("price", editingTour.price);
      data.append("bestTimeToVisit", editingTour.bestTimeToVisit);
      data.append("prec", editingTour.prec);
      
      if (imageFile) {
        data.append("images", imageFile);
      }

      const response = await tourService.update(editingTour.id, data);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.error || "Failed to update tour");
      }

      const updatedTour = response.data;
      setTours(tours.map(t => t.id === updatedTour.id ? updatedTour : t));
      closeEditModal();
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Please select a valid image (JPG, PNG, or JPEG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be less than 5MB");
      return;
    }

    setIsUploadingImage(true);
    setUploadError("");

    try {
      const image = await readImageFileAsDataUrl(file);
      setImageFile(file);
      setImagePreview(image);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleEditChange = (field, value) => {
    setEditingTour((current) => (current ? { ...current, [field]: value } : current));
    setUploadError("");
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setUploadError("");
  };

  const handleDeleteTour = async (id) => {
    if (window.confirm("Delete this tour?")) {
      try {
        await tourService.delete(id);
        setTours(tours.filter(t => t.id !== id));
      } catch (error) {
        console.error("Failed to delete tour:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Tours</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Tour Catalog</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {tours.slice(0, 12).map((tour) => (
          <div
            key={tour.id}
            className="rounded-[1.5rem] bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {tour.image ? (
              <img
                src={getImageSrc(tour.image)}
                alt={tour.name}
                className="mb-4 h-40 w-full rounded-[1rem] object-cover"
              />
            ) : null}
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                {tour.mood}
              </span>
              <span className="text-sm font-bold text-slate-500">{tour.days}</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-slate-900">{tour.name}</h3>
            <p className="mt-2 text-sm text-slate-500">
              {tour.city}, {tour.state}
            </p>
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-slate-900">
                  {getStartingPrice(tour.priceRange)}
                </span>
                <span className="text-sm font-bold text-slate-500">{tour.rating} rating</span>
              </div>
              <div className="mt-2 flex w-full gap-2">
                <button
                  onClick={() => openEditModal(tour)}
                  className="flex-1 rounded-full bg-slate-100 py-2 text-[10px] font-black uppercase text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTour(tour.id)}
                  className="flex-1 rounded-full bg-red-50 py-2 text-[10px] font-black uppercase text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingTour ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Edit Tour</h3>
              <button
                onClick={closeEditModal}
                className="p-2 text-slate-400 hover:text-slate-900"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                value={editingTour.name}
                onChange={(event) => handleEditChange("name", event.target.value)}
                className={inputClass}
                placeholder="Tour Name"
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={editingTour.city}
                  onChange={(event) => handleEditChange("city", event.target.value)}
                  className={inputClass}
                  placeholder="City"
                />
                <input
                  value={editingTour.state}
                  onChange={(event) => handleEditChange("state", event.target.value)}
                  className={inputClass}
                  placeholder="State"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={editingTour.days}
                  onChange={(event) => handleEditChange("days", event.target.value)}
                  className={inputClass}
                  placeholder="Days"
                />
                <input
                  value={editingTour.price}
                  onChange={(event) => handleEditChange("price", event.target.value)}
                  className={inputClass}
                  placeholder="Base Price"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={editingTour.mood}
                  onChange={(event) => handleEditChange("mood", event.target.value)}
                  className={inputClass}
                  placeholder="Category / Mood"
                />
                <input
                  value={editingTour.bestTimeToVisit}
                  onChange={(event) => handleEditChange("bestTimeToVisit", event.target.value)}
                  className={inputClass}
                  placeholder="Best time to visit"
                />
              </div>

              <label className="flex flex-col gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Replace image</span>
                <input 
                  type="file" 
                  accept="image/jpeg,image/jpg,image/png,image/webp" 
                  onChange={handleEditImageUpload} 
                  className="text-sm" 
                />
                <span className="text-xs text-slate-500">
                  {isUploadingImage
                    ? "Processing image..."
                    : "JPG, PNG up to 5MB. Leave empty to keep current image."}
                </span>
              </label>

              {uploadError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {uploadError}
                </div>
              ) : null}

              {imagePreview ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-800">
                      {imagePreview.startsWith("data:") ? "New Image Preview" : "Current Image"}
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    >
                      Remove Image
                    </button>
                  </div>
                  <img
                    src={imagePreview}
                    alt={editingTour.name}
                    className="h-64 w-full rounded-[1rem] object-cover"
                  />
                </div>
              ) : null}

              <textarea
                value={editingTour.prec}
                onChange={(event) => handleEditChange("prec", event.target.value)}
                className={`${inputClass} min-h-32 resize-none`}
                placeholder="Short tour description"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-orange-600 py-4 text-[12px] font-black uppercase tracking-widest text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Tours;
