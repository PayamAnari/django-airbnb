"use client";

import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { PropertyType } from "../components/properties/PropertyList";
import CustomButton from "../components/forms/CustomButton";

interface EditPropertyButtonProps {
  userId?: string | null;
  property: PropertyType;
}

const EditPropertyButton: React.FC<EditPropertyButtonProps> = ({
  userId,
  property,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const handleEditProperty = () => {
    if (userId) {
      router.push(`/editproperty/${property.id}`);
    } else {
      loginModal.open();
    }
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    router.push(`/editproperty/${property.id}`);
  };


  return (
    <div
      onClick={handleEditProperty}
      className="cursor-pointer"
    >
      <CustomButton 
       label="Edit property"
       className="mt-2"
       onClick={handleEditClick}
      />
    </div>
  );
};

export default EditPropertyButton;
