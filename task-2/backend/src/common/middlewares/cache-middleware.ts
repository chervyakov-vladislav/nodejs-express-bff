import { NextFunction, Request, Response } from 'express';
import { getfromRedis } from '../redis/redis-utils';
import { CacheError } from '../errors/cache-error';

export const cacheMiddleware =
  (ttl = 60) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = req.originalUrl;

    try {
      const cachedData = await getfromRedis(cacheKey);

      if (cachedData) {
        res.send(cachedData);

        return;
      }

      res.locals.cacheKey = cacheKey;
      res.locals.ttl = ttl;

      next();
    } catch (error) {
      console.error(error);
      next(new CacheError('Cannot read from Redis'));
    }
  };
