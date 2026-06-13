import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaLink, FaSave, FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@primeholiday.com",
    phone: "+91 9876543210",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [contact, setContact] = useState({
    email: "info@primeholiday.com",
    phone: "+91 9876543210",
    address: "123 Travel Street, Mumbai, India",
  });

  const [social, setSocial] = useState({
    facebook: "https://facebook.com/primeholiday",
    twitter: "https://twitter.com/primeholiday",
    instagram: "https://instagram.com/primeholiday",
    linkedin: "https://linkedin.com/company/primeholiday",
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }
    if (passwords.new.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setPasswords({ current: "", new: "", confirm: "" });
    handleSave();
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "password", label: "Password", icon: FaLock },
    { id: "contact", label: "Contact", icon: FaPhone },
    { id: "social", label: "Social Links", icon: FaLink },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500">Manage your admin account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 shrink-0">
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
          {activeTab === "profile" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Admin Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Phone</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  {saved ? <FaCheck size={12} /> : <FaSave size={12} />}
                  {saved ? "Saved!" : "Save Profile"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Change Password</h2>
              <form onSubmit={updatePassword} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Current Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">New Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Confirm Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  {showPassword ? "Hide" : "Show"} Passwords
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  <FaSave size={12} />
                  Update Password
                </button>
              </form>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Support Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Phone</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Address</label>
                  <textarea
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  {saved ? <FaCheck size={12} /> : <FaSave size={12} />}
                  {saved ? "Saved!" : "Save Contact"}
                </button>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Social Media Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Facebook</label>
                  <div className="relative">
                    <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={social.facebook}
                      onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Twitter</label>
                  <div className="relative">
                    <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={social.twitter}
                      onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Instagram</label>
                  <div className="relative">
                    <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={social.instagram}
                      onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">LinkedIn</label>
                  <div className="relative">
                    <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={social.linkedin}
                      onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  {saved ? <FaCheck size={12} /> : <FaSave size={12} />}
                  {saved ? "Saved!" : "Save Social Links"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
