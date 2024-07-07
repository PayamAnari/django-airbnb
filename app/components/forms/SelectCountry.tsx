"use client"

import React, { useState, useEffect } from 'react';
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type SelectCountryValue = {
  value: string;
  label: string;
};

interface SelectCountryProps {
  value?: SelectCountryValue;
  onChange: (value: SelectCountryValue) => void;
  dataCity?: string | null;
  setDataCity: (value: string | null) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
  value,
  onChange,
  dataCity,
  setDataCity
}) => {
  const { getAll, getCitiesByCountry } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<SelectCountryValue | null>(value || null);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(dataCity || null);

  useEffect(() => {
    if (selectedCountry) {
      setCities(getCitiesByCountry(selectedCountry.value));
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (dataCity) {
      setSelectedCity(dataCity);
    }
  }, [dataCity]);

  return (
    <>
      <Select 
        isClearable
        placeholder="Select country"
        options={getAll()}
        value={selectedCountry}
        onChange={(value) => {
          setSelectedCountry(value as SelectCountryValue);
          onChange(value as SelectCountryValue);
          setDataCity(null); 
        }}
      />
      {selectedCountry && (
        <Select
          isClearable
          placeholder="Select city"
          options={cities.map(city => ({ label: city, value: city }))}
          value={selectedCity ? { label: selectedCity, value: selectedCity } : null}
          onChange={(value) => {
            setSelectedCity(value?.value || null);
            setDataCity(value?.value || null);
          }}
        />
      )}
    </>
  );
}

export default SelectCountry;
