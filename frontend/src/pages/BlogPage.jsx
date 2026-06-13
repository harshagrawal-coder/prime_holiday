import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import BlogGrid from "../components/blog/BlogGrid";
import BlogHeroSection from "../components/blog/BlogHeroSection";
import BlogSidebar from "../components/blog/BlogSidebar";
import FeaturedPost from "../components/blog/FeaturedPost";
import SearchBar from "../components/blog/SearchBar";
import { blogCategories, blogPosts } from "../data/blogPosts";

const INITIAL_VISIBLE = 6;

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const featuredPost = useMemo(
    () => blogPosts.find((post) => post.featured) ?? blogPosts[0],
    []
  );

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const visiblePosts = filteredPosts
    .filter((post) => post.id !== featuredPost?.id)
    .slice(0, visibleCount);

  const popularPosts = [...blogPosts].sort((a, b) => b.progress - a.progress).slice(0, 4);
  const hasMore = filteredPosts.filter((post) => post.id !== featuredPost?.id).length > visibleCount;

  return (
    <>
      <BlogHeroSection />

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/40 to-sky-50/40 py-16 md:py-24">
        <div className="absolute left-0 top-8 h-56 w-56 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <div className="mb-8">
                <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">
                  Editor&apos;s Pick
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  A magazine-style look at India&apos;s most memorable trips.
                </h2>
              </div>

              <FeaturedPost post={featuredPost} />

              <div className="mt-12 space-y-6">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />

                <div className="flex flex-wrap gap-3">
                  {blogCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setVisibleCount(INITIAL_VISIBLE);
                      }}
                      className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-slate-950 text-white shadow-lg"
                          : "border border-white/60 bg-white/75 text-slate-600 backdrop-blur-md hover:border-orange-200 hover:text-orange-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <BlogGrid posts={visiblePosts} />

                {hasMore ? (
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={() => setVisibleCount((current) => current + 3)}
                      className="rounded-full bg-white px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
                    >
                      Load More
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <BlogSidebar
              popularPosts={popularPosts}
              categories={blogCategories}
              activeCategory={activeCategory}
              onCategoryChange={(category) => {
                setActiveCategory(category);
                setVisibleCount(INITIAL_VISIBLE);
              }}
            />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-300">
                  Ready To Travel
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                  Ready to explore these destinations?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Turn inspiration into an itinerary with curated tours built around your pace,
                  destination style, and travel dates.
                </p>
              </div>

              <Link
                to="/tour"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
              >
                View Tours
                <FaArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
