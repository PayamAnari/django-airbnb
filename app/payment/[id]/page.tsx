"use client"


import usePaymentModal from "@/app/hooks/usePaymentModal";
import Modal from "@/app/components/modals/Modal";
import CustomButton from "@/app/components/forms/CustomButton";
import Link from "next/link";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';



const PaymentService = async ({ params }: { params: { id: string }}) => {
  const paymentModal = usePaymentModal();
  const router = useRouter();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      if (params.id) {
        const data = await apiService.get(`/api/auth/${params.id}/myreservations`);
        setReservation(data);
      }
    };
    fetchReservation();
  }, [params.id]);
  

  
  const content = (

    <>
     <h1>Payment</h1>
    
    <Link href={`payment/`}>
     <CustomButton 
      label="Payment"
      onClick={paymentModal.close}
      className=""
      />
    </Link>
    </>
  );

  return (
    <>
       <Modal 
        isOpen={paymentModal.isOpen}
        close={paymentModal.close}
        label="Edit Property"
        content={content}
       
       />
    </>
  )
}


export default PaymentService;