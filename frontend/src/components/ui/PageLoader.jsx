const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center px-4 py-24">
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-500" />
      <span className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">
        Loading Page
      </span>
    </div>
  </div>
);

export default PageLoader;
