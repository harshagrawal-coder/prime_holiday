import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaFire } from "react-icons/fa";
import toursData from "../../data/toursData.json";
import TourCard from "../tour/TourCard";

const TrendingSection = () => {
  const navigate = useNavigate();
  const trendingTours = toursData.filter((tour) => tour.trending).slice(0, 3);

  return (
    <section className="mx-auto max-w-[1440px] bg-white px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 flex flex-col gap-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <FaFire className="animate-pulse text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
              Top Rated
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase italic leading-none tracking-tight text-slate-900 sm:text-5xl md:text-7xl">
            Trending <span className="text-slate-200">Destinations</span>
          </h2>
        </div>

        <button
          onClick={() => navigate("/tour")}
          className="group inline-flex items-center gap-3 self-start text-[11px] font-black uppercase tracking-widest text-slate-900 transition-all hover:text-orange-600 md:self-auto"
        >
          View All <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {trendingTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} isHome={true} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
