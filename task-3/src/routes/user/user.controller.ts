import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from './user.service';

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

export const handleGetUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    const user = await deleteUserById(userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await updateUserById(userId, userData);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
