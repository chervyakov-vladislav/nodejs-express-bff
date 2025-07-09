import { NotFoundError } from '../../common/errors/not-found-error';

export const fetchAllCountries = async (url: string) => {
  const res = await fetch(url).then((r) => r.json());

  const data = res.map(
    ({ capital, flags, independent, name, population, region }: any) => ({
      capital,
      flags,
      independent,
      name,
      population,
      region,
    })
  );

  return data;
};

export const fetchCountryByName = async (url: string) => {
  const result = await fetch(url).then((r) => r.json());

  if (!Array.isArray(result) || result.length === 0) {
    throw new NotFoundError();
  }

  const [country] = result;

  return {
    name: country.name,
    nativeName: country.nativeName,
    flag: country.flag,
    capital: country.capital,
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.topLevelDomain,
    currencies: country.currencies
      ? country.currencies.map((el: any) => el.name)
      : [],
    languages: country.languages
      ? country.languages.map((el: any) => el.name)
      : [],
    borders: country.borders,
  };
};

export const fetchCountryByCode = async (url: string) => {
  const countries = await fetch(url).then((r) => r.json());

  return countries.map(({ name }: any) => ({ name }));
};
