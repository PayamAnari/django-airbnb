"use client"

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import apiService from "@/app/services/apiService";


const deleteProperty = async ({ params }: { params: { id: string } }) => {

  const router = useRouter();

  try {
    const response = await apiService.deleteProperty(`/api/properties/${params.id}/`);
    if (response.success) {
      toast.success("Property deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      router.push("/?deleted=true");
    } else {
      toast.error("Failed to delete property. Please try again.", {
        position: "top-center",
      });
    }
  } catch (error) {
    console.error("Failed to delete property", error);
    toast.error("Failed to delete property. Please try again.");
  }
};

export default deleteProperty;