import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GalleryCTASection = () => (
  <section className="py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-12 text-center shadow-[0_25px_80px_rgba(15,23,42,0.18)] sm:px-10"
      >
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-300">
          Travel For Real
        </p>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          Ready to explore these places in real life?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
          Discover tours built around the same landscapes, details, and moments you see in the gallery.
        </p>
        <Link
          to="/tour"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/35"
        >
          View Tours
        </Link>
      </motion.div>
    </div>
  </section>
);

export default GalleryCTASection;
