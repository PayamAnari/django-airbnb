"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../components/forms/CustomButton";
import { useRouter } from "next/navigation";
import deleteReservation from "./[id]/page";
import { getUserId } from "../lib/actions";

interface DeleteReservationButtonProps {
  reservation: any;
}

const DeleteReservationButton: React.FC<DeleteReservationButtonProps> = ({
  reservation,
}) => {
  const userId = getUserId();
  const loginModal = useLoginModal();
  const router = useRouter();

  const handleDeleteClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    
    if (userId) {
      try {
        await deleteReservation(reservation.id);
        router.push("/?deleted=true");
      } catch (error) {
        console.error("Failed to delete reservation", error);
      }
    } else {
      loginModal.open();
    }
  };



  return (
    <div 
    className="cursor-pointer">
      <CustomButton 
        label="Delete reservation"
        className="mt-2 w-[196px] bg-gray-500 hover:bg-gray-700"
        onClick={handleDeleteClick}
      />
    </div>
  );
};

export default DeleteReservationButton;
