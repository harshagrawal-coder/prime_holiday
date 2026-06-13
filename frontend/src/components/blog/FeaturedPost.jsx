import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LazyImage from "../ui/LazyImage";

const FeaturedPost = ({ post }) => {
  if (!post) return null;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="relative overflow-hidden">
          <LazyImage
            src={post.image}
            alt={post.title}
            wrapperClassName="h-full min-h-[280px] w-full lg:min-h-[420px]"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-orange-500 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
            Featured Story
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              <span className="rounded-full bg-orange-50 px-3 py-1.5 text-orange-600">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              {post.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{post.excerpt}</p>
          </div>

          <div className="mt-8">
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                <span>Reader Progress</span>
                <span>{post.progress}% read</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${post.progress}%` }}
                />
              </div>
            </div>

            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/25"
            >
              Read More
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
