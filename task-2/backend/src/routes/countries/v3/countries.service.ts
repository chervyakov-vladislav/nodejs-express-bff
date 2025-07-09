import { NotFoundError } from '../../../common/errors/not-found-error';
import { BASE_URL } from './countries.constants';
import {
  compareCountryNames,
  mapCountry,
  transformCountry,
} from './countries.mappers';

export const fetchAllCountries = async (url: string) => {
  const res = await fetch(url).then((r) => r.json());

  const data = res.map(mapCountry).sort(compareCountryNames);

  return data;
};

export const fetchCountryByName = async (url: string) => {
  const result = await fetch(url).then((r) => r.json());

  if (!Array.isArray(result) || result.length === 0) {
    throw new NotFoundError();
  }

  const country = transformCountry(result[0]);

  let neighbors = [];
  if (country.borders) {
    const alphaUrl = new URL('alpha', BASE_URL);
    alphaUrl.searchParams.set('codes', country.borders.join(','));
    neighbors = await fetchNeighbors(alphaUrl.href);
  }

  return {
    name: country.name,
    nativeName: country.nativeName,
    flag: country.flag,
    capital: country.capital,
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.topLevelDomain,
    currencies: country.currencies,
    languages: country.languages,
    neighbors,
  };
};

const fetchNeighbors = async (url: string) => {
  const neighbors = await fetch(url).then((r) => r.json());

  return neighbors.map(({ name }: any) => ({ name: name.common }));
};
