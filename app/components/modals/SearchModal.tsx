"use client"

import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";


const SearchModal = () => {
  let content = (<></>);
  const searchModal = useSearchModal();

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