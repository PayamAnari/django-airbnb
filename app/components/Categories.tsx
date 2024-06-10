"use client"

import { useState } from "react";
import useSearchModal, {SearchQuery} from "../hooks/useSearchModal";
import Carousel from "./Carousel";
import CategoryData from "./forms/CategoryData";

const Categories = () => {

  const searchModal = useSearchModal();
  const[category, setCategory] = useState("");

  return (
    <div className="pt-3 pb-6 mx-10 md:mx-12 lg:mx-16">
      <Carousel data={CategoryData} />
    </div>
  )
}

export default Categories;
