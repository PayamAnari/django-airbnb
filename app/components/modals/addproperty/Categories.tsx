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
        onClick={() => setCategory("National Parks")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  ${dataCategory == "National Parks" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/nature.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>National Parks</span>
    </div>
    
    <div 
        onClick={() => setCategory("Beach")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Beach" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/beach.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Beach</span>
    </div>

    <div 
        onClick={() => setCategory("Design")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Design" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/design.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Design</span>
    </div>

    <div 
        onClick={() => setCategory("Cabins")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Cabins" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/cabns.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Cabins</span>
    </div>

    <div
        onClick={() => setCategory("Tiny homes")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Tiny homes" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/tiny homes.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Tiny homes</span>
    </div>
    <div
        onClick={() => setCategory("Luxe")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == "Luxe" ? "border-gray-800" : "border-white"} opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/luxe.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Luxe</span>
    </div>
    <div
        onClick={() => setCategory("Countryside")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/countryside.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Countryside</span>
    </div>
    <div
        onClick={() => setCategory("Camping")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/camping.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Camping</span>
     </div>
    </div>
    </>
  )
}

export default Categories;