import { AnimatePresence } from "framer-motion";
import GalleryCard from "./GalleryCard";

const GalleryGrid = ({ items, onSelect }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <AnimatePresence>
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} onClick={onSelect} />
      ))}
    </AnimatePresence>
  </div>
);

export default GalleryGrid;
