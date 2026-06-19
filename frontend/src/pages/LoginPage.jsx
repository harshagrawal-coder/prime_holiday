import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const LoginPage = () => {

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
              Sign in to shape your next
              <span className="bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
                {" "}
                travel story
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Save favorite journeys, manage trip plans, and keep your bookings in one place.
              This login hub is ready for future traveler accounts as your platform grows.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Secure access",
                  text: "A single entry point for future traveler profiles and bookings.",
                },
                {
                  title: "Trip management",
                  text: "Track destinations, requests, and saved experiences with ease.",
                },
                {
                  title: "Admin ready",
                  text: "Quick access to the existing admin panel when needed.",
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
                    Welcome Back
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-white">Login to your account</h2>
                </div>
                <div className="rounded-2xl bg-orange-500/15 p-3 text-orange-300">
                  <ShieldCheck size={24} />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-6 text-sm text-slate-200 text-center">
                  <ShieldCheck className="mx-auto mb-3 text-orange-400" size={32} />
                  <p className="font-semibold text-white text-base">User Authentication</p>
                  <p className="mt-2 leading-relaxed text-slate-300">
                    User login and registration will be available soon with the Redux implementation.
                    In the meantime, use the admin panel to manage content.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4 text-sm text-slate-200">
                  <p className="font-semibold text-white">Need admin access?</p>
                  <p className="mt-1 leading-relaxed text-slate-300">
                    Use the admin login when you want to manage tours, bookings, and dashboard
                    content.
                  </p>
                  <Link
                    to="/admin/login"
                    className="mt-4 inline-flex items-center rounded-full border border-orange-400/30 px-4 py-2 font-semibold text-orange-300 transition-all duration-300 hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                  >
                    Open Admin Login
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
