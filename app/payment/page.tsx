"use client";

import { useStripe, useElements, CardElement, IdealBankElement } from "@stripe/react-stripe-js";
import CustomButton from "@/app/components/forms/CustomButton";
import apiService from "@/app/services/apiService";
import { useState } from "react";

const PaymentForm = ({ reservation, totalPriceWithFee, onPrevious, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e, paymentMethodType) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }
  
    setIsProcessing(true);
  
    try {
      let paymentMethod;
      if (paymentMethodType === 'card') {
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod: cardPaymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
  
        if (error) {
          console.error("Card payment method creation failed", error);
          setIsProcessing(false);
          return;
        }
  
        paymentMethod = cardPaymentMethod;
      } else if (paymentMethodType === 'ideal') {
        const idealBankElement = elements.getElement(IdealBankElement);
        const { paymentMethod: idealPaymentMethod, error } = await stripe.createPaymentMethod({
          type: 'ideal',
          ideal: idealBankElement,
        });
  
        if (error) {
          console.error("iDEAL payment method creation failed", error);
          setIsProcessing(false);
          return;
        }
  
        paymentMethod = idealPaymentMethod;
      }
  
      const response = await apiService.postStripe(`/api/properties/${reservation.id}/payment/`, {
        paymentMethodType: paymentMethod.type,
      });
  
      console.log('API response:', response);
  
      const { success, client_secret, reservation: reservationData } = response || {};
  
      if (!success || !client_secret) {
        throw new Error('API response does not contain success or client_secret');
      }

      let confirmParams = {
        payment_method: paymentMethod.id,
      };

      if (paymentMethodType === 'ideal') {
        confirmParams = {
          ...confirmParams,
          return_url: `${window.location.origin}/payment-success`, 
        };
      }
      
  
      let confirmResult;
      if (paymentMethodType === 'card') {
        confirmResult = await stripe.confirmCardPayment(client_secret, {
          payment_method: paymentMethod.id,
        });
      } else if (paymentMethodType === 'ideal') {
        confirmResult = await stripe.confirmIdealPayment(client_secret, confirmParams);
      }
  
      if (confirmResult.error) {
        console.error("Payment confirmation failed", confirmResult.error);
      } else {
        console.log("Payment successful", confirmResult.paymentIntent);
        // const deleteResponse = await apiService.delete(`/api/properties/${reservation.id}/reservation/delete`);
        // console.log('Delete reservation response:', deleteResponse);

        const confirmPaymentResponse = await apiService.postStripe(`/api/properties/${reservation.id}/confirm_payment/`, {
          payment_intent_id: confirmResult.paymentIntent.id,
      });
         console.log('Confirm payment response:', confirmPaymentResponse);


        onPaymentSuccess();
        
      }
    } catch (error) {
      console.error("Failed to complete payment", error);
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    
    <form className="w-[600px] p-5 shadow-md border border-gray-300 rounded-xl flex flex-col items-center justify-center">
      <div className="col-span-1 mt-2 text-center">
        <h2 className="text-xl mb-2">Payment</h2>
        <p className="text-sm">
          You are about to pay <strong>${totalPriceWithFee.toFixed(2)}</strong> for this reservation.
        </p>
        <p className="text-sm">Enter your payment details below and click "Pay" to complete the payment.</p>
      </div>
      <div className="w-full mt-4">
        <CardElement options={{ hidePostalCode: true }} className="p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="w-full mt-4">
        <IdealBankElement
          className="p-2 border border-gray-300 rounded-md"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />
      </div>
      <CustomButton label="Previous" className="mb-2 mt-4 bg-gray-400 hover:bg-gray-500" onClick={onPrevious} />
      <CustomButton
        label="Pay with Card"
        className="mt-2"
        onClick={(e) => handleSubmit(e, 'card')}
        disabled={isProcessing}
      />
      <CustomButton
        label="Pay with iDEAL"
        className="mt-2"
        onClick={(e) => handleSubmit(e, 'ideal')}
        disabled={isProcessing}
      />
    </form>
 
  );
};

export default PaymentForm;
