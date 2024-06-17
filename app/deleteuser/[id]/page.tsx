"use client";

import { toast } from "react-toastify";
import apiService from "@/app/services/apiService";
import { resetAuthCookies } from "@/app/lib/actions";

const deleteUserAccount = async (userId: string) => {

  if (!userId) {
    return;
  }

  try {
    const response = await apiService.delete(`/api/auth/${userId}/delete`);
    console.log(response)
    toast.success("User deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      await resetAuthCookies();
  
  } catch (error) {
    toast.error("Failed to delete user. Please try again.", {
      position: "top-center",
    });
  }
};

export default deleteUserAccount;
