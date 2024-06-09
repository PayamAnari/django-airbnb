"use client"


import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";

export type PropertyType = {
     id: string;
     title: string;
     image_url: string;
     price_per_night: number;
     is_favorite: boolean;

}

interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
  landlord_id,
  favorites
}) => {
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const numGuests = searchModal.query.guests;
  const numBedrooms = searchModal.query.bedrooms;
  const numBathrooms = searchModal.query.bathrooms;
  const checkinDate = searchModal.query.checkIn;
  const checkoutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;
  const [properties, setProperties] = useState<PropertyType[]>([]);
 
  const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {

      if (property.id == id) {
        property.is_favorite = is_favorite;

        if (is_favorite) {
          console.log("Added favorite property")
        } else {
          console.log("Removed favorite")
        }
      }
      return property;
    })

    setProperties(tmpProperties)
  }

  const getProperties = async () => {
    let url = '/api/properties/';
    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    } else if (favorites) {
      url += '?is_favorites=true';
    }
    const tmpProperties = await apiService.get(url);

    setProperties(tmpProperties.data.map((property: PropertyType) => {
      if (tmpProperties.favorites.includes(property.id)) {
        property.is_favorite = true
      } else {
        property.is_favorite = false
      }

      return property;
    }));    
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
    {properties.map((property) => {
        return (
          <PropertyListItem 
            key={property.id}
            property={property}
            markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
          />
        )
    })}
  
    </>
  )
}

export default PropertyList;