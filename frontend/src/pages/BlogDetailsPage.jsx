import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaClock, FaTag } from "react-icons/fa";
import LazyImage from "../components/ui/LazyImage";
import { blogPosts } from "../data/blogPosts";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-28 text-center sm:px-6">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-500">Blog Story</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
          Story Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          This article is not available right now. Head back to the journal and explore other travel
          stories.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
        >
          <FaArrowLeft size={10} />
          Back To Blog
        </Link>
      </section>
    );
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src={post.image}
            alt={post.title}
            priority
            wrapperClassName="h-full w-full"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/35" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 md:pb-24">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-orange-300/50 hover:bg-white/15"
          >
            <FaArrowLeft size={10} />
            Back To Blog
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
              <span className="rounded-full bg-orange-500 px-4 py-2 text-white">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-8 max-w-xl">
              <div className="mb-2 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
                <span>Reader Progress</span>
                <span>{post.progress}% complete</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300"
                  style={{ width: `${post.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-white via-orange-50/35 to-sky-50/35 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-md md:p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="font-semibold">By {post.author}</span>
              <span className="text-slate-300">/</span>
              <span>{post.date}</span>
            </div>

            <div className="mt-8 space-y-5">
              {post.content.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">Quick Details</p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <FaTag className="text-orange-500" />
                  {post.category}
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <FaClock className="text-orange-500" />
                  {post.readTime}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-md">
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">Key Highlights</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {post.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-orange-50 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-orange-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-300">Inspired?</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">Turn this story into a real itinerary.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Explore curated tours and plan a trip inspired by the places you just read about.
              </p>
              <Link
                to="/tour"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
              >
                View Tours
                <FaArrowRight size={10} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-500">More Stories</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Keep reading in the same travel mood.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.1)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                    {item.category}
                  </p>
                  <h3 className="mt-3 line-clamp-2 text-xl font-black tracking-tight text-slate-900 group-hover:text-orange-600">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
