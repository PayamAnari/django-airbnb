"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../components/forms/CustomButton";
import { useRouter } from "next/navigation";
import deleteUserAccount from "./[id]/page";

interface DeleteUserButtonProps {
  userId?: string | null;
  
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    if (userId) {
      try {
        await deleteUserAccount(userId);
        router.push("/?deleted=true");
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <div 
    className="cursor-pointer">
      <CustomButton 
        label="Delete user"
        className="mt-2 bg-gray-500 hover:bg-gray-700"
        onClick={handleDeleteClick}
      />
    </div>
  )
}

export default DeleteUserButton;