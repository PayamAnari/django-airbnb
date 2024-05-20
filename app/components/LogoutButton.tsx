"use client"

import { useRouter } from "next/navigation";
import MenuLink from "./navbar/MenuLink";


const LogoutButton = () => {
  const router = useRouter()

  const submitLogout = async () => {
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