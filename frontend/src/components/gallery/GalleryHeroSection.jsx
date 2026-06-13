import { motion } from "framer-motion";

const GalleryHeroSection = () => (
  <section className="relative min-h-[72vh] overflow-hidden">
    <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4">
      {[
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200",
        "https://imgs.search.brave.com/xkE8Xu6huPxIHRjc4Re4L5SozSSvYpfDfQkVm3PTn4Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zaHJp/cmFtbWFuZGlyYXlv/ZGh5YS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMTEv/cmFtbWFuZGlyXzEu/anBn",
        "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1200",
      ].map((image, index) => (
        <img key={index} src={image} alt="" className="h-full w-full object-cover" />
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/25" />

    <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 pb-12 pt-28 sm:px-6 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.34em] text-orange-300">
          Visual Journal
        </p>
        <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl">
          Explore Moments, Not Just Places
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
          A glimpse into unforgettable journeys, landscapes, quiet details, and destinations waiting to be experienced in real life.
        </p>
      </motion.div>
    </div>
  </section>
);

export default GalleryHeroSection;
