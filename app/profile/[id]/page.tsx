
import Image from "next/image";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";


const LandlordProfilePage = async ({ params }: { params: { id: string }}) => {

  const landlord = await apiService.get(`/api/auth/${params.id}`)
  const userId = await getUserId();
  const isOwnProfile = userId === params.id;


  return (
    <main className="max-w-[1500px] mx-auto px-7 p-6  rounded-lg ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-200 px-6 py-6">
        <aside className="col-span-1 mb-4">
          <p className="text-2xl mb-6">Profile {landlord.name}</p>
          <div className="flex flex-col max-w-[350px] h-[220px] mx-auto items-center p-4 rounded-2xl bg-white border border-gray-300 shadow-2xl">
          <Image
              src={landlord.avatar_url}
              width={140}
              height={140}
              alt="Landlord name"
              className="rounded-full"
            />
            <div className="flex flex-col">
            <h1 className="text-3xl font-bold">
              {landlord.name}
            </h1>
            <p className="text-md text-center font-bold">Guest</p>
            </div>
        
          </div>
        </aside>
        
          <div className="mt-3 flex flex-col gap-2 text-lg px-2 md:px-4 lg:px-6">
                <p>Email: anari.p62@gmail.com</p>
                <p>Born in the ...</p>
                <p>My work: Freelance manager</p>
                <p>Telephone: 0936463884</p>
                <p>Address: Nieuwstad 35</p>
                <p>Joined: ...</p>
        
            </div> 
            
            </div>
          
    </main>

  )
}

export default LandlordProfilePage