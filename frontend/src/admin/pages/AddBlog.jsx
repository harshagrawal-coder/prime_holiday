import { useState } from "react";
import { blogPosts as defaultBlogs } from "../../data/blogPosts.js";
import { readImageFileAsDataUrl } from "../../utils/readImageFileAsDataUrl";

const initialState = {
  title: "",
  category: "",
  author: "",
  readTime: "",
  excerpt: "",
  content: "",
};

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20";

const BLOG_STORAGE_KEY = "prime-holiday-blogs";

const AddBlog = () => {
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
    setUploadError("");
  };

  const handleImageUpload = async (event) => {
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
    setSubmitted(false);

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

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setUploadError("");
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setUploadError("");

    try {
      const newBlog = {
        ...formData,
        image: imagePreview || "",
      };

      const stored = localStorage.getItem(BLOG_STORAGE_KEY);
      const existing = stored ? JSON.parse(stored) : defaultBlogs;
      const updated = [{
        ...newBlog,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      }, ...existing];
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updated));

      setSubmitted(true);
      setUploadError("");
      setFormData(initialState);
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Add Blog</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Create New Post</h2>
      </div>

      <div className="rounded-[1.75rem] bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Blog Title" className={`${inputClassName} md:col-span-2`} required />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className={inputClassName} required />
          <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" className={inputClassName} required />
          <input name="readTime" value={formData.readTime} onChange={handleChange} placeholder="Read Time (e.g. 5 min read)" className={`${inputClassName} md:col-span-2`} />

          <label className="flex flex-col gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-3 text-sm text-slate-600 md:col-span-2">
            <span className="font-semibold text-slate-800">Upload blog image</span>
            <input 
              type="file" 
              accept="image/jpeg,image/jpg,image/png,image/webp" 
              onChange={handleImageUpload} 
              className="text-sm"
            />
            <span className="text-xs text-slate-500">
              {isUploadingImage ? "Processing image..." : "JPG, PNG up to 5MB"}
            </span>
          </label>

          {uploadError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 md:col-span-2">
              {uploadError}
            </div>
          ) : null}

          {imagePreview ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-800">Image Preview</p>
                <button type="button" onClick={handleRemoveImage} className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500">
                  Remove Image
                </button>
              </div>
              <img src={imagePreview} alt="Blog preview" className="h-56 w-full rounded-[1rem] object-cover" />
            </div>
          ) : null}

          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Short Excerpt"
            rows="3"
            className={`${inputClassName} resize-none md:col-span-2`}
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Full Blog Content"
            rows="8"
            className={`${inputClassName} resize-none md:col-span-2`}
          />

          <div className="md:col-span-2 flex items-center justify-between gap-4 pt-2">
            <p className="text-sm text-slate-500">Blog post will be saved locally.</p>
            <button 
              disabled={isSubmitting}
              className="rounded-full bg-slate-950 px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Publish Post"}
            </button>
          </div>
        </form>

        {submitted ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Blog post saved successfully!
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddBlog;
