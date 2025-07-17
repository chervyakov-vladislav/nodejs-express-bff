import { Router } from 'express';
import {
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
} from './user.controller';

export const USERS_ROUTE = '/users';
export const usersRouter = Router();

usersRouter.get('/', handleGetAllUsers);
usersRouter.get('/:id', handleGetUserById);
usersRouter.delete('/:id', handleDeleteUserById);
usersRouter.patch('/:id', handleUpdateUserById);
