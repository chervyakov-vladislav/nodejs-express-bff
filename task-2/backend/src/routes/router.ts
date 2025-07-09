import { Request, Response, Router } from 'express';
import {
  COUNTRIES_ROUTE as COUNTRIES_ROUTE_V2,
  countriesRouter as countriesRouterV2,
} from './countries/v2/countries.router';
import {
  COUNTRIES_ROUTE as COUNTRIES_ROUTE_V3,
  countriesRouter as countriesRouterV3,
} from './countries/v3/countries.router';

export const router = Router();

router.use(COUNTRIES_ROUTE_V2, countriesRouterV2);
router.use(COUNTRIES_ROUTE_V3, countriesRouterV3);

router.all('*all', (_req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});
