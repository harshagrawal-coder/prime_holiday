const TourHeroBanner = ({ count }) => (
  <section className="relative flex min-h-[280px] items-end justify-center overflow-hidden pt-20 sm:min-h-[320px] md:min-h-[360px]">
    <img
      src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format"
      className="absolute inset-0 h-full w-full scale-105 object-cover"
      alt="Voyage hero"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/30 to-slate-950/70" />
    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 pb-12 sm:px-6 sm:pb-14 md:px-10 md:pb-16">
      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-orange-300 sm:text-[11px]">
        Signature Journeys
      </p>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[3rem] font-black uppercase italic tracking-tight text-white sm:text-6xl md:text-8xl">
            Voyage<span className="text-orange-500">.</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            Explore destinations curated for comfort, culture, and unforgettable scenery.
          </p>
        </div>
        <div className="hidden rounded-full border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-md lg:flex lg:items-center lg:gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/90">
            {count} Tours Available
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default TourHeroBanner;
