import { Router } from 'express';
import {
  handleCreateShortUrl,
  handleGetShortLinkByUser,
  handleRemoveShortLink,
  handleUpdateShortLinkByUser,
} from './shortner.controller';

export const shortnerRouter = Router();

shortnerRouter.post('/shortner', handleCreateShortUrl);
shortnerRouter.get('/shortner', handleGetShortLinkByUser);
shortnerRouter.patch('/shortner/:id', handleUpdateShortLinkByUser);
shortnerRouter.delete('/shortner/:id', handleRemoveShortLink);
