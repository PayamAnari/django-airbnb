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