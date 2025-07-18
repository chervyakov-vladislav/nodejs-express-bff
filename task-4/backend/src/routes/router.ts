import { Request, Response, Router } from 'express';

import { authMiddleware } from '../common/middlewares/auth';
import { shortnerRouter } from './shortner/shortner.router';
import { usersRouter } from './user/user.router';

export const router = Router();

router.use(usersRouter);
router.use(authMiddleware);
router.use(shortnerRouter);

router.all('*all', (req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});
