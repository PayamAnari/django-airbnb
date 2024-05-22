interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  dataCategory,
  setCategory
}) => {
  return (
    <>
    <div className="pt-3 cursor-pointer pb-6 item_center space-x-12">
      gfds
    </div>
    </>
  )
}

export default Categories;