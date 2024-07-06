"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../components/forms/CustomButton";
import { useRouter } from "next/navigation";
import deleteReservation from "./[id]/page";
import { getUserId } from "../lib/actions";
import Image from "next/image";

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
        router.push("/myreservations");
      } catch (error) {
        console.error("Failed to delete reservation", error);
      }
    } else {
      loginModal.open();
    }
  };



  return (
    <div>
    <Image
    onClick={handleDeleteClick}
    src="/close.png"
    width={33}
    height={33}
    alt="Close icon"
    className="top-3 right-3 absolute cursor-pointer"
  />
    </div>
  );
};

export default DeleteReservationButton;
