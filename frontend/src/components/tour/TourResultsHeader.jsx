const TourResultsHeader = ({ filteredCount, priceRange, selectedVibe }) => (
  <div className="mb-8 rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.05)] backdrop-blur-md sm:p-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">
          Curated Results
        </p>
        <h2 className="text-[2.2rem] font-black uppercase italic leading-none tracking-tight text-slate-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.55)] sm:text-5xl md:text-6xl">
          Select Adventure
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Handpicked itineraries across India with clear pricing, destination highlights, and quick access to full tour details.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Tours</p>
          <p className="mt-1 text-2xl font-black text-slate-900">{filteredCount}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Budget</p>
          <p className="mt-1 text-lg font-black text-slate-900">Up to Rs {priceRange.toLocaleString()}</p>
        </div>
        <div className="col-span-2 rounded-2xl bg-slate-50 px-4 py-3 sm:col-span-1">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Focus</p>
          <p className="mt-1 text-lg font-black text-slate-900">
            {selectedVibe === "All Vibes" ? "All" : selectedVibe}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TourResultsHeader;
