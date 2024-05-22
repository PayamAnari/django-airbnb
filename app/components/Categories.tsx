import Image from 'next/image';

const Categories = () => {
  return (
    <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/nature.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>National Parks</span>
    </div>
    
    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/beach.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Beach</span>
    </div>

    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/design.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Design</span>
    </div>

    <div 
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/cabns.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Cabins</span>
    </div>

    <div
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/tiny homes.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Tiny homes</span>
    </div>
    <div
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 opacity-60 hover:border-gray-200 hover:opacity-100`}>
        <Image
            src="/luxe.jpeg"
            alt="Category - Beach"
            width={20}
            height={20}
        />

        <span className='text-xs'>Luxe</span>
    </div>
    <div
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
)
}

export default Categories;