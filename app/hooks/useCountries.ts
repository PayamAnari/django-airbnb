import countries from 'world-countries';
import { getCities } from 'countries-cities';

const formattedCountries = countries.map((country) => {
  return {
    label: country.name.common,
    value: country.cca2,
  };
});

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  const getCitiesByCountry = (countryValue: string) => {
    const country = formattedCountries.find((c) => c.value === countryValue);
    if (country) {
      return getCities(country.label) || [];
    }
    return [];
  };

  return {
    getAll,
    getByValue,
    getCitiesByCountry,
  };
};

export default useCountries;
