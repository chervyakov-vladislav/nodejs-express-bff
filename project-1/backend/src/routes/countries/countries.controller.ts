import { NextFunction, Request, Response } from 'express';
import { ALL_COUNTRIES, BASE_URL } from './countries.constants';
import {
  fetchAllCountries,
  fetchCountryByCode,
  fetchCountryByName,
} from './countries.model';

export const handleGetAllCountries = async (req: Request, res: Response) => {
  const data = await fetchAllCountries(ALL_COUNTRIES);

  res.send(data);
};

export const handleGetCountryByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = new URL(
      `name/${encodeURIComponent(req.params.name)}`,
      BASE_URL
    );
    const data = await fetchCountryByName(url.href);

    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const handleGetCountryByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = new URL('alpha', BASE_URL);
    url.searchParams.set('codes', String(req.query.codes));
    const data = await fetchCountryByCode(url.href);

    res.send(data);
  } catch (error) {
    next(error);
  }
};
