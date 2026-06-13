import { AnimatePresence, motion } from "framer-motion";
import TourCard from "./TourCard";

const TourGrid = ({ tours, animationKey }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={animationKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
    >
      {tours.length > 0 ? (
        tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-2xl font-black uppercase italic text-slate-300">No Adventures Found</p>
        </div>
      )}
    </motion.div>
  </AnimatePresence>
);

export default TourGrid;
