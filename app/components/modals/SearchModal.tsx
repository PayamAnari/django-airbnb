"use client"

import SelectCountry,{ SelectCountryValue } from "../forms/SelectCountry";
import Modal from "./Modal";
import { useState } from "react";
import useSearchModal from "@/app/hooks/useSearchModal";
import CustomButton from "../forms/CustomButton";


const SearchModal = () => {
  let content = (<></>);
  const searchModal = useSearchModal();
  const[country, setCountry] = useState<SelectCountryValue>();
 
  const contentLocation = (
     <>
        <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

        <SelectCountry 
       value={country}
        onChange={(value) => setCountry(value as SelectCountryValue)}
     />
      
       <div className="mt-6 flex flex-row gap-4">
         <CustomButton 
           label="check in date ->"
           onClick={() => searchModal.open("checkIn")}
         />
       </div>
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