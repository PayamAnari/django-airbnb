import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import { getUserId } from "@/app/lib/actions";
import AddPropertyButton from "./AddPropertyButtton";

const Navbar = async () => {
  const userId = await getUserId();
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
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
            src="/airlogo.png"
            alt="Djangobnb logo"
            width={45}
            height={38}
          />
        </div>
          </Link>

          
          <div className="flex items-center space-x-2 md:space-x-0">
          <div className="md:hidden">
              <SearchFilters />
            </div>

            <AddPropertyButton
              userId={userId}
            />

             <UserNav
             userId={userId}
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