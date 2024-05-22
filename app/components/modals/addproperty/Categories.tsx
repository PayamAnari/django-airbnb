import Image from "next/image";



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
    <div className="pt-3 cursor-pointer flex pb-6 item_center space-x-12">

    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/icn_category_beach.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>All</span>
    </div>
    
    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/icn_category_beach.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Beach</span>
    </div>

    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/icn_category_beach.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Villas</span>
    </div>

    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/icn_category_beach.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Cabins</span>
    </div>

    <div
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/icn_category_beach.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

          <span className='text-xs'>Tiny homes</span>
      </div>
    </div>
    </>
  )
}

export default Categories;