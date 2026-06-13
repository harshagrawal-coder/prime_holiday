import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutHeroSection = () => (
  <section className="relative min-h-[78vh] overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600"
      alt="Travel inspiration"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/10" />

    <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 pb-12 pt-28 sm:px-6 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.34em] text-orange-300">
          About Prime Holiday
        </p>
        <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl">
          We Don&apos;t Just Plan Trips, We Create Experiences
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
          We design memorable journeys across India with thoughtful planning, reliable support, and details that make travel feel effortless.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/tour"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/35"
          >
            Explore Tours
          </Link>
          <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/80 backdrop-blur-md">
            Trusted journeys. Personal service. Better travel stories.
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutHeroSection;
