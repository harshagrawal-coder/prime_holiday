import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { aboutFeatures, aboutStats } from "../../data/homeAboutData";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-sky-50" />
      <div className="absolute -top-10 left-0 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-500">
                About Us
              </p>
              <h2 className="max-w-2xl text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                Crafting seamless journeys with{" "}
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Prime Holiday
                </span>
              </h2>
              <p className="mt-6 max-w-2xl animate-[fadeIn_0.8s_ease-out_forwards] text-sm leading-relaxed text-slate-600 opacity-0 sm:text-base">
                Prime Holiday creates travel experiences that feel polished, personal, and easy to trust.
                From quiet hill escapes to culture-filled city breaks and beach retreats, we design trips
                that balance comfort, discovery, and dependable support at every step.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/70 bg-white/75 px-4 py-4 shadow-sm"
                  >
                    <p className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => navigate("/tour")}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-orange-500/25 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/35"
                >
                  Explore Tours
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                    <FaStar />
                  </span>
                  Trusted by travelers looking for smoother India getaways.
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-8 hidden h-24 w-24 rounded-full bg-orange-300/30 blur-2xl sm:block" />
              <div className="absolute -right-6 bottom-8 hidden h-28 w-28 rounded-full bg-sky-300/30 blur-2xl sm:block" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 shadow-2xl shadow-slate-900/15">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400"
                  alt="Travel planning with Prime Holiday"
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
                  <div className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-white backdrop-blur-md">
                    Signature Journeys
                  </div>
                  <div className="rounded-full border border-white/20 bg-white/15 px-3 py-2 text-[10px] font-bold text-white backdrop-blur-md">
                    India Specialists
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/15 bg-white/12 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-200">
                    Travel Philosophy
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                    Better travel starts with thoughtful planning, clear support, and destinations that feel as good as they look.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/60 p-5 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100/0 via-orange-100/0 to-orange-100/0 transition-all duration-300 group-hover:from-orange-100/50 group-hover:via-white/0 group-hover:to-transparent" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-orange-100">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
