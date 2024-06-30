import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";
import EditPropertyButton from "@/app/editproperty/EditPropertyButton";
import DeletePropertyButton from "@/app/deleteproperty/DeletePropertyButton";



interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void; 
  landlord_id?: string | null;
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property,
    markFavorite,
    landlord_id,
}) => { 
  
  const router = useRouter();
 
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
           <p className="text-lg font-bold">{property.title}, {property.country}</p>
        </div>
        <div className="mt-2">
           <p>Hosted by {property.landlord.name} </p>
        </div>
        <div className="mt-2 mb-4">
          <p className="text-sm text-gray-500"><strong>${property.price_per_night}</strong> per night</p>
        </div>
        <div>
 
     {landlord_id && (
      <>
          <EditPropertyButton 
            userId={landlord_id}
            property={property}
          />  

         <DeletePropertyButton 
            userId={landlord_id}
            property={property}
          />

      </>   
      )}
    </div>
     </div>
  )
}

export default PropertyListItem