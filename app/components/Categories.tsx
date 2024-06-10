"use client"

import { useState } from "react";
import useSearchModal, {SearchQuery} from "../hooks/useSearchModal";
import Carousel from "./Carousel";
import CategoryData from "./forms/CategoryData";

const Categories = () => {

  const searchModal = useSearchModal();
  const[selectCategory, setSelectCategory] = useState("");

  const _setCategory = (category: string) => {
    setSelectCategory(category);
    
    const query: SearchQuery = {
        country: searchModal.query.country,
        checkIn: searchModal.query.checkIn,
        checkOut: searchModal.query.checkOut,
        guests: searchModal.query.guests,
        bedrooms: searchModal.query.bedrooms,
        bathrooms: searchModal.query.bathrooms,
        category: category,

    }

    searchModal.setQuery(query);
  }

  return (
    <div 
    onClick={() => setSelectCategory("")}
    className={`pt-3 pb-6 mx-10 md:mx-12 lg:mx-16`}>
      <Carousel data={CategoryData} 
      setCategory={_setCategory}
      dataCategory={selectCategory}      
      />
    </div>
  )
}

export default Categories;
