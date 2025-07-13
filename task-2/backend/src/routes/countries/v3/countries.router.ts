import { Router } from 'express';
import { publicCache } from '../../../common/middlewares/public-cache';
import {
  handleGetAllCountries,
  handleGetCountryByName,
} from './countries.controller';

export const COUNTRIES_ROUTE = '/v3/countries';
export const countriesRouter = Router();

countriesRouter.get('/', [publicCache], handleGetAllCountries);
countriesRouter.get('/name/:name', [publicCache], handleGetCountryByName);
