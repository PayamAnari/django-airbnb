"user client"

import { useState, useEffect } from "react";
import { Range } from "react-date-range" ;
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";

const initialDateRange = {
   startDate: new Date(),
   endDate: new Date(),
    key: 'selection'
}

export type Property = {
  id: string;
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

  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totlaPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>
      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">Guests</label>
         <select className="w-full -ml-1 text-xm">
           <option>1</option>
           <option>2</option>
           <option>3</option>
           <option>4</option>
           <option>5</option>
         </select>
      </div>

      <div className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl ">
        Reserve
      </div>

      <div className="mb-4 flex justify-between align-center">
         <p>$200 * 4 nights</p>
         <p>$800</p>
      </div>
      <div className="mb-4 flex justify-between align-center">
         <p>Airbnb service fee</p>
         <p>$40</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>
        <p>$840</p>
      </div>

    </aside>
  );
}


export default ReservationSidebar;