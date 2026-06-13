import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyImage from "../ui/LazyImage";

const heroImage =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";

const ContactHeroSection = () => (
  <section className="relative isolate overflow-hidden">
    <div className="absolute inset-0">
      <LazyImage
        src={heroImage}
        alt="Tropical travel landscape"
        priority
        wrapperClassName="h-full w-full"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-900/75 to-gray-800/65" />
    </div>

    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
    </div>

    <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/20 backdrop-blur-sm">
          <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-300">
          Get In Touch
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Let&apos;s Plan Your
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent"> Dream Trip</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-300">
          Have questions or ready to plan? Our travel experts are here to craft the perfect itinerary tailored just for you.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact-form"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/30"
          >
            Start Your Journey
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <Link
            to="/tour"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-orange-400/50 hover:bg-white/10"
          >
            Browse Tours
          </Link>
        </motion.div>
      </motion.div>
    </div>

    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-orange-50 to-transparent" />
  </section>
);

export default ContactHeroSection;
