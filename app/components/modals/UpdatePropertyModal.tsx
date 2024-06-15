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