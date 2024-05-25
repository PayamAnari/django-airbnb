import Carousel from "./Carousel";
import CategoryData from "./CategoryData";

const Categories = () => {

  return (
    <div className="pt-3 pb-6">
      <Carousel data={CategoryData} />
    </div>
  )
}

export default Categories;
