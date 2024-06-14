"use client";

import { useState, useRef, useEffect } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignUpModal";
import LogoutButton from "../LogoutButton";
import { useRouter } from "next/navigation";

interface UserNavProps {
  userId?: string | null;
  user: any;
}


const UserNav: React.FC<UserNavProps> = ({
  userId,
  user
 }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-2 w-16 relative inline-block border rounded-full hover:shadow-lg" ref={menuRef}>
       <button 
       onClick={() => setIsOpen(!isOpen)}
       className="flex items-center">
       <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {user?.avatar_url ? (
                  <img
                  src={user.avatar_url}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                  />
                ) : (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                
                )}
                  
       </button>

       {isOpen && (
          <div className="w-[220px] absolute top-[60px] right-0 bg-white rounded-xl  shadow-md border border-gray-300 flex flex-col  cursor-pointer">
            {userId ? (
              <>
                <MenuLink
                 label="Inbox"
                 onClick={() =>{
                   setIsOpen(false);
                   router.push("/inbox")
                 }}
                 />
                   <MenuLink
                 label="Profile"
                 onClick={() =>{
                   setIsOpen(false);
                   router.push(`/landlords/${userId}`)
                 }}
                 />
              <MenuLink
                 label="My properties"
                 onClick={() =>{
                   setIsOpen(false);
                   router.push("/myproperties")
                 }}
                 />
               <MenuLink
                 label="My Reservations"
                 onClick={() =>{
                   setIsOpen(false);
                   router.push("/myreservations")
                 }}
                 />
                 <MenuLink
                 label="My Favorites"
                 onClick={() =>{
                   setIsOpen(false);
                   router.push("/myfavorites")
                 }}
                 />
              <LogoutButton />
              </>
            ) : (
              <>
          
            <MenuLink
               label="Log in"
               onClick={() => {
               setIsOpen(false);
               loginModal.open()
               }}
               
            />

            <MenuLink
               label="Sign up"
               onClick={() => {
                setIsOpen(false);
                signupModal.open()
              }}
            />
              </>
            )}
          </div>
       )}
    </div>
  )
}

export default UserNav