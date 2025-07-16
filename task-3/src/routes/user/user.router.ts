import { Router } from 'express';
import { handleGetAllUsers, handleCreateUser } from './user.controller';

export const USERS_ROUTE = '/users';
export const usersRouter = Router();

usersRouter.post('/', handleCreateUser);
usersRouter.get('/', handleGetAllUsers);
