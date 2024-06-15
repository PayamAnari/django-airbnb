"use client";


import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";


interface EditPropertyButtonProps {
   userId?: string | null;
}

const EditPropertyButton: React.FC<EditPropertyButtonProps> = ({
  userId
}) => {
  const loginModal = useLoginModal();
  const editPropertyModal = useEditPropertyModal();
  
  const editProperty = () => {
    if (userId) {
      editPropertyModal.open();
    } else {
      loginModal.open();
    }
  
  }
  return (
    <div 
    
    className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200">
          <CustomButton 
            label="Edit Property"
            className="w-48"
            onClick={editProperty}
          />
    </div>
  )
}

export default EditPropertyButton;