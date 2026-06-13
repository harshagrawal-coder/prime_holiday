import { motion } from "framer-motion";
import { storyTimeline } from "../../data/aboutPageData";
import LazyImage from "../ui/LazyImage";

const AboutStorySection = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/50 to-sky-50/60" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -left-4 top-8 hidden h-24 w-24 rounded-full bg-orange-300/25 blur-2xl sm:block" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-md">
            <LazyImage
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1400"
              alt="Prime Holiday story"
              wrapperClassName="h-[320px] w-full sm:h-[420px]"
              className="h-[320px] w-full object-cover sm:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/15 bg-white/12 p-4 backdrop-blur-md">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200">
                Our Journey
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                We grew from planning meaningful trips for a few travelers into building trusted journeys for many more.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-500">
            Our Story
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            Built for travelers who want confidence, comfort, and unforgettable places.
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Prime Holiday started with a simple belief: trips should feel exciting, but never chaotic. We wanted to remove the friction that often comes with planning and replace it with clarity, warmth, and experiences that feel personal.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Our mission is to make travel feel effortless. Our vision is to become the most trusted experience-led travel brand for discovering India. And our values stay constant: honesty, personalization, comfort, and real human support.
          </p>

          <div className="mt-8 space-y-4">
            {storyTimeline.map((item) => (
              <div
                key={item.year}
                className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-sm font-black text-orange-500">
                    {item.year}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutStorySection;
