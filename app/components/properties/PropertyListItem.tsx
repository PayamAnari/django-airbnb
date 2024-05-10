import Image from "next/image";

const PropertyListItem = () => {
  return (
     <div className="cursor-pointer">
        <div className="overflow-hidden aspect-square rounded-xl">
        <Image
                    fill
                    src="/images/beach-house.jpg"
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />
        </div>
     </div>
  )
}

export default PropertyListItem