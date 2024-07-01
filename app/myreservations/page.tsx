import Image from "next/image";
import apiService from "../services/apiService";
import Link from "next/link";
import { formatDateReserve } from "../components/forms/FormatDate";
import DeleteReservationButton from "../deletereservation/DeleteReservationButton";

const MyReservationsPage = async () => {
    const reservations = await apiService.get('/api/auth/myreservations/')

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 mt-6 md:mt-20 lg:mt-24">
            <h1 className="my-6 text-2xl">My reservations</h1>

            <div className="space-y-4">
                {reservations.map((reservation: any) => {
                    return (              
                        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <Link href={`/properties/${reservation.property.id}`}>
                                    <Image
                                        fill
                                        src={reservation.property.image_url}
                                        className="hover:scale-110 object-cover transition h-full w-full"
                                        alt="Beach house"
                                    />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-3">
                                <h2 className="mb-4 text-xl">{reservation.property.title}, {reservation.property.country}</h2>

                                <p className="mb-2"><strong>Check in date:</strong> {formatDateReserve(reservation.start_date)}</p>
                                <p className="mb-2"><strong>Check out date:</strong> {formatDateReserve(reservation.end_date)}</p>

                                <p className="mb-2"><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
                                <p className="mb-2"><strong>Total price:</strong> ${reservation.total_price}</p>
                                <p className="mb-2"><strong>Status:</strong> {reservation.status}</p>
                                {reservation.status === 'pending' ? (
                                    <Link 
                                        href={`/payment/${reservation.id}`}
                                        className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl"
                                    >
                                        Complete Purchase
                                    </Link>
                                ) : (
                                    <p className="mt-6 w-[197px] inline-block py-4 px-6 bg-green-500 text-white rounded-xl">
                                        Already Purchased
                                    </p>
                                )}
                                <DeleteReservationButton reservation={reservation} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default MyReservationsPage;