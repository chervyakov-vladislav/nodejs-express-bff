import { Router } from 'express';
import {
  handleGetAllCountries,
  handleGetCountryByName,
} from './countries.controller';

export const COUNTRIES_ROUTE = '/countries';
export const countriesRouter = Router();

countriesRouter.get('/', handleGetAllCountries);
countriesRouter.get('/name/:name', handleGetCountryByName);
