import { motion } from "framer-motion";
import { teamMembers } from "../../data/aboutPageData";
import LazyImage from "../ui/LazyImage";

const AboutTeamSection = () => (
  <section className="py-16 md:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-500">
          Meet The Team
        </p>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
          The people behind the planning, support, and local insight.
        </h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {teamMembers.map((member) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden">
              <LazyImage
                src={member.image}
                alt={member.name}
                wrapperClassName="h-80 w-full"
                className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/15 bg-white/12 p-4 backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-200">
                  {member.role}
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">{member.name}</h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-slate-600">{member.blurb}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default AboutTeamSection;
