import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaCompass,
  FaMapMarkerAlt,
  FaMountain,
  FaStar,
} from "react-icons/fa";
import LazyImage from "../ui/LazyImage";
import TourCard from "./TourCard";
import TourCTASection from "./TourCTASection";
import { getPriceBadge, getStartingPrice, normalizePriceRange } from "./tourUtils";

const API_URL = "http://localhost:5000";

const getImageSrc = (image) => {
  if (!image) return "https://placehold.co/1200x600?text=No+Image";
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  return `${API_URL}${image}`;
};

const statCards = (tour) => [
  { label: "Trip Mood", value: tour.mood, icon: FaMountain },
  { label: "Ideal Duration", value: tour.days, icon: FaClock },
  { label: "Best Season", value: tour.bestTimeToVisit, icon: FaCalendarAlt },
  { label: "Starting Budget", value: getStartingPrice(tour.priceRange), icon: FaCompass },
];

const PricingCard = ({ tour, navigate }) => (
  <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-6 shadow-2xl transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/60">Starting from</p>
        <p className="mt-2 text-4xl font-black tracking-tight text-white">{getStartingPrice(tour.priceRange)}</p>
      </div>
      <div className="rounded-full bg-black/30 px-3 py-1.5 text-sm font-black text-white backdrop-blur-md">
        <FaStar className="mr-1 inline text-yellow-400" />
        {tour.rating || "New"}
      </div>
    </div>

    <div className="mt-6 space-y-2">
      <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm text-white/80">
        <span>Best time to visit</span>
        <span className="font-bold text-white">{tour.bestTimeToVisit}</span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm text-white/80">
        <span>Duration</span>
        <span className="font-bold text-white">{tour.days}</span>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-2.5 text-sm text-white/80">
        <span>Budget window</span>
        <span className="font-bold text-white">{normalizePriceRange(tour.priceRange)}</span>
      </div>
    </div>

    <div className="mt-6 flex flex-col gap-3">
      <button
        onClick={() => navigate(`/reserve?tourId=${tour.id}`)}
        className="flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-orange-600 cursor-pointer"
      >
        Reserve Now
      </button>
      <button
        onClick={() => navigate("/gallery")}
        className="flex items-center justify-center rounded-full border border-white/30 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-orange-300/50 hover:bg-white/10 cursor-pointer"
      >
        View Gallery
      </button>
    </div>
  </div>
);

const TourDetail = ({ tour, relatedTours }) => {
  const navigate = useNavigate();
  
  return (
  <div className="bg-white text-slate-900">
    {/* Hero Section - Banner + Floating Card */}
    <section className="relative">
      <div className="absolute inset-0">
        <LazyImage
          src={getImageSrc(tour.image)}
          alt={tour.name}
          priority
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/35" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 to-transparent" />
      </div>

      {/* Floating Pricing Card - Desktop Only */}
      <div className="absolute right-10 top-1/2 z-20 hidden -translate-y-1/2 lg:block lg:w-[320px]">
        <PricingCard tour={tour} navigate={navigate} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pb-20">
        <Link
          to="/tour"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-orange-300/50 hover:bg-white/15"
        >
          Back To Tours
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-8"
        >
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-orange-500 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-lg">
              {tour.mood}
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white backdrop-blur-md">
              {tour.days}
            </span>
            {tour.trending ? (
              <span className="rounded-full border border-emerald-300/25 bg-emerald-400/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-100 backdrop-blur-md">
                Trending Pick
              </span>
            ) : null}
          </div>

          <p className="mt-7 text-[11px] font-black uppercase tracking-[0.34em] text-orange-200">
            Prime Holiday Signature Escape
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase italic leading-[0.95] text-white md:text-6xl">
            {tour.name}
          </h1>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            <FaMapMarkerAlt className="text-orange-400" />
            {tour.city}, {tour.state}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {tour.prec}
          </p>
        </motion.div>
      </div>
    </section>


    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left: Tour content */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statCards(tour).map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <Icon size={18} />
                  </div>
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-black uppercase tracking-wide text-slate-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Highlights Section */}
            <div className="mt-12 rounded-[2rem] border border-slate-100 bg-slate-950 p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.14)] md:p-8">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-300">
                Highlights
              </p>
              <div className="mt-6 space-y-4">
                {tour.topAttractions?.map((place, index) => (
                  <div
                    key={place}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[11px] font-black text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.14em] text-white">{place}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">
                        A signature stop that adds depth and personality to your time in {tour.city}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-orange-400/20 bg-orange-500/10 px-4 py-4 text-sm leading-relaxed text-white/75">
                Prime Holiday can shape this route into a couple trip, family break, spiritual escape,
                or a scenic long weekend depending on your travel style.
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">
                  Price Window
                </p>
                <p className="mt-2 text-2xl font-black text-white">{getPriceBadge(tour.priceRange)}</p>
              </div>
            </div>

            <div className="mt-12">
              <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-8">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">
                  Why This Journey Works
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  A destination shaped for memorable moments, not rushed checklists.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {tour.name} gives you a strong balance of atmosphere, signature local experiences, and
                  easy pacing. It is the kind of trip that feels rich without becoming exhausting, which
                  makes it ideal for short breaks as well as meaningful getaways.
                </p>

                <div className="mt-8 grid gap-3">
                  {[
                    `Handpicked local highlights around ${tour.city}`,
                    `Best planned for ${tour.days} with smooth pacing`,
                    `Perfect for ${tour.mood.toLowerCase()} seekers who want a premium, easy itinerary`,
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <FaCheck size={10} />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
                    Suggested Itinerary Rhythm
                  </p>
                  <div className="mt-4 grid gap-3">
                    {[
                      "Arrival and local orientation with a relaxed first evening",
                      "Core sightseeing day with the strongest signature experiences",
                      "Optional scenic detours, shopping, or slower local discovery time",
                    ].map((item, index) => (
                      <div key={item} className="flex gap-3 text-sm text-slate-700">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-black text-orange-500 shadow-sm">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">
              Similar Escapes
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              More trips with the same travel energy.
            </h2>
          </div>
          <Link
            to="/tour"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-slate-900 transition-colors hover:text-orange-600"
          >
            Explore All Tours
            <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedTours.map((item) => (
            <TourCard key={item.id} tour={item} />
          ))}
        </div>
      </div>
    </section>

    <TourCTASection city={tour.city} />
  </div>
  );
};

export default TourDetail;