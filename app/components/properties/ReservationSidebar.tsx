"use client"

import { useState, useEffect } from "react";
import { Range } from "react-date-range" ;
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import DatePicker from "../forms/calendar";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";


const initialDateRange = {
   startDate: new Date(),
   endDate: new Date(),
   key: 'selection'
}

export type Property = {
  id: string;
  guests: number;
  price_per_night: number;
}

interface ReservationSidebarProps {
  userId: string | null
  property: Property
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  property,
  userId
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");
  const [tax, setTax] = useState<number>(0);

  const guestsRange = Array.from({length: property.guests}, (_, index) => index + 1);

  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();
        formData.append("guests", guests);
        formData.append("start_date", format(dateRange.startDate, "yyyy-MM-dd"));
        formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
        formData.append("number_of_nights", nights.toString());
        formData.append("total_price", totalPrice.toString());

        const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);

        if (response.success) {
          toast.success("Booking successful!", {
            position: "top-center",
            autoClose: 2000,
          });
          router.push("/myreservations")
        } else {
          toast.error("Booking failed. Please try again.", {
            position: "top-center",
          });
        }
      }
    } else {
      loginModal.open();
    }
  }
  
  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate
    })
  }

  const getReservations = async () => {
    const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`);

    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
       const range = eachDayOfInterval({
          start: new Date(reservation.start_date),
          end: new Date(reservation.end_date)
        });

        dates = [...dates, ...range];
    })

    setBookedDates(dates);
  }

  useEffect(() => {
    getReservations();

    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      
      if (dayCount && property.price_per_night) {
        const bookingCost = dayCount * property.price_per_night;
        const _fee = (bookingCost / 100) * 5;
        const _tax = bookingCost * 0.10;

        setFee(_fee);
        setTax(_tax);
        setTotalPrice(bookingCost + _fee + _tax);
        setNights(dayCount);
      } else {
        const _fee = (property.price_per_night / 100) * 5;
        const _tax = property.price_per_night * 0.10;
        setFee(_fee);
        setTax(_tax);
        setTotalPrice(property.price_per_night + _fee + _tax);
        setNights(1)
      }
    }

  }, [dateRange])

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>
      
      <div className="relative mb-6 overflow-hidden">
        <DatePicker
          value={dateRange}
          bookedDates={bookedDates}
          onChange={(value) => _setDateRange(value.selection)}
        />
      </div>
      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">Guests</label>
         <select 
           value={guests}
           onChange={(e) => setGuests(e.target.value)}
           className="w-full -ml-1 text-xm">
            {guestsRange.map((guest) => (
              <option key={guest} value={guest}>{guest}</option>
            ))}
         </select>
      </div>

      <div 
        onClick={performBooking}
        className="w-full mb-6 py-6 cursor-pointer text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl">
        Reserve
      </div>

      <div className="mb-4 flex justify-between align-center">
         <p>${property.price_per_night} * {nights} nights</p>
         <p>${property.price_per_night * nights}</p>
      </div>
      <div className="mb-4 flex justify-between align-center">
         <p>Airbnb service fee</p>
         <p>${fee.toFixed(2)}</p>
      </div>
      <div className="mb-4 flex justify-between align-center">
         <p>Taxes</p>
         <p>${tax.toFixed(2)}</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>
        <p>${totalPrice.toFixed(2)}</p>
      </div>

    </aside>
  );
}

export default ReservationSidebar;
