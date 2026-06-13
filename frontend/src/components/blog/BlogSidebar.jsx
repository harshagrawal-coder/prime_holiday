import { Link } from "react-router-dom";

const BlogSidebar = ({ popularPosts, categories, activeCategory, onCategoryChange }) => (
  <aside className="hidden xl:block">
    <div className="sticky top-28 space-y-6">
      <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">Popular Posts</p>
        <div className="mt-5 space-y-5">
          {popularPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block border-b border-slate-100 pb-5 transition-colors hover:text-orange-600 last:border-b-0 last:pb-0"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                {String(index + 1).padStart(2, "0")} / {post.readTime}
              </p>
              <h3 className="mt-2 text-base font-black leading-tight text-slate-900">{post.title}</h3>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-500">{post.category}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-md">
        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">Categories</p>
        <div className="mt-5 flex flex-col gap-3">
          {categories.filter((item) => item !== "All").map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-slate-950 text-white shadow-lg"
                  : "bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/25 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">Newsletter</p>
        <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">Travel notes in your inbox.</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Get destination ideas, planning tips, and curated travel inspiration every week.
        </p>
        <div className="mt-5 space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-2xl border border-white/50 bg-white/75 px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-500/20"
          />
          <button className="w-full rounded-full bg-orange-500 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </aside>
);

export default BlogSidebar;
