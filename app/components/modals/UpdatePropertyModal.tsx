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