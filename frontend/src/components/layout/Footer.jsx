import { FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  companyLinks,
  contactItems,
  quickLinks,
  socialLinks,
} from "../../data/footerData";

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="inline-flex items-center text-sm text-slate-300 transition-all duration-300 ease-in-out hover:translate-x-1 hover:text-orange-400"
  >
    {children}
  </Link>
);

const Footer = () => (
  <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white md:px-12">
    <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />

    <div className="relative mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="text-center sm:text-left">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-black text-orange-400 shadow-lg backdrop-blur-md">
              PH
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-wide text-white">
                Prime <span className="text-orange-400">Holiday</span>
              </h2>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Travel Better</p>
            </div>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-300">
            Premium India getaways with smoother planning, curated stays, and a travel team that
            stays with you throughout the journey.
          </p>

          <p className="mt-4 text-sm font-semibold text-orange-300">
            Trusted itineraries. Comfortable stays. Personal support.
          </p>

          <Link
            to="/tour"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-orange-500/20 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30"
          >
            Plan Your Trip
            <FaPaperPlane className="transition-transform duration-300 hover:translate-x-1" />
          </Link>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>
          <div className="space-y-3">
            {quickLinks.map((link) => (
              <div key={link.label}>
                <FooterLink to={link.path}>{link.label}</FooterLink>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="mb-5 text-lg font-bold text-white">Company</h3>
          <div className="space-y-3">
            {companyLinks.map((link) => (
              <div key={link.label}>
                <FooterLink to={link.path}>{link.label}</FooterLink>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-slate-200 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:rotate-6 hover:scale-105 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="mb-5 text-lg font-bold text-white">Stay Connected</h3>

          <div className="space-y-4">
            {contactItems.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all duration-300 ease-in-out hover:border-orange-400/30 hover:bg-white/10 hover:text-orange-300 sm:justify-start"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-orange-400">
                  <Icon />
                </span>
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-400 md:flex-row md:text-left">
          <p>(c) 2026 Prime Holiday. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/privacy" className="transition-colors duration-300 hover:text-orange-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors duration-300 hover:text-orange-400">
              Terms
            </Link>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
              Secure Booking
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
