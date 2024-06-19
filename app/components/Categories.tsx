"use client"

import { useState, useEffect } from "react";
import useSearchModal, {SearchQuery} from "../hooks/useSearchModal";
import Carousel from "./Carousel";
import CategoryData from "./forms/CategoryData";

const Categories = () => {

  const searchModal = useSearchModal();
  const[selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setSelectedCategory(CategoryData[0]?.title || ""); 
  }, []);

  const _setCategory = (category: string) => {
    setSelectedCategory(category);
    
    const query: SearchQuery = {
        country: searchModal.query.country,
        checkIn: searchModal.query.checkIn,
        checkOut: searchModal.query.checkOut,
        guests: searchModal.query.guests,
        bedrooms: searchModal.query.bedrooms,
        bathrooms: searchModal.query.bathrooms,
        category: category === "Icons" ? "" : category,

    }

    searchModal.setQuery(query);
  }

  return (
    <div 
    
    className={`pt-3 pb-6 mx-6 md:mx-12 lg:mx-16`}>
      <Carousel data={CategoryData} 
      setCategory={_setCategory}
      dataCategory={selectedCategory}      
      />
    </div>
  )
}

export default Categories;
