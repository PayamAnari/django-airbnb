"use client"

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";
import Categories from "./addproperty/Categories";


const AddPropertyModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");

  const addPropertyModal = useAddPropertyModal();


  const setCategory = (category: string) => {
    setDataCategory(category)
  }

  const content = (
    <>
    {currentStep === 1 ? (
       <>
       <h2 className="mb-6 text-2xl">Choose category</h2>

       <Categories 
          dataCategory={dataCategory}
          setCategory={(category) => setCategory(category)}
       />

       <CustomButton
         label="Next"
         onClick={() => setCurrentStep(2)}
       />
       </>
    ) : currentStep == 2 ? (
      <>
         <h2 className="mb-6 text-2xl">Describe your place</h2>

         <div className="pt-3 pb-6 space-y-4">
             <div className="flex flex-col space-y-2">
                <label>Title</label>
                <input
                  type="text"
                  value={dataTitle}
                  onChange={(e) => setDataTitle(e.target.value)}
                  className="w-full p-4 border border-gray-600 rounded-full"
                  />

             </div>
             <div className="flex flex-col space-y-2">
                <label>Description</label>
                <textarea
                  value={dataTitle}
                  onChange={(e) => setDataDescription(e.target.value)}
                  className="w-full p-4 border border-gray-600 rounded-full"
                  >

                  </textarea>

             </div>
         </div>

         <CustomButton
         label="Previous"
         className="mb-2 bg-gray-700 hover:bg-gray-500"
         onClick={() => setCurrentStep(1)}
       />

         <CustomButton
         label="Next"
         onClick={() => setCurrentStep(3)}
       />
      </>
    ) : (
      <p>fdsd</p>
    )
  }
   </>
  )

  return (
    <>
       <Modal 
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label="Add Property"
        content={content}
       
       />
    </>
  )
}

export default AddPropertyModal;