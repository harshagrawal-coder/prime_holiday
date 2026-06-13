import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { aboutStats } from "../../data/aboutPageData";
import { useCountUp } from "../../hooks/useCountUp";

const StatItem = ({ stat }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCountUp(stat.value, isInView);

  return (
    <div
      ref={ref}
      className="rounded-[1.75rem] border border-white/70 bg-white/70 px-5 py-6 text-center shadow-sm backdrop-blur-md"
    >
      <p className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
        {count}
        {stat.suffix}
      </p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {stat.label}
      </p>
    </div>
  );
};

const AboutStatsSection = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950" />
    <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-orange-500/15 blur-3xl" />
    <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-sky-400/15 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-300">
          Trust Builder
        </p>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
          Numbers that reflect the journeys we've helped shape.
        </h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {aboutStats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  </section>
);

export default AboutStatsSection;
