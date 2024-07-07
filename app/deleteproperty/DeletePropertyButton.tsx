"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { PropertyType } from "../components/properties/PropertyList";
import CustomButton from "../components/forms/CustomButton";
import { useRouter } from "next/navigation";
import deleteProperty from "./[id]/page";

interface DeletePropertyButtonProps {
  userId?: string | null;
  property: PropertyType;
}

const DeletePropertyButton: React.FC<DeletePropertyButtonProps> = ({
  userId,
  property,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    if (userId) {
      try {
        await deleteProperty(property.id);
        router.push("myproperties?deleted=true");
      } catch (error) {
        console.error("Failed to delete property", error);
      }
    } else {
      loginModal.open();
    }
  };



  return (
    <div 
    className="cursor-pointer">
      <CustomButton 
        label="Delete property"
        className="mt-2 bg-gray-500 hover:bg-gray-700"
        onClick={handleDeleteClick}
      />
    </div>
  );
};

export default DeletePropertyButton;
