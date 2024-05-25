"use client"

import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type SelectCountryValue = {
  value: string;
  label: string;
};


interface SelectCountryProps {
  value?: SelectCountryValue;
  onChange: (value: SelectCountryValue) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
  value,
  onChange
}) => {
   return (
    <>
    gfds
    </>
   )
}


export default SelectCountry;