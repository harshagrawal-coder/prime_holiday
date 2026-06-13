import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const TourDropdownField = ({
  label,
  id,
  value,
  icon,
  options,
  onSelect,
  multi = false,
  openDropdown,
  setOpenDropdown,
}) => (
  <div className="relative dropdown-container">
    <label className="mb-3 block text-[10px] font-black uppercase italic tracking-widest text-slate-400">
      {label}
    </label>
    <button
      onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
      className="flex w-full items-center justify-between rounded-2xl border border-transparent bg-slate-50 p-4 text-[12px] font-bold text-slate-700 shadow-sm transition-all hover:border-slate-200"
    >
      <span className="truncate">
        {Array.isArray(value) ? (value.length > 0 ? `${value.length} Selected` : "Select...") : value}
      </span>
      {icon}
    </button>
    <AnimatePresence>
      {openDropdown === id && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="hide-scrollbar absolute left-0 right-0 top-full z-[150] mt-2 max-h-48 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                if (!multi) setOpenDropdown(null);
              }}
              className="flex cursor-pointer items-center justify-between rounded-xl p-3 text-[11px] font-bold hover:bg-slate-50"
            >
              {option}
              {((Array.isArray(value) && value.includes(option)) || value === option) && (
                <FaCheck className="text-orange-500" />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default TourDropdownField;
