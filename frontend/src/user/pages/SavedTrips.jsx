import { useState } from "react";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import toursData from "../../data/toursData.json";
import { getStartingPrice } from "../../components/tour/tourUtils";

const SavedTrips = () => {
  const tours = toursData;
  const [savedTours, setSavedTours] = useState(tours.slice(0, 4));

  const removeSaved = (id) => {
    setSavedTours(savedTours.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Wishlist</p>
          </div>
          <h2 className="mt-3 text-3xl font-black uppercase italic leading-none tracking-tight text-slate-900 sm:text-5xl">
            Saved <span className="text-slate-200">Trips</span>
          </h2>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 transition-all hover:translate-x-1 hover:text-orange-600">
          Explore More <FaArrowRight />
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedTours.map((tour) => (
          <div key={tour.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-orange-200">
            <div className="relative h-48 w-full overflow-hidden">
              <img src={tour.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600"} alt={tour.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <button 
                onClick={() => removeSaved(tour.id)} 
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-rose-500 shadow-md hover:scale-110 transition-transform"
              >
                <FaHeart size={16} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                  {tour.mood}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{tour.days}</span>
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-900">{tour.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{tour.city}, {tour.state}</p>
              
              <div className="mt-5 border-t border-slate-100 pt-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Starting from</p>
                  <p className="text-xl font-black text-slate-900">{getStartingPrice(tour.priceRange)}</p>
                </div>
                <button className="rounded-full bg-slate-900 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}

        {savedTours.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-slate-400 font-bold mb-4">You have no saved trips yet.</p>
            <button className="rounded-full border-2 border-orange-600 px-6 py-3 text-xs font-black uppercase tracking-widest text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
              Explore Destinations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTrips;
