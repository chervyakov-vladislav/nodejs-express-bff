import { Router } from 'express';
import {
  getAllCountries,
  getCountryByCode,
  getCountryByName,
} from './countries.controller';

export const COUNTRIES_ROUTE = '/countries';
export const countriesRouter = Router();

countriesRouter.get('/', getAllCountries);
countriesRouter.get('/name/:name', getCountryByName);
countriesRouter.get('/alpha', getCountryByCode);
