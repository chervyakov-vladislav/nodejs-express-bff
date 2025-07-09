const BASE_URL = 'http://localhost:3000/api/v3/countries/';

export const ALL_COUNTRIES = BASE_URL;

export const searchByCountry = (name) => BASE_URL + 'name/' + name;

export const filterByCode = (codes) =>
  BASE_URL + 'alpha?codes=' + codes.join(',');
