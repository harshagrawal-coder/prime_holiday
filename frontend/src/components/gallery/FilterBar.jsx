const FilterBar = ({ categories, activeCategory, onChange }) => (
  <div className="rounded-[1.5rem] border border-white/70 bg-white/55 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl">
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 ${
            activeCategory === category
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
              : "bg-white/70 text-slate-600 hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default FilterBar;
