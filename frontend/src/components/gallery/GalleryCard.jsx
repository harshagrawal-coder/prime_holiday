import { motion } from "framer-motion";
import LazyImage from "../ui/LazyImage";

const GalleryCard = ({ item, onClick }) => (
  <motion.button
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    onClick={() => onClick(item)}
    className="group mb-6 block w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 text-left shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
  >
    <div className="relative aspect-[3/2] overflow-hidden">
      <LazyImage
        src={item.image}
        alt={item.title}
        wrapperClassName="h-full w-full"
        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-[1.25rem] border border-white/15 bg-white/12 p-4 backdrop-blur-md">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-200">
            {item.category}
          </p>
          <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
          <p className="mt-1 text-sm text-white/80">{item.location}</p>
        </div>
      </div>
    </div>
  </motion.button>
);

export default GalleryCard;
