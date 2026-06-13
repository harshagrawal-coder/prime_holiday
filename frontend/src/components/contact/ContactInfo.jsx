import { motion } from "framer-motion";
import { contactDetails, quickContactOptions, socialLinks } from "../../data/contactPageData";

const ContactInfo = () => (
  <div className="space-y-5">
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="overflow-hidden rounded-2xl border border-orange-100/50 bg-white/80 p-6 shadow-[0_10px_30px_rgba(249,115,22,0.08)] backdrop-blur-sm"
    >
      <h2 className="text-xl font-bold text-gray-900">Get in Touch</h2>
      <p className="mt-1 text-sm text-gray-500">
        We&apos;re here to help you plan the perfect trip.
      </p>

      <div className="mt-5 space-y-3">
        {contactDetails.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="flex items-center gap-3 rounded-xl border border-orange-100/30 bg-orange-50/30 p-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Icon size={16} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">{title}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid gap-3 sm:grid-cols-3"
    >
      {quickContactOptions.map(({ title, value, href, icon: Icon }) => (
        <a
          key={title}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="group flex flex-col items-center gap-2 rounded-xl border border-orange-100/30 bg-white/80 p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20 transition-all duration-300 group-hover:scale-105">
            <Icon size={18} />
          </div>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{value}</p>
        </a>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-orange-100/30 bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white shadow-lg"
    >
      <p className="text-sm font-semibold text-white">Stay Connected</p>
      <p className="mt-1 text-xs text-gray-400">Follow us for travel tips & updates</p>

      <div className="mt-5 flex gap-3">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 hover:bg-orange-500 hover:text-white hover:shadow-md hover:shadow-orange-500/20"
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </motion.div>
  </div>
);

export default ContactInfo;
