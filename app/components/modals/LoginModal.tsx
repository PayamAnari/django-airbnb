"use client";

import Modal from "./Modal";
import { useState } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";


const LoginModal = () => {
  const loginModal = useLoginModal()

  const content = (
    <>
    <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please log in</h2>
    <form className="space-y-4">
      <input placeholder="Your email address" type="e-mail" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
       <input placeholder="Your password" type="password" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />

      <div className="p-5 bg-airbnb text-white rounded-xl opacity-70">
         Error message
      </div>

      <CustomButton 
      label="Submit"
      onClick={() => console.log("Clicked")}
      />

    </form>
    </>
  )
  return (
    <Modal
       isOpen={loginModal.isOpen}
       close={loginModal.close}
       label="Log in"
       content={content}
       />
  )
}

export default LoginModal;