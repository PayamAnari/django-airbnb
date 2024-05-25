import countries from 'world-countries';

const fromattedCountries = countries.map((country) => {
  return {
    label: country.name.common,
    value: country.cca2,
  };
});
