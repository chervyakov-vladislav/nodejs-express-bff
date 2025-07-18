import { Router } from 'express';
import { handleCreateShortUrl } from './shortner.controller';

export const shortnerRouter = Router();

shortnerRouter.post('/shortner', handleCreateShortUrl);
