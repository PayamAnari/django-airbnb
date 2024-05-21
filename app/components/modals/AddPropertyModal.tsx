"use client"

import Image from "next/image";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import LoginModal from "./LoginModal";


const AddPropertyModal = () => {
  const addPorpertyModal = useAddPropertyModal();

  const content = (
    <h2 className="mb-6 text-2xl">Choose category</h2>
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