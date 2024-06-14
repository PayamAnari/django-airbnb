import PropertyList from "../components/properties/PropertyList";
import { getUserId } from "../lib/actions";
import CustomButton from "../components/forms/CustomButton";

const MyPropertiesPage = async () => {
  const userId = await getUserId();
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 md:mt-20 lg:mt-20">
    <h1 className="my-6 text-2xl">My properties</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PropertyList 
         landlord_id={userId}
       />
    </div>
    <div className="flex md:flex-col lg:flex-col mt-2 gap-2">
       <CustomButton 
       label="Remove Property"
       className="w-60 "
       />
         <CustomButton 
       label="Edit Property"
       className="w-60 "
       />
       </div>
</main>
  )
}

export default MyPropertiesPage