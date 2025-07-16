import { Request, Response, Router } from 'express';
import { USERS_ROUTE, usersRouter } from './user/user.router';

export const router = Router();

router.use(USERS_ROUTE, usersRouter);

router.all('*all', (req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});
