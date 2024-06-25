"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import usePaymentModal from "@/app/hooks/usePaymentModal";
import Modal from "@/app/components/modals/Modal";
import CustomButton from "@/app/components/forms/CustomButton";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import { formatDateReserv } from "@/app/components/forms/FormatDate";

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

  const content = reservation ? (
    <div className="flex flex-col items-center justify-center">
      {currentStep === 1 ? (
        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl justify-center items-center">
          <div className="col-span-1">
            <div className="relative overflow-hidden aspect-square rounded-xl">
              <Image
                fill
                src={reservation.property.image_url}
                className="hover:scale-110 object-cover transition h-full w-full"
                alt="Beach house"
              />
            </div>
            <h2 className="mb-4 mt-2 text-xl">{reservation.property.title}</h2>
          </div>
          <div className="col-span-1 md:col-span-3">
            <p><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
            <p><strong>Check in date:</strong> {formatDateReserv(reservation.start_date)}</p>
            <p><strong>Check out date:</strong> {formatDateReserv(reservation.end_date)}</p>
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
        <div className="w-[600px] p-5 shadow-md border border-gray-300 rounded-xl flex flex-col items-center justify-center">
          <div className="col-span-1 mt-2 text-center">
            <h2 className="text-xl mb-2">Payment</h2>
            <p className="text-sm">You are about to pay <strong>${totalPriceWithFee.toFixed(2)}</strong> for this reservation.</p>
            <p className="text-sm">You will be charged once you click the button below.</p>
          </div>
          <CustomButton
         label="Previous"
         className="mb-2 mt-4 bg-gray-400 hover:bg-gray-500"
         onClick={() => setCurrentStep(1)}
       />
            <CustomButton 
              label="Purchase"
              className=""
              onClick={() => {
                router.push(`/payment/${reservation.id}`);
              }}
            />
        </div>
      ) : null}
    </div>
  ) : null;

  return (
    <>
      <Modal 
        isOpen={paymentModal.isOpen}
        close={paymentModal.close}
        label="Payment"
        content={content}
      />
    </>
  );
}

export default PaymentService;
