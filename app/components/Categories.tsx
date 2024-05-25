import Carousel from "./Carousel";
import CategoryData from "./CategoryData";

const Categories = () => {

  return (
    <div className="pt-3 pb-6 mx-10 md:mx-12 lg:mx-16">
      <Carousel data={CategoryData} />
    </div>
  )
}

export default Categories;
