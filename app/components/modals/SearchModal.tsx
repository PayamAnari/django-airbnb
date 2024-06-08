"use client"

import SelectCountry,{ SelectCountryValue } from "../forms/SelectCountry";
import Modal from "./Modal";
import { useState } from "react";
import DatePicker from "../forms/calendar";
import {  Range } from "react-date-range";
import useSearchModal from "@/app/hooks/useSearchModal";
import CustomButton from "../forms/CustomButton";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
  let content = (<></>);
  const searchModal = useSearchModal();
  const[dateRange, setDateRange] = useState<Range>(initialDateRange);
  const[country, setCountry] = useState<SelectCountryValue>();


  const _setDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
       searchModal.open("checkout");
    } else if ( searchModal.step === "checkout") {
      searchModal.open("details")
    }

    setDateRange(selection);
  }
 
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
           onClick={() => searchModal.open("checkin")}
         />
       </div>
     </>
  )

  const contentCheckIn = (
     <>
        <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

        <DatePicker 
          value={dateRange}
          onChange={(value) => _setDateRange(value.selection)}
        />
        <div className="mt-6 flex flex-row gap-4">
         <CustomButton 
           label="<- Location"
           onClick={() => searchModal.open("location")}
         />

         <CustomButton 
           label="Check out here ->"
           onClick={() => searchModal.open("checkout")}
         />
       </div>
     </>
  )

  if (searchModal.step == "location") {
     content = contentLocation;
  } else if ( searchModal.step == "checkin") {
     content = contentCheckIn;
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