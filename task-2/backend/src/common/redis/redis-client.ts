import { createClient } from 'redis';

export const redisClient = createClient({
  url: 'redis://localhost:6379',
});

export const initRedis = async () => {
  redisClient.on('error', (error) => {
    console.log('Redis error:\n', error);
  });

  redisClient.on('connect', () => {
    console.log('Redis client is connected');
  });

  await redisClient.connect();
};
