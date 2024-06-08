"use client"

import SelectCountry,{ SelectCountryValue } from "../forms/SelectCountry";
import Modal from "./Modal";
import { useState } from "react";
import useSearchModal from "@/app/hooks/useSearchModal";


const SearchModal = () => {
  let content = (<></>);
  const searchModal = useSearchModal();
  const[country, setCountry] = useState<SelectCountryValue>();
 
  const contentLocation = (
     <>
        <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
     </>
  )

  if (searchModal.step == "location") {
     content = contentLocation;
  }

  return (
     <Modal 
         label="Search"
         content={content}
         isOpen={searchModal.isOpen}
         close={searchModal.close}
        
     />
  )
}

export default SearchModal;