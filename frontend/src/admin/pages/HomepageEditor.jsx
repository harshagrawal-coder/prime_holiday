import { useState, useEffect } from "react";
import { FaHome, FaEdit, FaSave, FaPlus, FaMinus } from "react-icons/fa";

const API_URL = "http://localhost:5000";

const HomepageEditor = () => {
  const [content, setContent] = useState({
    heroTitle: "",
    heroSubtitle: "",
    ctaText: "",
    ctaLink: "",
    aboutText: "",
    stats: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const res = await fetch(`${API_URL}/api/homepage`);
    const data = await res.json();
    setContent(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`${API_URL}/api/homepage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  const addStat = () => {
    setContent({
      ...content,
      stats: [...content.stats, { label: "New Stat", value: "0" }],
    });
  };

  const removeStat = (index) => {
    setContent({
      ...content,
      stats: content.stats.filter((_, i) => i !== index),
    });
  };

  const updateStat = (index, field, value) => {
    const newStats = [...content.stats];
    newStats[index][field] = value;
    setContent({ ...content, stats: newStats });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Homepage Editor</h1>
          <p className="text-sm text-slate-500">Edit homepage content sections</p>
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

      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <FaHome className="text-orange-500" />
            <h3 className="text-lg font-semibold text-slate-800">Hero Section</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Hero Title</label>
              <input
                type="text"
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Hero Subtitle</label>
              <textarea
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">CTA Button Text</label>
                <input
                  type="text"
                  value={content.ctaText}
                  onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">CTA Link</label>
                <input
                  type="text"
                  value={content.ctaLink}
                  onChange={(e) => setContent({ ...content, ctaLink: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                  placeholder="/tours"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <FaEdit className="text-orange-500" />
            <h3 className="text-lg font-semibold text-slate-800">About Section</h3>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">About Text</label>
            <textarea
              value={content.aboutText}
              onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
              rows={4}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaHome className="text-orange-500" />
              <h3 className="text-lg font-semibold text-slate-800">Stats Section</h3>
            </div>
            <button
              onClick={addStat}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              <FaPlus size={10} />
              Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {content.stats?.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Label"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none"
                    placeholder="Value"
                  />
                </div>
                <button
                  onClick={() => removeStat(index)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <FaMinus size={12} />
                </button>
              </div>
            ))}
            {(!content.stats || content.stats.length === 0) && (
              <p className="text-sm text-slate-500 text-center py-4">No stats added. Click "Add Stat" to get started.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-600">Preview</h3>
          <div className="space-y-4 rounded-lg bg-white p-4">
            <div>
              <p className="text-xs text-slate-400">Hero Title</p>
              <p className="text-lg font-bold text-slate-800">{content.heroTitle || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Hero Subtitle</p>
              <p className="text-sm text-slate-600">{content.heroSubtitle || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">CTA Button</p>
              <p className="text-sm text-slate-800">{content.ctaText || "—"} ({content.ctaLink || "—"})</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Stats</p>
              <div className="flex flex-wrap gap-2">
                {content.stats?.map((stat, i) => (
                  <span key={i} className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    {stat.label}: {stat.value}
                  </span>
                )) || <span className="text-slate-400">—</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageEditor;
