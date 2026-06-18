import { useState, useEffect } from "react";
import { FaSave, FaCheck, FaGlobe, FaImage, FaLink } from "react-icons/fa";

const defaultSEO = {
  global: {
    siteName: "Prime Holiday",
    siteDescription: "Discover Your Next Adventure with Prime Holiday - Explore the most beautiful destinations",
    keywords: "travel, tour, adventure, vacation, holiday",
    ogImage: "",
  },
  homepage: {
    title: "Discover Your Next Adventure - Prime Holiday",
    description: "Explore the most beautiful destinations with Prime Holiday. Book tours, get expert travel guidance.",
    keywords: "travel agency, tour packages, adventure travel",
    ogImage: "",
  },
  tours: {
    title: "Best Tour Packages - Prime Holiday",
    description: "Browse our exclusive tour packages to the most amazing destinations in India.",
    keywords: "tour packages, travel packages, weekend getaway",
    ogImage: "",
  },
  blog: {
    title: "Travel Blog - Prime Holiday",
    description: "Read travel tips, destination guides and adventure stories from Prime Holiday.",
    keywords: "travel blog, travel tips, destination guide",
    ogImage: "",
  },
};

const SEOPanel = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("global");
  const [seoData, setSeoData] = useState(defaultSEO);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedSEO = localStorage.getItem("prime-holiday-seo");
    if (savedSEO) {
      try {
        setSeoData(JSON.parse(savedSEO));
      } catch (e) {
        console.log("Using default SEO data");
      }
    }
    setLoading(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    localStorage.setItem("prime-holiday-seo", JSON.stringify(seoData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const updateField = (section, field, value) => {
    setSeoData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      }
    }));
  };

  const tabs = [
    { id: "global", label: "Global Settings", icon: FaGlobe },
    { id: "homepage", label: "Homepage", icon: FaLink },
    { id: "tours", label: "Tours", icon: FaLink },
    { id: "blog", label: "Blog", icon: FaLink },
  ];

  const currentData = seoData[activeTab] || {};

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">SEO Settings</h1>
          <p className="text-sm text-slate-500">Configure meta tags and social sharing</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          <FaSave size={12} />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-700">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              {tabs.find(t => t.id === activeTab)?.label} SEO
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Meta Title</label>
                <input
                  type="text"
                  value={currentData.title || ""}
                  onChange={(e) => updateField(activeTab, "title", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Enter meta title"
                />
                <p className="mt-1 text-xs text-slate-400">
                  {(currentData.title || "").length}/60 characters (recommended)
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Meta Description</label>
                <textarea
                  value={currentData.description || ""}
                  onChange={(e) => updateField(activeTab, "description", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                  rows={3}
                  placeholder="Enter meta description"
                />
                <p className={`mt-1 text-xs ${(currentData.description || "").length > 160 ? "text-red-500" : "text-slate-400"}`}>
                  {(currentData.description || "").length}/160 characters (recommended)
                </p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Keywords</label>
                <input
                  type="text"
                  value={currentData.keywords || ""}
                  onChange={(e) => updateField(activeTab, "keywords", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="Enter keywords (comma separated)"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">OG Image (Social Share)</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={currentData.ogImage || ""}
                    onChange={(e) => updateField(activeTab, "ogImage", e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Enter image URL"
                  />
                  <label className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100">
                    <FaImage className="mr-2" />
                    Upload
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
                {currentData.ogImage && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                    <img src={currentData.ogImage} alt="OG Preview" className="h-32 w-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 p-4">
              <h4 className="mb-2 text-sm font-semibold text-slate-700">Preview</h4>
              <div className="rounded-lg bg-white p-3 shadow-sm">
                <p className="text-sm text-blue-700 truncate">{currentData.title || "Page Title"}</p>
                <p className="mt-1 text-xs text-green-700 truncate">{currentData.description || "Page description will appear here..."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOPanel;