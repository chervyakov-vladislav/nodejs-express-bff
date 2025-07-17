import { Request, Response, NextFunction } from 'express';
import { createUser, logInUser } from './auth.service';

export const handleCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body;

    const token = await createUser(user);

    res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'lax',
        maxAge: 1 * 1000 * 60 * 15, // 15 minutes
      })
      .send();
  } catch (error) {
    next(error);
  }
};

export const handleLogInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const token = await logInUser(email, password);

    res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'lax',
        maxAge: 1 * 1000 * 60 * 15, // 15 minutes
      })
      .send();
  } catch (error) {
    next(error);
  }
};

export const handleLogOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .clearCookie('access_token', {
      httpOnly: true,
    })
    .send();
};
