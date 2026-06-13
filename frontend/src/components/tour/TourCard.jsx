import { Link } from "react-router-dom";
import { FaArrowRight, FaClock, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import LazyImage from "../ui/LazyImage";
import { getStartingPrice } from "./tourUtils";

const API_URL = "http://localhost:5000";

const getImageSrc = (image) => {
  if (!image) return "https://placehold.co/600x400?text=No+Image";
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  return `${API_URL}${image}`;
};

const TourCard = ({ tour, isHome = false }) => {
  const imageHeight = isHome ? "h-60 sm:h-64" : "h-40 sm:h-44";
  const cardPadding = isHome ? "p-5 sm:p-6" : "p-4";

  return (
    <Link
      to={`/tours/${tour.id}`}
      className="group block h-full overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/95 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
    >
      <div className={`relative overflow-hidden ${imageHeight}`}>
        <LazyImage
          src={getImageSrc(tour.image)}
          alt={tour.name}
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

        <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-white shadow-lg">
          {tour.mood}
        </div>
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/92 px-2.5 py-1 text-[9px] font-black text-slate-900 shadow-md">
          <FaClock className="text-orange-500" />
          {tour.days}
        </div>
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1.5 text-[10px] font-black text-white backdrop-blur-sm">
          <FaStar className="text-yellow-400" />
          {tour.rating}
        </div>

        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <p className="line-clamp-2 max-w-[72%] text-[11px] font-medium leading-relaxed text-white/90 sm:text-sm">
            {tour.prec}
          </p>
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${cardPadding}`}>
        <div className="mb-2 min-h-[72px]">
          <h3 className="line-clamp-2 text-lg font-black uppercase italic leading-tight text-slate-900">
            {tour.name}
          </h3>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
            <FaMapMarkerAlt className="text-orange-400" />
            {tour.city}, {tour.state}
          </p>
        </div>

        <div className="mb-3 min-h-[40px] border-b border-slate-100 pb-3">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-500">
            {tour.topAttractions?.slice(0, 3).map((item, index) => (
              <span key={item} className="inline-flex items-center">
                {item}
                {index < Math.min((tour.topAttractions?.slice(0, 3).length || 0) - 1, 2) ? (
                  <span className="ml-3 text-slate-300">•</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
              Starting From
            </p>
            <p className="mt-1 text-lg font-black text-slate-900">{getStartingPrice(tour.priceRange)}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-lg transition-all duration-300 group-hover:bg-orange-600 group-hover:shadow-orange-500/25">
            View Details
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
