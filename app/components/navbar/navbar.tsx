import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import { getUserId } from "@/app/lib/actions";
import AddPropertyButton from "./AddPropertyButtton";
import apiService from "@/app/services/apiService";


const Navbar = async () => {
  let userId, user;

  try {
    userId = await getUserId();
    if (userId) {
      user = await apiService.get(`/api/auth/${userId}/`);
    } else {
      user = null;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    user = null;
  }


  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-30">
       <div className="max-w-[1500px] mx-auto px-6">
         <div className="flex justify-between items-center">
          <Link href="/">
          <div className="hidden md:block">
            <Image
             src="/logo.png"
             alt="Djangobnb-large-logo"
             width={180}
             height={38}
           />
           </div>
           <div className="block md:hidden ">
          <Image
            src="/air.png"
            alt="Djangobnb-logo"
            width={45}
            height={38}
          />
        </div>
          </Link>

          <div className="hidden lg:flex gap-6 text-gray-500">
            <p className="cursor-pointer hover:text-black">Stays</p>
            <p className="cursor-pointer hover:text-black">Experiences</p>
            <p className="cursor-pointer hover:text-black">Online Experiences</p>

          </div>
          <div className="flex items-center space-x-3 md:space-x-0">
          <div className="md:hidden">
              <SearchFilters />
            </div>

            <AddPropertyButton
              userId={userId}
            />

             <UserNav
             userId={userId}
              user={user}
             />
          </div>
         </div>
         <div className="hidden md:flex justify-center space-x-6 ">
              <SearchFilters />
          </div>
       </div>
    </nav>
  )
}


export default Navbar