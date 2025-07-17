import { Request, Response, Router } from 'express';
import { USERS_ROUTE, usersRouter } from './user/user.router';
import { TODOS_ROUTE, todosRouter } from './todo/todo.router';
import { AUTH_ROUTE, authRouter } from './auth/auth.router';
import { authMiddleware } from '../common/middlewares/auth';

export const router = Router();

router.use(AUTH_ROUTE, authRouter);
router.use(authMiddleware);
router.use(USERS_ROUTE, usersRouter);
router.use(TODOS_ROUTE, todosRouter);

router.all('*all', (req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});
