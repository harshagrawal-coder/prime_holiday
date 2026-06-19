import { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaImage, FaBold, FaItalic, FaList, FaLink } from "react-icons/fa";
import { blogPosts as defaultBlogs } from "../../data/blogPosts.js";

const BLOG_STORAGE_KEY = "prime-holiday-blogs";

const getStoredBlogs = () => {
  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
};

const Blog = () => {
  const [blogs, setBlogs] = useState(() => getStoredBlogs() || defaultBlogs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    readTime: "",
    excerpt: "",
    content: "",
    image: null,
    seoTitle: "",
    seoDescription: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const blogPayload = {
        ...formData,
        id: editingId || Date.now(),
        image: imagePreview || formData.image || "",
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      };
      const existing = localStorage.getItem(BLOG_STORAGE_KEY);
      const currentBlogs = existing ? JSON.parse(existing) : defaultBlogs;
      let updatedBlogs;
      if (editingId) {
        updatedBlogs = currentBlogs.map(b => b.id === editingId ? blogPayload : b);
      } else {
        updatedBlogs = [blogPayload, ...currentBlogs];
      }
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
      closeModal();
    } catch (err) {
      console.error("Failed to save blog:", err);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this blog?")) {
      const updatedBlogs = blogs.filter(b => b.id !== id);
      setBlogs(updatedBlogs);
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedBlogs));
    }
  };

  const openModal = (blog = null) => {
    if (blog) {
      setEditingId(blog.id);
      setFormData({
        title: blog.title,
        category: blog.category,
        author: blog.author,
        readTime: blog.readTime,
        excerpt: blog.excerpt,
        content: blog.content,
        image: null,
        imagePreview: blog.image,
        seoTitle: blog.seoTitle || "",
        seoDescription: blog.seoDescription || "",
      });
      setImagePreview(blog.image);
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        category: "Adventure",
        author: "Admin",
        readTime: "5 min read",
        excerpt: "",
        content: "",
        image: null,
        imagePreview: "",
        seoTitle: "",
        seoDescription: "",
      });
      setImagePreview("");
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

  const insertText = (before, after = "") => {
    const textarea = document.getElementById("blog-content");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content;
    const selected = text.substring(start, end);
    const newText = text.substring(0, start) + before + selected + after + text.substring(end);
    setFormData({ ...formData, content: newText });
  };

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = !search || b.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || b.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(blogs.map(b => b.category))];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Blog Posts</h1>
          <p className="text-sm text-slate-500">Manage blog posts with rich content</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <FaPlus size={12} />
          New Post
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-sm text-slate-500">No blogs found</p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition">
              <div className="aspect-video bg-slate-100 relative">
                {blog.image ? (
                  <img src={blog.image?.startsWith("http") || blog.image?.startsWith("data:") ? blog.image : "https://placehold.co/600x400?text=No+Image"} alt={blog.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    <FaImage size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openModal(blog)}
                    className="rounded-full bg-white p-2 text-slate-600 shadow hover:text-orange-500"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="rounded-full bg-white p-2 text-slate-600 shadow hover:text-red-500"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                    {blog.category}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 truncate">{blog.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{blog.author} • {blog.readTime}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {editingId ? "Edit Blog Post" : "New Blog Post"}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Adventure">Adventure</option>
                    <option value="Nature">Nature</option>
                    <option value="Culture">Culture</option>
                    <option value="Beach">Beach</option>
                    <option value="Mountain">Mountain</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="5 min read"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm file:mr-2 file:rounded-lg file:border-0 file:bg-orange-100 file:px-3 file:py-1 file:text-xs file:font-medium file:text-orange-700"
                  />
                </div>
              </div>

              {imagePreview && (
                <div className="mb-2">
                  <img src={imagePreview.startsWith("http") || imagePreview.startsWith("data:") ? imagePreview : "https://placehold.co/600x400?text=No+Image"} alt="Preview" className="h-32 w-full object-cover rounded-lg" />
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  rows={2}
                  placeholder="Short description..."
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Content</label>
                <div className="mb-2 flex gap-1 rounded-lg border border-slate-200 border-b-0 p-2">
                  <button type="button" onClick={() => insertText("**", "**")} className="rounded p-2 text-slate-500 hover:bg-slate-100"><FaBold size={12} /></button>
                  <button type="button" onClick={() => insertText("*", "*")} className="rounded p-2 text-slate-500 hover:bg-slate-100"><FaItalic size={12} /></button>
                  <button type="button" onClick={() => insertText("- ")} className="rounded p-2 text-slate-500 hover:bg-slate-100"><FaList size={12} /></button>
                  <button type="button" onClick={() => insertText("[", "](url)")} className="rounded p-2 text-slate-500 hover:bg-slate-100"><FaLink size={12} /></button>
                </div>
                <textarea
                  id="blog-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                  rows={10}
                  placeholder="Write your blog content here... (Markdown supported)"
                />
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h4 className="mb-3 text-sm font-semibold text-slate-800">SEO Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">SEO Title</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">SEO Description</label>
                    <textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={closeModal} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
                  {editingId ? "Update" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
