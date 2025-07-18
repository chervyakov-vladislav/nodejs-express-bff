import { Request, Response, Router } from 'express';
import { shortnerRouter } from './shortner/shortner.router';

export const router = Router();

router.use(shortnerRouter);
router.use(/* usersRouter */ () => {});

router.all('*all', (req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});
