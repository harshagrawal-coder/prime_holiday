import { motion } from "framer-motion";
import LazyImage from "../ui/LazyImage";

const heroImage =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop";

const BlogHeroSection = () => (
  <section className="relative isolate overflow-hidden">
    <div className="absolute inset-0">
      <LazyImage
        src={heroImage}
        alt="Travel editorial hero"
        priority
        wrapperClassName="h-full w-full"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/35" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/70 to-transparent" />
    </div>

    <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.34em] text-orange-200">
          Prime Holiday Journal
        </p>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
          Travel Stories &amp; Guides
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base md:text-lg">
          Discover tips, destinations, and unforgettable experiences through destination-led guides,
          planning insights, and travel stories that feel like a modern magazine.
        </p>
      </motion.div>
    </div>
  </section>
);

export default BlogHeroSection;
