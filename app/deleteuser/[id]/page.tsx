"use client"

import { toast } from "react-toastify";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { getUserId } from "@/app/lib/actions";


const DeleteUser = async ( id: string) => {
  const router = useRouter();
  const userId = getUserId();
  if (!userId) {
    return;
  }
  try {
    await apiService.delete(`/api/auth/${id}/delete`);
    toast.success("User deleted successfully");
    router.push("/users");
  } catch (error) {
    toast.error("Failed to delete user");
  }
}


export default DeleteUser;