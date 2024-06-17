"use client"

import { toast } from "react-toastify";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { getUserId } from "@/app/lib/actions";


const deleteUserAccount = async ( id: string) => {
  const router = useRouter();
  const userId = getUserId();

  if (!userId) {
    return;
  }
  try {
    const response = await apiService.deleteUser(`/api/auth/${id}/delete`);
    if (response.success) {
      toast.success("User deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      router.push("/?deleted=true");
    } else {
      toast.error("Failed to delete user. Please try again.", {
        position: "top-center",
      });
    }
  } catch (error) {
    console.error("Failed to delete user", error);
    toast.error("Failed to delete user. Please try again.");
  }

};



export default deleteUserAccount;