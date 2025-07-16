import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-errors';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.serializeError());

    return;
  }

  console.log(err);
  res.status(500).json({ message: 'Internal server error' });
};
