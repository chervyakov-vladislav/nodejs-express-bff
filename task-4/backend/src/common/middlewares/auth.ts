import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../errors/not-authorized-error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['accessToken'];

  if (!token) {
    next(new NotAuthorizedError());

    return;
  }

  const jwtSecret = String(process.env.JWT_SECRET);

  try {
    const payload = jwt.verify(token, jwtSecret) as { id: string };
    res.locals.user = payload;

    next();
  } catch {
    next(new NotAuthorizedError());
  }
};
