"use client"

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";
import { resetAuthCookies } from "../lib/actions";
import { toast} from 'react-toastify';


const LogoutButton: React.FC = () => {
  const router = useRouter()

  const submitLogout = async () => {
    await resetAuthCookies()
    toast.success("Logged out successful!", {
      position: "top-center",
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