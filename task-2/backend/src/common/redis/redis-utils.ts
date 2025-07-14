import { redisClient } from './redis-client';

export const saveToRedis = async <T = any>(key: string, data: T, ttl = 60) => {
  await redisClient.set(key, JSON.stringify(data), {
    EX: ttl,
  });
};

export const getfromRedis = async (key: string) => {
  const data = await redisClient.get(key);

  if (data) {
    return JSON.parse(data);
  }

  return null;
};
