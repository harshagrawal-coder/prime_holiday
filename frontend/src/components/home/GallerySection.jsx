import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import { homeGalleryImages } from "../../data/homeGalleryImages";
import LazyImage from "../ui/LazyImage";

const GallerySection = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <SectionHeading
      title="Travel Gallery"
      subtitle="Moments that turn journeys into stories worth retelling."
    />

    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
      {homeGalleryImages.map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/15 hover:ring-1 hover:ring-orange-200"
        >
          <LazyImage
            src={image}
            alt={`gallery-${index}`}
            wrapperClassName="h-64 w-full"
            className="h-64 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/10 to-transparent opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/12 px-4 py-3 backdrop-blur-md">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                  Photo Story
                </p>
                <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                  Discover India Through Travel
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-orange-400 transition-all duration-300 group-hover:rotate-6 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/40">
                <FaArrowRight />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default GallerySection;
