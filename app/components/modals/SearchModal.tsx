"use client"

import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";


const SearchModal = () => {
  let content = (<></>);

  return (
     <Modal 
        isOpen={SearchModal.isOpen}
     />
  )
}