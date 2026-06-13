import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LazyImage from "../ui/LazyImage";

const CategoryCard = ({ title, image, queryCategory }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/tours?category=${queryCategory}`)}
      className="group relative isolate cursor-pointer overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/15"
    >
      <div className="relative h-[300px] overflow-hidden sm:h-[320px] lg:h-[330px] xl:h-[345px]">
        <LazyImage
          src={image}
          alt={title}
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover object-center brightness-[0.96] contrast-105 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-100"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/18 px-3 py-1.5 shadow-md shadow-black/10 backdrop-blur-md transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:bg-white/24">
          <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/90">
            Curated Escape
          </p>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="max-w-[72%] rounded-2xl border border-white/25 bg-black/15 px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:px-5 group-hover:bg-black/20">
            <h3 className="font-primary text-lg font-bold leading-tight text-white sm:text-[1.15rem]">
              {title}
            </h3>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/20 text-white shadow-md backdrop-blur-md transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:bg-white/30">
            <FaArrowRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
