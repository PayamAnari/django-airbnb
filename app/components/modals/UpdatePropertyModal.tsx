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