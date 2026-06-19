import { useState, useRef } from "react";
import { FaImages, FaUpload, FaTrash, FaSearch, FaCheck, FaTimes, FaTag, FaPlus, FaEdit, FaCloudUploadAlt } from "react-icons/fa";
import { galleryItems as defaultGallery } from "../../data/galleryItems.js";

const getImageSrc = (image) => {
  if (!image) return "https://placehold.co/400x400?text=No+Image";
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  return "https://placehold.co/400x400?text=No+Image";
};

const GALLERY_STORAGE_KEY = "prime-holiday-gallery";

const getStoredGallery = () => {
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
};

const Gallery = () => {
  const [images, setImages] = useState(() => getStoredGallery() || defaultGallery);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(f => 
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)
    );
    const newQueue = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
    }));
    setUploadQueue(prev => [...prev, ...newQueue]);
  };

  const removeFromQueue = (index) => {
    setUploadQueue(prev => prev.filter((_, i) => i !== index));
  };

  const uploadQueueFiles = async () => {
    for (let i = 0; i < uploadQueue.length; i++) {
      const { file, preview } = uploadQueue[i];
      const newImage = {
        id: `gallery-${Date.now()}-${i}`,
        title: "Gallery Upload",
        location: "Unknown",
        category: "General",
        image: preview,
        tags: [],
        heightClass: "h-[300px]",
      };
      const updatedImages = [newImage, ...images];
      setImages(updatedImages);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedImages));
    }
    setUploadQueue([]);
  };

  const deleteImage = (id) => {
    if (window.confirm("Delete this image?")) {
      const updatedImages = images.filter(img => img.id !== id);
      setImages(updatedImages);
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updatedImages));
      setSelectedImages(selectedImages.filter(imgId => imgId !== id));
    }
  };

  const deleteSelected = () => {
    if (window.confirm(`Delete ${selectedImages.length} selected images?`)) {
      selectedImages.forEach(id => deleteContextImage(id));
      setImages(images.filter(img => !selectedImages.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedImages(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filteredImages.map(img => img.id));
    }
  };

  const addTag = (imgId) => {
    const image = images.find(img => img.id === imgId);
    const tag = prompt("Enter tag name:");
    if (tag && image) {
      const newTags = [...(image.tags || []), tag];
      setImages(images.map(img => img.id === imgId ? { ...img, tags: newTags } : img));
    }
  };

  const filteredImages = images.filter(img => {
    const matchesSearch = !search || 
      img.title?.toLowerCase().includes(search.toLowerCase()) ||
      img.location?.toLowerCase().includes(search.toLowerCase()) ||
      img.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTag = !tagFilter || img.tags?.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(images.flatMap(img => img.tags || []))];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Media Manager</h1>
          <p className="text-sm text-slate-500">Upload, tag, and manage your images</p>
        </div>
        {selectedImages.length > 0 && (
          <button
            onClick={deleteSelected}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            <FaTrash size={12} />
            Delete Selected ({selectedImages.length})
          </button>
        )}
      </div>

      <div className={`mb-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition-colors ${
        isDragging ? "border-orange-500 bg-orange-50" : ""
      }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-3">
          <FaUpload className="text-3xl text-slate-400" />
          <div>
            <p className="font-medium text-slate-700">Drag and drop images here</p>
            <p className="text-sm text-slate-500">or</p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Browse Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {uploadQueue.length > 0 && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">{uploadQueue.length} files ready to upload</h3>
            <button
              onClick={uploadQueueFiles}
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              <FaUpload size={12} />
              Upload All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {uploadQueue.map((item, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                <img src={item.preview} alt="Preview" className="h-full w-full object-cover" />
                <button
                  onClick={() => removeFromQueue(index)}
                  className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white"
                >
                  <FaTimes size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search images by title, location, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        {allTags.length > 0 && (
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        )}
        <button
          onClick={selectAll}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <FaCheck size={12} />
          {selectedImages.length === filteredImages.length ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredImages.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-slate-300">
            <FaImages className="text-4xl text-slate-400 mb-3" />
            <p className="text-lg font-semibold text-slate-600">No images found</p>
            <p className="text-sm text-slate-500">Upload images or adjust filters</p>
          </div>
        ) : (
          filteredImages.map((img) => (
            <div
              key={img.id}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all ${
                selectedImages.includes(img.id) ? "border-orange-500" : "border-transparent"
              }`}
            >
              <div className="aspect-square bg-slate-100">
                <img
                  src={getImageSrc(img.image)}
                  alt={img.title}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <button
                onClick={() => toggleSelect(img.id)}
                className={`absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                  selectedImages.includes(img.id)
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-white bg-white/80 text-transparent hover:border-orange-500"
                }`}
              >
                <FaCheck size={12} />
              </button>

              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => addTag(img.id)}
                  className="rounded-full bg-white p-2 text-slate-600 shadow hover:text-orange-500"
                  title="Add Tag"
                >
                  <FaTag size={12} />
                </button>
                <button
                  onClick={() => deleteImage(img.id)}
                  className="rounded-full bg-white p-2 text-slate-600 shadow hover:text-red-500"
                  title="Delete"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-sm font-medium text-white truncate">{img.title}</p>
                <p className="text-xs text-white/70 truncate">{img.location}</p>
                {img.tags?.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {img.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-slate-500">
        {filteredImages.length} images • {selectedImages.length} selected
      </div>
    </div>
  );
};

export default Gallery;
