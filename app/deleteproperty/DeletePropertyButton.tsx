"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { PropertyType } from "../components/properties/PropertyList";
import CustomButton from "../components/forms/CustomButton";
import { useRouter } from "next/navigation";

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

  const handleDeleteProperty = () => {
    if (userId) {
      router.push(`/deleteproperty/${property.id}`);
    } else {
      loginModal.open();

    }
  };


  return (
    <div
      onClick={handleDeleteProperty}
      className="cursor-pointer"
    >
      <CustomButton 
       label="Delete property"
       className="mt-2"
      />
    </div>
  );

};


  export default DeletePropertyButton;