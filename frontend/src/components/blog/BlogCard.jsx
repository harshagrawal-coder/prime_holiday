import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LazyImage from "../ui/LazyImage";

const BlogCard = ({ post, variant = "default" }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(15,23,42,0.1)]"
    >
      <div className="relative aspect-[3/2] shrink-0 overflow-hidden">
        <LazyImage
          src={post.image}
          alt={post.title}
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent opacity-90" />
        <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white">
          {post.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-orange-600">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>

        <div className="mt-auto pt-5">
          <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
            <span>Reading Progress</span>
            <span>{post.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
              style={{ width: `${post.progress}%` }}
            />
          </div>
        </div>

        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-900 transition-colors duration-300 hover:text-orange-600">
          Read More
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
