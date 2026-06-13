import { useState } from "react";
import { FaFileDownload, FaTimes, FaArrowRight } from "react-icons/fa";

const initialBookings = [
  { id: "PH-9021", tour: "Manali Tri-Valley Escape", date: "12 Aug 2026", price: "₹18,500", status: "Upcoming", guests: 2 },
  { id: "PH-8842", tour: "Goa Beach Fiesta", date: "05 Jun 2026", price: "₹25,000", status: "Completed", guests: 4 },
  { id: "PH-8100", tour: "Rishikesh Adventure Weekend", date: "15 Jan 2026", price: "₹12,000", status: "Cancelled", guests: 2 },
];

const statusStyles = {
  Upcoming: "bg-orange-500/10 text-orange-600",
  Completed: "bg-emerald-500/10 text-emerald-600",
  Cancelled: "bg-red-500/10 text-red-600",
};

const Bookings = () => {
  const [bookings] = useState(initialBookings);

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">History</p>
          </div>
          <h2 className="mt-3 text-3xl font-black uppercase italic leading-none tracking-tight text-slate-900 sm:text-5xl">
            My <span className="text-slate-200">Bookings</span>
          </h2>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 transition-all hover:translate-x-1 hover:text-orange-600">
          View All <FaArrowRight />
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-orange-200 flex flex-col md:flex-row">
            <div className="p-4 md:p-5 flex-1">
              <div className="mb-2 flex items-center justify-between md:justify-start gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Order #{b.id}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${statusStyles[b.status]}`}>
                  {b.status}
                </span>
              </div>
              <h3 className="text-base font-black uppercase italic tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                {b.tour}
              </h3>
              <p className="mt-1 text-xs text-slate-500">Starting Date: <span className="font-bold text-slate-700">{b.date}</span></p>
            </div>
            
            <div className="bg-slate-50 p-4 md:p-5 flex flex-col justify-center items-start md:items-end md:w-56 border-t md:border-t-0 md:border-l border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Total Fixed Price</p>
              <p className="text-xl font-black text-slate-900">{b.price}</p>
              <p className="text-xs text-slate-500 mt-0.5">{b.guests} Guests</p>
              
              <div className="flex gap-2 mt-4 w-full">
                {b.status !== "Cancelled" && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
                    <FaFileDownload size={11}/> Invoice
                  </button>
                )}
                {b.status === "Upcoming" && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-red-50 text-red-600 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors">
                    <FaTimes size={11}/> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
