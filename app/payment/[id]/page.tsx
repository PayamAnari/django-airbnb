"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import usePaymentModal from "@/app/hooks/usePaymentModal";
import Modal from "@/app/components/modals/Modal";
import CustomButton from "@/app/components/forms/CustomButton";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import { formatDateReserve } from "@/app/components/forms/FormatDate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../page";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


const PaymentService = ({ params }) => {
  const paymentModal = usePaymentModal();
  const router = useRouter();
  const [reservation, setReservation] = useState(null);
  const [fee, setFee] = useState(0);
  const [totalPriceWithFee, setTotalPriceWithFee] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const fetchReservations = async () => {
      if (params.id) {
        try {
          const data = await apiService.get(`/api/auth/${params.id}/reservation/`);
          setReservation(data);
          const serviceFee = (data.total_price / 100) * 5;
          setFee(serviceFee);
          setTotalPriceWithFee(data.total_price + serviceFee);

          paymentModal.open();
        } catch (err) {
          console.error('Failed to fetch reservations', err);
        }
      }
    };
    fetchReservations();
  }, [params.id]);

  const handleCloseModal = () => {
    paymentModal.close();
    router.push('/');
  };

  const content = reservation ? (
    <div className="flex flex-col items-center justify-center">
      {currentStep === 1 ? (
        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl justify-center items-center">
          <div className="col-span-1">
            <div className="relative overflow-hidden aspect-square mt-2 rounded-xl">
              <Image
                fill
                src={reservation.property.image_url}
                className="hover:scale-110 object-cover transition h-full w-full"
                alt="Beach house"
              />
            </div>
            <h2 className="mb-4 mt-2 text-xl">{reservation.property.title}</h2>
          </div>
          <div className="col-span-1 ml-6 md:col-span-3">
            <p><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
            <p><strong>Check in date:</strong> {formatDateReserve(reservation.start_date)}</p>
            <p><strong>Check out date:</strong> {formatDateReserve(reservation.end_date)}</p>
            <p><strong>Price per night:</strong> ${reservation.price_per_night} * {reservation.number_of_nights}</p>
            <p><strong>Total price:</strong> ${reservation.total_price}</p>
            <p><strong>Airbnb service fee:</strong> ${fee.toFixed(2)}</p>
            <p><strong>Total price with fee:</strong> <strong className="text-md">${totalPriceWithFee.toFixed(2)}</strong></p>
          </div>
          <hr />
          <div className="col-span-1 md:col-span-3 flex justify-center mt-4">
            <CustomButton
              label="Next"
              onClick={() => setCurrentStep(2)}
            />
          </div>
        </div>
       ) : currentStep === 2 ? (
        <Elements stripe={stripePromise}>
          <PaymentForm
            reservation={reservation}
            totalPriceWithFee={totalPriceWithFee}
            onPrevious={() => setCurrentStep(1)}
            onPaymentSuccess={() => setCurrentStep(3)}
          />
        </Elements>
         ) : currentStep === 3 ? (
          <div className="text-center p-6 border">
            <h2 className="text-2xl font-bold mb-4"> Payment Successful</h2>
            <p>Your payment was successful and your reservation for <strong>{reservation.property.title}</strong> is complete.</p>
            <CustomButton label="Go to Reservations" onClick={() => router.push('/myreservations')} className="mt-4" />
          </div>
      ) : null}
    </div>
    
  ) : null;

  return (
    <>
      <Modal 
        isOpen={paymentModal.isOpen}
        close={handleCloseModal}
        label="Payment"
        content={content}
      />
    </>
  );
}

export default PaymentService;