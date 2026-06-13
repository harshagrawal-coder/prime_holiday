import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { testimonialPreview } from "../../data/aboutPageData";

const AboutTestimonialsPreviewSection = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-white to-sky-50/60" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-500">
            Traveler Reviews
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            A quick look at what travelers remember most.
          </h2>
        </div>
        <Link
          to="/#testimonials"
          className="group inline-flex items-center gap-2 self-start rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-orange-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-orange-50"
        >
          See More Reviews
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonialPreview.map((item) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-[1.75rem] border border-white/70 bg-white/70 p-5 shadow-md backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <FaMapMarkerAlt className="text-orange-400" /> {item.location}
                </p>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.text}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default AboutTestimonialsPreviewSection;
