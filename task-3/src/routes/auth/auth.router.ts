import { Router } from 'express';
import {
  handleCreateUser,
  handleLogInUser,
  handleLogOutUser,
} from './auth.controller';

export const AUTH_ROUTE = '/auth';
export const authRouter = Router();

authRouter.post('/sign-up', handleCreateUser);
authRouter.post('/sign-in', handleLogInUser);
authRouter.post('/logout', handleLogOutUser);
