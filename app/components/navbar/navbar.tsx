import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
       <div className="max-w-[1500px] mx-auto px-6">
         <div className="flex justify-between items-center">
          <Link href="/">
            <Image
             src="/logo.png"
             alt="Djangobnb logo"
              width={100}
              height={100}
           />
          </Link>
         </div>
       </div>
    </nav>
  )
}


export default Navbar