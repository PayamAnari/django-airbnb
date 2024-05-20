"use client";

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { handleLogin } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string>[]([]);

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