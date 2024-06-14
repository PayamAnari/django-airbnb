"use client"

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/actions";
import { toast} from 'react-toastify';


const LogoutButton: React.FC = () => {
  const router = useRouter()

  const submitLogout = async () => {
    resetAuthCookies()
    toast.success("Logged out successful!", {
      position: "top-center",
      autoClose: 2000,
    });

    router.push("/")
  }

  return (
    <MenuLink
        label="Log out"
        onClick={submitLogout}
    />
  )
}


export default LogoutButton;