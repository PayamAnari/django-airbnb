"use client";

import Image from "next/image";
import Modal from "./Modal";
import { ChangeEvent, useEffect, useState } from "react";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const UpdatePropertyModal = ({ property, isOpen, close }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState(property?.category || "");
  const [dataTitle, setDataTitle] = useState(property?.title || "");
  const [dataDescription, setDataDescription] = useState(property?.description || "");
  const [dataPrice, setDataPrice] = useState(property?.price_per_night || "");
  const [dataBedrooms, setDataBedrooms] = useState(property?.bedrooms || "");
  const [dataBathrooms, setDataBathrooms] = useState(property?.bathrooms || "");
  const [dataGuests, setDataGuests] = useState(property?.guests || "");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>(property?.country || null);
  const [dataImage, setDataImage] = useState<File | null>(null);


  const router = useRouter();

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
    if (dataCategory && dataTitle && dataDescription && dataPrice && dataCountry) {
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
      if (dataImage) {
        formData.append("image", dataImage);
      }

      const url = `/api/properties/${property.id}/update/`;
      const response = await apiService.put(url, formData);

      if (response.success) {
        toast.success("Property updated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        router.push("/?updated=true");
        close();
      } else {
        const tmpErrors: string[] = Object.values(response).map((error: any) => error);
        setErrors(tmpErrors);
        toast.error("Failed to update property. Please try again.", {
          position: "top-center",
        });
      }
    }
  };

  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose category</h2>
          <Categories dataCategory={dataCategory} setCategory={setCategory} />
          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep === 2 ? (
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
          <CustomButton label="Previous" className="mb-2 bg-gray-700 hover:bg-gray-500" onClick={() => setCurrentStep(1)} />
          <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
        </>
      ) : currentStep === 3 ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>
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
          <CustomButton label="Previous" className="mb-2 bg-gray-700 hover:bg-gray-500" onClick={() => setCurrentStep(2)} />
          <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
        </>
      ) : currentStep === 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry value={dataCountry} onChange={(value) => setDataCountry(value as SelectCountryValue)} />
          </div>
          <CustomButton label="Previous" className="mb-2 bg-gray-700 hover:bg-gray-500" onClick={() => setCurrentStep(3)} />
          <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
        </>
      ) : (
        <>
          <h2 className="mb-6 text-2xl">Image</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-full">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {dataImage && (
              <div className="w-[200px] h-[150px] relative">
                <Image
                  fill
                  alt="Uploaded image"
                  src={URL.createObjectURL(dataImage)}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>
          {errors.map((error, index) => (
            <div key={index} className="p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80">
              {error}
            </div>
          ))}
          <CustomButton label="Previous" className="mb-2 bg-gray-700 hover:bg-gray-500" onClick={() => setCurrentStep(4)} />
          <CustomButton label="Submit" onClick={submitForm} />
        </>
      )}
    </>
  );

  return (
    <>
      <Modal isOpen={isOpen} close={close} label="Update Property" content={content} />
    </>
  );
};

export default UpdatePropertyModal;