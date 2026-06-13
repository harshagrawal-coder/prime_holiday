import { useMemo, useState } from "react";
import GalleryHeroSection from "../components/gallery/GalleryHeroSection";
import FilterBar from "../components/gallery/FilterBar";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Lightbox from "../components/gallery/Lightbox";
import FeaturedDestinationsRow from "../components/gallery/FeaturedDestinationsRow";
import GalleryCTASection from "../components/gallery/GalleryCTASection";
import { galleryCategories } from "../data/galleryItems";
import { useGallery } from "../context/GalleryContext";

const GalleryPage = () => {
  const { images: galleryItems } = useGallery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeItem, setActiveItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const activeIndex = filteredItems.findIndex((item) => item.id === activeItem?.id);

  const handlePrev = () => {
    if (!filteredItems.length) return;
    const nextIndex = activeIndex <= 0 ? filteredItems.length - 1 : activeIndex - 1;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handleNext = () => {
    if (!filteredItems.length) return;
    const nextIndex = activeIndex >= filteredItems.length - 1 ? 0 : activeIndex + 1;
    setActiveItem(filteredItems[nextIndex]);
  };

  return (
    <>
      <GalleryHeroSection />
      <FeaturedDestinationsRow />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/50 to-sky-50/60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-orange-500">
              Browse The Collection
            </p>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              A visual map of unforgettable travel moments.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Filter by travel mood and open any image for a closer preview of the destination story.
            </p>
          </div>

          <FilterBar
            categories={galleryCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />

          <div className="mt-8">
            <GalleryGrid items={filteredItems} onSelect={setActiveItem} />
          </div>
        </div>
      </section>

      <GalleryCTASection />

      <Lightbox
        items={filteredItems}
        activeItem={activeItem}
        onClose={() => setActiveItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};

export default GalleryPage;
