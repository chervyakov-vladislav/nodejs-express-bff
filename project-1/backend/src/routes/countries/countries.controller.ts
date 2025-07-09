import { NextFunction, Request, Response } from 'express';
import { ALL_COUNTRIES, BASE_URL } from './countries.constants';
import { fetchAllCountries, fetchCountryByName } from './countries.service';

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
    next(err);
  }
};
