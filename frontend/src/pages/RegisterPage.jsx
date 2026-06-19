import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const RegisterPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.28),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))]" />
      <div className="absolute -left-16 top-20 h-44 w-44 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -right-12 bottom-16 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="max-w-2xl text-white">
            <p className="font-primary text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              Prime Holiday Account
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Create your
              <span className="bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
                {" "}
                travel account
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Save favorite journeys, manage trip plans, and keep your bookings in one place.
              Account creation will be available with the upcoming Redux implementation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Your trips",
                  text: "Keep track of all your bookings and saved destinations.",
                },
                {
                  title: "Wishlist",
                  text: "Save tours you love and plan your dream itinerary.",
                },
                {
                  title: "Profile",
                  text: "Manage your preferences and travel history.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-md">
            <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-primary text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                    Join Prime Holiday
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-white">Create Account</h2>
                </div>
                <div className="rounded-2xl bg-orange-500/15 p-3 text-orange-300">
                  <ShieldCheck size={24} />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 text-sm text-slate-200 text-center">
                  <ShieldCheck className="mx-auto mb-3 text-orange-400" size={32} />
                  <p className="font-semibold text-white text-base">Registration Coming Soon</p>
                  <p className="mt-2 leading-relaxed text-slate-300">
                    User registration will be available with the Redux integration.
                    In the meantime, use the admin panel to manage content.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/35 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Already have an account?</p>
                <Link
                  to="/admin/login"
                  className="mt-2 inline-block rounded-full border border-orange-400/30 px-4 py-2 font-semibold text-orange-300 transition-all duration-300 hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
