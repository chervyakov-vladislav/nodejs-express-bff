import { Request, Response, NextFunction } from 'express';
import { createUser, loginUser } from './user.service';

export const handleCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const { token, id } = await createUser(email, password);

    res
      .status(201)
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 15, // 15 min
      })
      .send({ id });
  } catch (error) {
    next(error);
  }
};

export const handleLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const token = await loginUser(email, password);

    res
      .status(201)
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 15, // 15 min
      })
      .send({});
  } catch (error) {
    next(error);
  }
};

export const handleLogOutUser = async (req: Request, res: Response) => {
  res.clearCookie('accessToken', { httpOnly: true }).send({});
};
