"use client"


import { useEffect, useState } from "react";
import PropertyListItem from "@/app/components/properties/PropertyListItem";
import apiService from "@/app/services/apiService";
import { useSearchParams } from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from 'date-fns';

export type PropertyType = {
     id: string;
     title: string;
     image_url: string;
     price_per_night: number;
     is_favorite: boolean;
     landlord_id: string;
     country: string;
     city: string;
     landlord: {
        name: string;
     };
     }

interface PropertyListProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
  page: number;
  setTotalPages: (totalPages: number) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  landlord_id,
  favorites,
  page,
  setTotalPages,
}) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const city = searchModal.query.city;
  const numGuests = searchModal.query.guests;
  const numBedrooms = searchModal.query.bedrooms;
  const numBed = searchModal.query.bed;
  const numBathrooms = searchModal.query.bathrooms;
  const checkinDate = searchModal.query.checkIn;
  const checkoutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [limit, setLimit] = useState<number>(10);

 
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

  const updateLimit = () => {
    if (window.innerWidth >= 1024) {
      setLimit(10);
    } else if (window.innerWidth >= 768) {
      setLimit(6);
    } else {
      setLimit(6);
    }
  };

  useEffect(() => {
    updateLimit();
    window.addEventListener('resize', updateLimit);
    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  const getProperties = async (page: number, limit: number) => {
    let url = '/api/properties/';
    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    } else if (favorites) {
      url += '?is_favorites=true';
    } else {
       let urlQuery = "";

       if (country) {
         urlQuery += "&country=" + country
       }

        if (city) {
          urlQuery += "&city=" + city
        }

       if (numGuests) {
         urlQuery += "&numGuests=" + numGuests
       }

        if (numBedrooms) {
          urlQuery += "&numBedrooms=" + numBedrooms
        }

        if (numBed) {
          urlQuery += "&numBed=" + numBed
        }

        if (numBathrooms) {
          urlQuery += "&numBathrooms=" + numBathrooms
        }

        if (category) {
          urlQuery += "&category=" + category
        }

        if (checkinDate) {
           urlQuery += "&checkin=" + format(checkinDate, "yyyy-MM-dd")
        }

        if (checkoutDate) {
          urlQuery += "&checkout=" + format(checkoutDate, "yyyy-MM-dd")
        }

        if (page) {
          urlQuery += `&page=${page}`;
        }
    
        if (limit) {
          urlQuery += `&limit=${limit}`;
        }

        if (urlQuery.length) {
            urlQuery = "?" + urlQuery.substring(1);
            url += urlQuery;
        }
    }

    try {
      const response = await apiService.get(url);
      setProperties(response.data.map((property: PropertyType) => {
        property.is_favorite = response.favorites.includes(property.id);
        return property;
      }));
      setTotalPages(response.totalPages); 
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  useEffect(() => {
    getProperties(page, limit);
  }, [category, searchModal.query, params, page, limit]);


  return (
    <>
    {properties.map((property) => {
        return (
          <PropertyListItem 
            key={property.id}
            property={property}
            landlord_id={landlord_id}
            markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
          />
        )
    })}
 
    </>
  )
}

export default PropertyList;