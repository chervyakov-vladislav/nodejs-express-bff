import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.serializeError());

    return;
  }

  res.status(500).json({ message: 'Internal server error' });
};
