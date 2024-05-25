import Image from "next/image";
import Carousel from "../../Carousel";
import CategoryData from "../../CategoryData";

interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  dataCategory,
  setCategory
}) => {


  return (
    <div className="pt-3 cursor-pointer flex flex-col pb-6">
      <Carousel data={CategoryData} setCategory={setCategory} dataCategory={dataCategory} />
    </div>
  )
}

export default Categories;
