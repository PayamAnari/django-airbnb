"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomButton from "@/app/components/forms/CustomButton";
import Categories from "@/app/components/addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "@/app/components/forms/SelectCountry";
import apiService from "@/app/services/apiService";
import { toast } from "react-toastify";
import useEditPropertyModal from "@/app/hooks/useEditPropertyModal";
import Modal from "@/app/components/modals/Modal";

const EditPropertyPage = ({ params }: { params: { id: string } }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedrooms, setDataBedrooms] = useState("");
  const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue | null>(null);
  const [dataImage, setDataImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  const router = useRouter();
  const editPropertyModal = useEditPropertyModal();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const property = await apiService.get(`/api/properties/${params.id}/`);
      
        setDataCategory(property.category);
        setDataTitle(property.title);
        setDataDescription(property.description);
        setDataPrice(property.price_per_night);
        setDataBedrooms(property.bedrooms);
        setDataBathrooms(property.bathrooms);
        setDataGuests(property.guests);
        setDataCountry({ label: property.country, value: property.country_code });
        setExistingImage(property.image_url);

        editPropertyModal.open();
      } catch (error) {
        console.error("Failed to fetch property details", error);
        toast.error("Failed to fetch property details.");
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    }
  };

  const submitForm = async () => {
    
    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataImage 
    ) {
        const formData = new FormData();
        formData.append("category", dataCategory);
        formData.append("title", dataTitle);
        formData.append("description", dataDescription);
        formData.append("price_per_night", dataPrice);
        formData.append("bedrooms", dataBedrooms);
        formData.append("bathrooms", dataBathrooms);
        formData.append("guests", dataGuests);
        formData.append("country", dataCountry.label);
        formData.append("country_code", dataCountry.value);
        formData.append("image", dataImage);

      

        const response = await apiService.putProperty(`/api/properties/${params.id}/editproperty/`, formData);

        if (response.success) {
          toast.success("Property edited successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
          router.push("/?added=true");
          editPropertyModal.close();
        } else {
          console.log("Error");

          const tmpErrors : string[] = Object.values(response).map((error: any) => {
             return error;

          })
          setErrors(tmpErrors)
          toast.error("Failed to edit property. Please try again.", {
            position: "top-center",
          });

        }
    }
}
  
const handleCloseModal = () => {
  editPropertyModal.close();
  router.push('/');
};
  

  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose category</h2>
          <Categories dataCategory={dataCategory} setCategory={setCategory} />
          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep == 2 ? (
        <>
          <h2 className="mb-6 text-2xl">Describe your place</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Description</label>
              <textarea
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
              ></textarea>
            </div>
          </div>
          <CustomButton
            label="Previous"
            className="mb-2 bg-gray-700 hover:bg-gray-500"
            onClick={() => setCurrentStep(1)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
        </>
      ) : currentStep == 3 ? (
        <>
          <h2 className="mb-6 text-2xl">More Information</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Price per night</label>
              <input
                type="number"
                value={dataPrice}
                onChange={(e) => setDataPrice(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Bedrooms</label>
              <input
                type="number"
                value={dataBedrooms}
                onChange={(e) => setDataBedrooms(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Bathrooms</label>
              <input
                type="number"
                value={dataBathrooms}
                onChange={(e) => setDataBathrooms(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Maximum number of guests</label>
              <input
                type="number"
                value={dataGuests}
                onChange={(e) => setDataGuests(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>
          <CustomButton
            label="Previous"
            className="mb-2 bg-gray-700 hover:bg-gray-500"
            onClick={() => setCurrentStep(2)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
        </>
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry value={dataCountry} 
             onChange={(value) => setDataCountry(value as SelectCountryValue)} />
          </div>
          <CustomButton
            label="Previous"
            className="mb-2 bg-gray-700 hover:bg-gray-500"
            onClick={() => setCurrentStep(3)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
        </>
      ) : (
        <>
          <h2 className="mb-6 text-2xl">Image</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-full">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {dataImage ? (
              <div className="w-[200px] h-[200px] overflow-hidden rounded-xl relative">
                <Image
                  src={URL.createObjectURL(dataImage)}
                  alt="Property image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : existingImage ? (
              <div className="w-[200px] h-[200px] overflow-hidden rounded-xl relative">
                <Image
                  src={existingImage}
                  alt="Property image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>
          <CustomButton
            label="Previous"
            className="mb-2 bg-gray-700 hover:bg-gray-500"
            onClick={() => setCurrentStep(4)}
          />
          <CustomButton label="Submit" onClick={submitForm} />
        </>
      )}
    </>
  );

  return (
    <>
       <Modal 
        isOpen={editPropertyModal.isOpen}
        close={handleCloseModal}
        label="Edit Property"
        content={content}
       
       />
    </>
  )

}

export default EditPropertyPage;
