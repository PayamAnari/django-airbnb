"use client"

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";


const AddPropertyModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const addPorpertyModal = useAddPropertyModal();

  const content = (
    <>
    {currentStep === 1 ? (
       <>
       <h2 className="mb-6 text-2xl">Choose category</h2>

       <CustomButton
         label="Next"
         onClick={() => setCurrentStep(2)}
       />
       </>
    ) : (
      <p>Step 2</p>
    )
  }
   </>
  )

  return (
    <>
       <Modal 
        isOpen={addPorpertyModal.isOpen}
        close={addPorpertyModal.close}
        label="Add Property"
        content={content}
       
       />
    </>
  )
}

export default AddPropertyModal;