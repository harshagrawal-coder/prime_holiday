import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import LazyImage from "../ui/LazyImage";

const Lightbox = ({ items, activeItem, onClose, onPrev, onNext }) => (
  <AnimatePresence>
    {activeItem ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[600] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 18 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 18 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
          <LazyImage
            src={activeItem.image}
            alt={activeItem.title}
            priority={true}
            wrapperClassName="w-full"
            className="max-h-[78vh] w-full object-cover"
            skeletonClassName="bg-slate-800"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent px-6 pb-6 pt-16">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">
              {activeItem.category}
            </p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-3xl font-black text-white md:text-4xl">{activeItem.title}</h3>
                <p className="mt-2 text-white/75">{activeItem.location}</p>
              </div>
              <div className="text-sm text-white/60">
                {items.length} curated moments in this collection
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-orange-500"
          >
            <FaTimes />
          </button>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-orange-500"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-orange-500"
          >
            <FaArrowRight />
          </button>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);

export default Lightbox;
