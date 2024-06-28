"use client"

import { toast } from "react-toastify";
import apiService from "@/app/services/apiService";


const deleteReservation = async ( id: string ) => {


  try {
    const response = await apiService.delete(`/api/properties/${id}/reservation/delete`);
    if (response) {
      toast.success("Reservation deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.error("Failed to delete reservation. Please try again.", {
        position: "top-center",
      });
    }
  } catch (error) {
    console.error("Failed to delete reservation", error);
    toast.error("Failed to delete reservation. Please try again.");
  }
};

export default deleteReservation;