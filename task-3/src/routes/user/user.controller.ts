import { Request, Response, NextFunction } from 'express';
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from './user.service';

export const handleGetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const users = await getAllUsers(limit, page);

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
