import { Link } from "react-router-dom";
import { FaArrowRight, FaRoute } from "react-icons/fa";

const TourCTASection = ({ city }) => (
  <section className="pb-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-300">
              Ready For The Next Step
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Let us turn {city} into your next unforgettable itinerary.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              We can help with route planning, hotel suggestions, pacing, and a trip style that
              matches your travel mood and budget.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/reserve"
              state={{ tour: { name: city, city, state: "", days: "", basePrice: 0, rating: 0 } }}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Reserve Now
              <FaArrowRight size={11} />
            </Link>
            <Link
              to="/tour"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
            >
              <FaRoute size={11} />
              Browse More Tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TourCTASection;
