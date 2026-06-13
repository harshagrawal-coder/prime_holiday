import { motion } from "framer-motion";
import { aboutFeatures } from "../../data/aboutPageData";

const AboutFeaturesSection = () => (
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
          Why Choose Us
        </p>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
          Thoughtful travel, designed around people not packages.
        </h2>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {aboutFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/70 p-5 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/0 to-transparent transition-all duration-300 group-hover:from-orange-100/50" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-orange-100">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default AboutFeaturesSection;
