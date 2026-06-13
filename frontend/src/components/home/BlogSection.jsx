import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { blogPosts } from "../../data/blogPosts";
import LazyImage from "../ui/LazyImage";

const featuredHomeBlogs = blogPosts.slice(0, 3);

const BlogSection = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SectionHeading title="Latest Travel Blogs" />
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-slate-900 transition-colors duration-300 hover:text-orange-600"
      >
        View All Stories
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
      {featuredHomeBlogs.map((blog) => (
        <Link
          key={blog.id}
          to={`/blog/${blog.slug}`}
          className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/15 hover:ring-1 hover:ring-orange-200"
        >
          <div className="relative overflow-hidden">
            <LazyImage
              src={blog.image}
              alt={blog.title}
              wrapperClassName="h-48 w-full sm:h-52"
              className="h-48 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 sm:h-52"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100" />
          </div>

          <div className="relative p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-x-5 -top-6 h-12 rounded-2xl bg-white/50 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-orange-500">
              <span>{blog.category}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400">{blog.readTime}</span>
            </div>
            <h3 className="mb-2 line-clamp-2 font-primary text-lg font-semibold text-slate-900 transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:text-orange-600 sm:text-xl">
              {blog.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-600 opacity-80 transition-all duration-300 ease-in-out group-hover:opacity-100">
              {blog.excerpt}
            </p>
            <div className="mt-5 inline-flex translate-y-2 items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 px-4 py-2 text-sm font-semibold text-orange-500 opacity-90 shadow-sm transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
              Read More
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-6" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default BlogSection;
