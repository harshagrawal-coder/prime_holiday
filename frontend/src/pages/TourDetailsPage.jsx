import { Link, useParams } from "react-router-dom";
import toursData from "../data/toursData.json";
import TourDetail from "../components/tour/TourDetail";

const TourDetailsPage = () => {
  const { id } = useParams();
  const tours = toursData;
  const tour = tours.find((item) => String(item.id) === String(id));

  if (!tour) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-orange-300">
            Tour Details
          </p>
          <h1 className="mt-5 text-4xl font-black uppercase italic text-white md:text-6xl">
            Destination Not Found
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            The trip you opened is not available right now. Head back to the tours page and explore
            more curated escapes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/tour"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Back To Tours
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:border-orange-300/50 hover:bg-white/15"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedTours = tours
    .filter((item) => String(item.id) !== String(id) && (item.region === tour.region || item.mood === tour.mood))
    .slice(0, 3);

  return <TourDetail tour={tour} relatedTours={relatedTours} />;
};

export default TourDetailsPage;
