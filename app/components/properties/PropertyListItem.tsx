import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";
import CustomButton from "../forms/CustomButton";

interface PropertyProps {
  property: PropertyType;
  loggedInUserId: string;
  markFavorite?: (is_favorite: boolean) => void; 

}

const PropertyListItem: React.FC<PropertyProps> = ({
    property,
    loggedInUserId,
    markFavorite,
}) => { 
  const router = useRouter();

  const isOwner = property.landlord_id === loggedInUserId;
  console.log("Owner",isOwner)
  return (
     <div 
     className="cursor-pointer"
     onClick={() => router.push(`/properties/${property.id}`)}
     >
        <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
                    fill
                    src={property.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />

              {markFavorite && (
                <FavoriteButton
                  id={property.id}
                  is_favorite={property.is_favorite}
                  markFavorite={(is_favorite) => markFavorite(is_favorite)}
                />
              
              )}
        </div>
        <div className="mt-2">
           <p className="text-lg font-bold">{property.title}</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
        </div>
        {!isOwner && (
        <div className="flex md:flex-col mt-2 gap-2">
          <CustomButton 
            label="Remove Property"
            className="w-48"
          />
          <CustomButton 
            label="Edit Property"
            className="w-48"
          />
        </div>
      )}
     </div>
  )
}

export default PropertyListItem