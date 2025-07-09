export const mapCountry = (country: any) => {
  return {
    name: country.name.common,
    capital: country.capital[0],
    region: country.region,
    population: country.population,
    flags: {
      svg: country.flags.svg,
      png: country.flags.png,
    },
  };
};

export const compareCountryNames = (a: any, b: any): number => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const extractNativeName = (nativeName: any) => {
  return (Object.values(nativeName)[0] as any).common;
};

const extractCurrencies = (currency: any) =>
  Object.values(currency).map((val: any) => val.name);

const extractValues = (obj: Record<string, string>) => Object.values(obj);

export const transformCountry = (country: any) => {
  return {
    name: country.name.common,
    nativeName: extractNativeName(country.name.nativeName),
    flag: country.flags.svg,
    capital: country.capital[0],
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.tld,
    currencies: extractCurrencies(country.currencies),
    languages: extractValues(country.languages),
    borders: country.borders,
  };
};
