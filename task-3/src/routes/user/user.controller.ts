import { Request, Response, NextFunction } from 'express';
import { createUser, getAllUsers } from './user.service';

export const handleCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.body;

    const newUser = await createUser(user);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const handleGetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
};
