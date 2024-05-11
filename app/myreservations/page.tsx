import Image from "next/image";


const MyReservationsPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pd-6">
      <h1 className="my-6 text-2xl">My reservations</h1>

      <div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
            <div className="col-span-1">
               <div className="relative overflow-hidden aspect-square rounded-xl">
               <Image
                  fill
                  src="/beach_1.jpg"
                  className="hover:scale-110 object-cover transition h-full w-full"
                  alt="Beach house"
               />
               </div>
            </div>
            <div className="col-span-3 space-y-2">
               <h2 className="mb-4 text-xl">Property Name</h2>

               <p><strong>Check in date:</strong> 15/04/2024</p>
               <p><strong>Check out date:</strong> 05/09/2024</p>
            </div>
        </div>
      </div>
    </main>
  )
}


export default MyReservationsPage