
import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import  Link  from "next/link";
import { formatDistanceToNow } from 'date-fns';



const LandlordDetailPage = async ({ params }: { params: { id: string }}) => {

  const landlord = await apiService.get(`/api/auth/${params.id}`)
  const userId = await getUserId();
  const isOwnProfile = userId === params.id;
  const formatDate = (date) => formatDistanceToNow(new Date(date), { addSuffix: true });


  return (
    <main className="max-w-[1500px] mx-auto px-7 p-6 rounded-lg ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-200 px-12 py-8 ">
        <aside className="col-span-1 mb-4">
          <p className="text-2xl mb-2 -ml-4">{isOwnProfile ? "Profile" : "Meet Your host"}</p>
          <div className="flex flex-col max-w-[350px] h-[220px] mx-auto items-center p-4 rounded-2xl bg-white border border-gray-300 shadow-2xl">
          <Image
              src={landlord.avatar_url}
              width={80}
              height={80}
              alt="Landlord name"
              className="rounded-full"
            />
            <div className="flex flex-col">
            <h1 className="text-2xl font-bold mt-2">
              {landlord.name}
            </h1>
            <p className="text-md text-center font-bold">Guest</p>
            </div>
        
          </div>
        </aside>
        
          <div className="col-span-1 mt-0 lg:mt-10 md:col-span-2 pl-0 md:pl-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex gap-2 ">
              <Image 
                src="/email.png"
                width={24}
                height={24}
                alt="Email"
                />
                <p>Email: {landlord.email}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/birth.png"
                width={24}
                height={24}
                alt="birthday"
                />
                <p>Born in: {landlord.birthday}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/work.png"
                width={24}
                height={24}
                alt="work"
                />
                <p>My work: {landlord.work}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/phone.png"
                width={24}
                height={24}
                alt="phone"
                />
                <p>Phone: {landlord.telephone}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/address.png"
                width={24}
                height={24}
                alt="address"
                />
                <p>Address: {landlord.address}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/about.png"
                width={24}
                height={24}
                alt="about"
                />
                <p>About me: {landlord.about_me}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/song.png"
                width={24}
                height={24}
                alt="song"
                />
                <p>Favorite song: {landlord.favorite_song}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/date.png"
                width={24}
                height={24}
                alt="date"
                />
                <p>Joined: {formatDate(landlord.date_joined)}</p>
              </div>
              <div className="flex gap-2 ">
              <Image 
                src="/login.png"
                width={24}
                height={24}
                alt="login"
                />
                <p>Last login: {formatDate(landlord.last_login)}</p>
              </div>
                 
                {isOwnProfile && (
            <Link href={`/profile/${params.id}`}>
              <button className="mt-4 px-2 py-2 text-sm bg-transparent hover:bg-white text-black border border-black rounded-lg">
                Edit Profile
              </button>
            </Link>
          )}

                <div className="mx-auto w-full md:px-4 lg:px-5 flex justify-start">  
            {!isOwnProfile &&  (
               <ContactButton 
               />

            )}
            </div> 
            </div>
            </div>
          
      </div>
    </main>

  )
}

export default LandlordDetailPage