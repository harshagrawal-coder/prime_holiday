import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange }) => (
  <div className="rounded-[1.75rem] border border-white/60 bg-white/70 p-2 shadow-[0_16px_35px_rgba(15,23,42,0.06)] backdrop-blur-md">
    <div className="flex items-center gap-3 rounded-[1.2rem] bg-white/75 px-4 py-3">
      <FaSearch className="text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search travel stories..."
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
    </div>
  </div>
);

export default SearchBar;
