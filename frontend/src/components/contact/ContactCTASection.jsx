import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ContactCTASection = () => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="pb-16 pt-8"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-orange-100/50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-8 py-10 text-white shadow-xl shadow-orange-500/10 md:px-12 md:py-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">
              Need Inspiration?
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-4xl">
              Need help choosing a destination?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400">
              Explore our curated tours and find the perfect trip for your style and budget.
            </p>
          </div>

          <Link
            to="/tour"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/30"
          >
            Explore Tours
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </motion.section>
);

export default ContactCTASection;
