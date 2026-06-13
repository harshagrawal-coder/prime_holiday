import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaMapMarkerAlt, FaQuoteRight, FaStar } from "react-icons/fa";
import LazyImage from "../ui/LazyImage";

const TestimonialCard = ({ item, isActive, isVisible }) => (
  <AnimatePresence>
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: isVisible ? 1 : 0.75,
        y: 0,
        scale: isActive ? 1 : 0.96,
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative h-full min-h-[320px] overflow-hidden rounded-[2rem] border border-gray-100 bg-white/70 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-100/60 sm:p-7"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/0 via-white/0 to-orange-100/0 transition-all duration-300 group-hover:from-orange-100/40 group-hover:to-transparent" />
      <FaQuoteRight className="absolute right-6 top-6 text-6xl text-slate-200/70" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start gap-4">
          <div className="relative">
            <LazyImage
              src={item.image}
              alt={item.name}
              wrapperClassName="h-16 w-16 rounded-full ring-4 ring-white"
              className="h-16 w-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white shadow-md">
              <FaCheckCircle />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-lg font-bold text-slate-900">{item.name}</h3>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                Verified
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <FaMapMarkerAlt className="text-orange-400" />
              {item.location}
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <FaStar
                  key={starIndex}
                  className={starIndex < item.rating ? "text-yellow-400" : "text-slate-200"}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="relative mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">
          {item.text}
        </p>

        <div className="mt-auto pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
            Prime Holiday
          </div>
        </div>
      </div>
    </motion.article>
  </AnimatePresence>
);

export default TestimonialCard;
