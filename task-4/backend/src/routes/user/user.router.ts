import { Router } from 'express';
import {
  handleCreateUser,
  handleLoginUser,
  handleLogOutUser,
} from './user.controller';

export const usersRouter = Router();

usersRouter.post('/users', handleCreateUser);
usersRouter.post('/users/login', handleLoginUser);
usersRouter.post('/users/logout', handleLogOutUser);
