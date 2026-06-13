import CategoryCard from "./CategoryCard";
import SectionHeading from "../ui/SectionHeading";
import { homeCategories } from "../../data/homeCategories";

const PopularCategoriesSection = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
    <SectionHeading title="Popular Categories" subtitle="Find trips based on your mood" />

    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
      {homeCategories.map((item) => (
        <CategoryCard
          key={item.title}
          title={item.title}
          image={item.image}
          queryCategory={item.queryCategory}
        />
      ))}
    </div>
  </section>
);

export default PopularCategoriesSection;
