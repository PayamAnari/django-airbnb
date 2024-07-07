"use client"

import SelectCountry,{ SelectCountryValue } from "../forms/SelectCountry";
import Modal from "./Modal";
import { useState } from "react";
import DatePicker from "../forms/calendar";
import {  Range } from "react-date-range";
import useSearchModal, { SearchQuery} from "@/app/hooks/useSearchModal";
import CustomButton from "../forms/CustomButton";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
  let content = (<></>);
  const searchModal = useSearchModal();
  const[country, setCountry] = useState<SelectCountryValue>();
  const[city, setCity] = useState<string | null>(null);
  const[numGuests, setNumGuests] = useState<string>("1");
  const[numBathrooms, setNumBathrooms] = useState<string>("0");
  const[numBed, setNumBed] = useState<string>("0");
  const[numBedrooms, setNumBedrooms] = useState<string>("0");
  const[dateRange, setDateRange] = useState<Range>(initialDateRange);

  const resetForm = () => {
    setCountry(undefined);
    setCity(null);
    setNumGuests("1");
    setNumBathrooms("0");
    setNumBed("0");
    setNumBedrooms("0");
    setDateRange(initialDateRange);
    searchModal.open("location"); 
  };


  const closeAndSearch = () => {
    
    const newSearchQuery: SearchQuery = {
       country: country?.label,
       city: city,
       checkIn: dateRange.startDate,
       checkOut: dateRange.endDate,
       guests: parseInt(numGuests),
       bedrooms: parseInt(numBedrooms),
       bed: parseInt(numBed),
       bathrooms: parseInt(numBathrooms),
       category: ""
    }

    searchModal.setQuery(newSearchQuery);
    resetForm();
    searchModal.close();
    
  }




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
        dataCity={city}
        setDataCity={(value) => setCity(value)}
     />
      
       <div className="mt-6 flex flex-row gap-4">
         <CustomButton 
           label="Check in date ->"
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

  const contentCheckOut = (
    <>
       <h2 className="mb-6 text-2xl">When do you want to check out?</h2>

       <DatePicker 
         value={dateRange}
         onChange={(value) => _setDateRange(value.selection)}
       />
       <div className="mt-6 flex flex-row gap-4">
        <CustomButton 
          label="<- Check in date"
          onClick={() => searchModal.open("checkin")}
        />

        <CustomButton 
          label="Details ->"
          onClick={() => searchModal.open("details")}
        />
      </div>
    </>
 )

 const contentDetails = (
  <>
     <h2 className="mb-6 text-2xl">Details</h2>

     <div className="space-y-4">
        <div className="space-y-4">
            <label>Number of guests</label>
            <input 
             type="number"
             min="1" 
             value={numGuests} 
             placeholder="Number of guests"
             onChange={(e) => setNumGuests(e.target.value)}
             className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
        </div>
        <div className="space-y-4">
            <label>Number of bathrooms</label>
            <input 
             type="number"
             min="1" 
             value={numBathrooms} 
             placeholder="Number of bathrooms"
             onChange={(e) => setNumBathrooms(e.target.value)}
             className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
        </div>
        <div className="space-y-4">
            <label>Number of bedrooms</label>
            <input 
             type="number"
             min="1" 
             value={numBedrooms} 
             placeholder="Number of bedrooms"
             onChange={(e) => setNumBedrooms(e.target.value)}
             className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
        </div>
        <div className="space-y-4">
            <label>Number of beds</label>
            <input 
             type="number"
             min="1" 
             value={numBed} 
             placeholder="Number of beds"
             onChange={(e) => setNumBed(e.target.value)}
             className="w-full h-14 px-4 border border-gray-300 rounded-xl"
            />
        </div>
     </div>


     <div className="mt-6 flex flex-row gap-4">
      <CustomButton 
        label="<- Check out date"
        onClick={() => searchModal.open("checkout")}
      />

      <CustomButton 
        label="Search"
        onClick={closeAndSearch}
      />
    </div>
  </>
)


  if (searchModal.step == "location") {
     content = contentLocation;
  } else if ( searchModal.step == "checkin") {
     content = contentCheckIn;
  } else if (searchModal.step === "checkout") {
     content = contentCheckOut;
  } else if (searchModal.step === "details") {
     content = contentDetails;
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