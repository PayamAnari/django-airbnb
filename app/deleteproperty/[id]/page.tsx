"use client"

import { toast } from "react-toastify";
import apiService from "@/app/services/apiService";


const deleteProperty = async ( id: string ) => {


  try {
    const response = await apiService.deleteProperty(`/api/properties/${id}/delete`);
    console.log("ppp", response)
    if (response.success) {
      toast.success("Property deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
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