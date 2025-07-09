import { Request, Response } from 'express';
import { ALL_COUNTRIES, BASE_URL } from './countries.constants';

export const getAllCountries = async (req: Request, res: Response) => {
  const data = await fetch(ALL_COUNTRIES).then((r) => r.json());

  res.send(data);
};

export const getCountryByName = async (req: Request, res: Response) => {
  const url = new URL(`name/${encodeURIComponent(req.params.name)}`, BASE_URL);
  const data = await fetch(url).then((r) => r.json());

  res.send(data);
};

export const getCountryByCode = async (req: Request, res: Response) => {
  const url = new URL('alpha', BASE_URL);
  url.searchParams.set('codes', String(req.query.codes));
  const data = await fetch(url).then((r) => r.json());

  res.send(data);
};
