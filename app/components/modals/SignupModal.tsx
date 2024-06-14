"use client";

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignUpModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import { toast} from 'react-toastify';



const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal()
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]); 


  const submitSignup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2
    }

    const response = await apiService.postWithoutToken("/api/auth/register/", JSON.stringify(formData));

    if(response.access) {

      handleLogin(response.user.id, response.access, response.refresh);
      toast.success("Signup successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      signupModal.close();
      router.push("/");
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      
      })

      setErrors(tmpErrors);

      toast.error("Signup failed. Please try again.", {
        position: "top-center",
      });
    }
  }


  const content = (
    <>
    <h2 className="mb-6 text-2xl">Welcome to Djangobnb, please signup</h2>
    <form 
      action={submitSignup}
      className="space-y-4">
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" type="e-mail" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
       <input onChange={(e) => setPassword1(e.target.value)} placeholder="Your password" type="password" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" 
      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
      
      {errors.map((error, index) => {
        return (
          <div 
          key={`error_${index}`}
          className="p-5 bg-airbnb text-white rounded-xl opacity-70">
             {error}
       </div>
        )
      })}
      

      <CustomButton 
      label="Submit"
      onClick={submitSignup}
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