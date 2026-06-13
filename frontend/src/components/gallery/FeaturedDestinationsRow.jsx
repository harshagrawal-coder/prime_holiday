import { galleryItems } from "../../data/galleryItems";
import LazyImage from "../ui/LazyImage";

const featuredItems = galleryItems.filter((item) => item.featured).slice(0, 3);

const FeaturedDestinationsRow = () => (
  <section className="py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="mb-8">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-500">
          Featured Destinations
        </p>
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
          Places that keep calling travelers back.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {featuredItems.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-lg backdrop-blur-md"
          >
            <div className="relative h-72 overflow-hidden">
              <LazyImage
                src={item.image}
                alt={item.title}
                wrapperClassName="h-full w-full"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-200">
                  {item.category}
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/75">{item.location}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedDestinationsRow;
