import { NextFunction, Request, Response } from 'express';

export const publicCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader('Cache-Control', 'public, max-age=86400');

  next();
};
