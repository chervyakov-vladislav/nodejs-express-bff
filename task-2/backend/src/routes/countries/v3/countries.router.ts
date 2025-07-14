import { Router } from 'express';
import { publicCache } from '../../../common/middlewares/public-cache';
import {
  handleGetAllCountries,
  handleGetCountryByName,
} from './countries.controller';
import { cacheMiddleware } from '../../../common/middlewares/cache-middleware';

export const COUNTRIES_ROUTE = '/v3/countries';
export const countriesRouter = Router();

countriesRouter.get(
  '/',
  [publicCache, cacheMiddleware(300)],
  handleGetAllCountries
);
countriesRouter.get(
  '/name/:name',
  [publicCache, cacheMiddleware(300)],
  handleGetCountryByName
);
