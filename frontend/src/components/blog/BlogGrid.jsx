import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

const BlogGrid = ({ posts }) => {
  if (!posts.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center backdrop-blur-md">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">No Matches</p>
        <h3 className="mt-3 text-2xl font-black text-slate-900">No stories found for this search.</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Try another category or adjust the search term to explore more travel guides.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          className="flex"
        >
          <BlogCard post={post} variant="default" />
        </motion.div>
      ))}
    </div>
  );
};

export default BlogGrid;
