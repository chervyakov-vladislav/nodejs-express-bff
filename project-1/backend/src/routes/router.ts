import { Request, Response, Router } from 'express';
import { COUNTRIES_ROUTE, countriesRouter } from './countries/countries.router';

export const router = Router();

router.use(COUNTRIES_ROUTE, countriesRouter);

router.all('*all', (_req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});
