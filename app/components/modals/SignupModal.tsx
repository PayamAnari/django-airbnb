"use client";

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignUpModal";
import CustomButton from "../forms/CustomButton";


const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal()
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]); 


  const content = (
    <>
    <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please signup</h2>
    <form className="space-y-4">
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" type="e-mail" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
       <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      
      {errors.map((error, index) => {
        return (
          <div className="p-5 bg-airbnb text-white rounded-xl opacity-70">
          Error message
       </div>
        )
      })}
      

      <CustomButton 
      label="Submit"
      onClick={() => console.log("Clicked")}
      />

    </form>
    </>
  )
  return (
    <Modal
       isOpen={signupModal.isOpen}
       close={signupModal.close}
       label="Signup"
       content={content}
       />
  )
}

export default SignupModal;