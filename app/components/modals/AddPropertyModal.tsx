"use client"

import Image from "next/image";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import LoginModal from "./LoginModal";


const AddPropertyModal = () => {
  const addPorpertyModal = useAddPropertyModal();

  return (
    <>
       <Modal 
        isOpen={addPorpertyModal.isOpen}
        close={addPorpertyModal.close}
        label="Add Property"
        content={(
          <p>Yo</p>
        )}
       
       />
    </>
  )
}

export default AddPropertyModal;