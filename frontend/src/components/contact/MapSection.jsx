import { motion } from "framer-motion";

const MapSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="overflow-hidden rounded-2xl border border-orange-100/50 bg-white/80 shadow-[0_10px_30px_rgba(249,115,22,0.08)] backdrop-blur-sm"
  >
    <div className="flex items-center gap-3 border-b border-orange-100/30 bg-gradient-to-r from-orange-50/50 to-amber-50/30 px-5 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-semibold text-orange-600">Our Location</p>
        <h3 className="text-sm font-bold text-gray-900">Visit Us in New Delhi</h3>
      </div>
    </div>

    <div className="overflow-hidden rounded-b-2xl">
      <iframe
        title="Prime Holiday location map"
        src="https://www.google.com/maps?q=Connaught%20Place%2C%20New%20Delhi&z=13&output=embed"
        className="h-[220px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

    <div className="flex items-center justify-between border-t border-orange-100/30 px-5 py-3">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Mon - Sat: 10AM - 7PM</span>
      </div>
    </div>
  </motion.div>
);

export default MapSection;
