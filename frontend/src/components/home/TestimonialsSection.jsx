import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { testimonials } from "../../data/testimonials";
import { useTestimonialSlider } from "../../hooks/useTestimonialSlider";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  const {
    index,
    setIndex,
    cardsPerView,
    pages,
    handlePrev,
    handleNext,
    handleTouchStart,
    handleTouchEnd,
    containerRef,
    trackRef,
    translateX,
  } = useTestimonialSlider(testimonials.length);

  return (
    <section id="testimonials" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-sky-50" />
      <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-orange-200/35 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-500">
            Testimonials
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Real stories from travelers who chose comfort, care, and better-planned journeys with Prime Holiday.
          </p>
        </motion.div>

        <div className="mt-10 rounded-[2rem] border border-white/70 bg-white/55 p-4 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
              <FaCheckCircle className="text-emerald-500" />
              Verified Reviews
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/75 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:text-white hover:shadow-lg hover:shadow-orange-400/15"
                aria-label="Previous testimonials"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/75 text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-orange-400 hover:text-white hover:shadow-lg hover:shadow-orange-400/15"
                aria-label="Next testimonials"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              ref={trackRef}
              className="flex w-max gap-4"
              animate={{ x: translateX }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              {testimonials.map((item, itemIndex) => {
                const isVisible = itemIndex >= index && itemIndex < index + cardsPerView;
                const activeIndex = index + Math.floor(cardsPerView / 2);
                const isActive = itemIndex === activeIndex || (cardsPerView === 1 && itemIndex === index);

                return (
                  <div
                    key={`${item.name}-${itemIndex}`}
                    className="flex-shrink-0"
                    style={{ width: `calc((100vw - 120px) / ${cardsPerView} - ${(cardsPerView - 1) * 16}px / ${cardsPerView})` }}
                  >
                    <TestimonialCard item={item} isActive={isActive} isVisible={isVisible} />
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setIndex(page)}
                aria-label={`Go to testimonial group ${page + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === page
                    ? "w-8 bg-orange-500 shadow-lg shadow-orange-500/30"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
