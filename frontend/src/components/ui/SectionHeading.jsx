const SectionHeading = ({ eyebrow, title, subtitle, accent }) => (
  <div>
    {eyebrow ? (
      <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="font-primary text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
      {title}{" "}
      {accent ? <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">{accent}</span> : null}
    </h2>
    {subtitle ? (
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
        {subtitle}
      </p>
    ) : null}
  </div>
);

export default SectionHeading;
