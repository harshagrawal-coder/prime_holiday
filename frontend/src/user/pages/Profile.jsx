import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Traveler",
    email: "user@example.com",
    phone: "+91 98765 43210",
  });

  const [prefs, setPrefs] = useState(["Mountains", "Adventure"]);
  const allPrefs = ["Mountains", "Beaches", "Spiritual", "Adventure", "Heritage", "Luxury"];

  const togglePref = (preference) => {
    setPrefs((currentPrefs) =>
      currentPrefs.includes(preference)
        ? currentPrefs.filter((item) => item !== preference)
        : [...currentPrefs, preference]
    );
  };

  const handleSave = (event) => {
    event.preventDefault();
    alert("Profile saved successfully!");
  };

  return (
    <div className="animate-fade-in space-y-12 pb-10">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
            Settings
          </p>
        </div>
        <h2 className="mt-3 text-3xl font-black uppercase italic leading-none tracking-tight text-slate-900 sm:text-5xl">
          My <span className="text-slate-200">Profile</span>
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="mb-6 text-xl font-black uppercase italic tracking-tight text-slate-900">
              Personal <span className="text-slate-300">Details</span>
            </h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    Full Name
                  </label>
                  <input
                    value={profile.name}
                    onChange={(event) =>
                      setProfile((current) => ({ ...current, name: event.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    Email Address
                  </label>
                  <input
                    value={profile.email}
                    onChange={(event) =>
                      setProfile((current) => ({ ...current, email: event.target.value }))
                    }
                    className={inputClass}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                  Phone Number
                </label>
                <input
                  value={profile.phone}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, phone: event.target.value }))
                  }
                  className={inputClass}
                />
              </div>
              <button className="mt-4 rounded-xl bg-orange-600 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/20">
                Save Details
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="mb-2 text-xl font-black uppercase italic tracking-tight text-slate-900">
              Travel <span className="text-slate-300">Preferences</span>
            </h3>
            <p className="mb-6 text-sm text-slate-500">
              Select the types of journeys you enjoy most for better recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              {allPrefs.map((preference) => (
                <button
                  key={preference}
                  onClick={() => togglePref(preference)}
                  className={`rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    prefs.includes(preference)
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 hover:bg-orange-600"
                      : "border border-slate-200 bg-slate-50 text-slate-500 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 to-slate-900 p-8 text-white shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
            
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/20 ring-2 ring-orange-500/30">
                <span className="text-2xl font-black">{profile.name.charAt(0).toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight">{profile.name}</h3>
              <p className="mt-1 text-sm text-slate-400">Adventure Traveler</p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">
                  Security
                </p>
                <button className="w-full border-b border-white/10 py-3 text-left text-sm font-bold text-white/90 transition-all hover:pl-2 hover:text-white">
                  Change Password {"->"}
                </button>
                <button className="w-full border-b border-white/10 py-3 text-left text-sm font-bold text-white/90 transition-all hover:pl-2 hover:text-white">
                  Two-Factor Auth {"->"}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 to-orange-100/50 p-8">
            <h3 className="mb-2 text-xl font-black uppercase italic tracking-tight text-slate-900">
              Need <span className="text-orange-300">Help?</span>
            </h3>
            <p className="mb-6 text-sm text-slate-600">
              Contact our support team for changes to bookings.
            </p>
            <button className="w-full rounded-xl bg-slate-900 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
