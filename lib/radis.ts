// Redis initialisation
/*
import Redis from 'ioredis';

const createRedisClient = () => {
  if (!process.env.REDIS_URL) {
    console.warn('REDIS_URL not configured - Redis features will be disabled');
    return null;
  }

  const client = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) {
        console.error('Redis connection failed after 3 retries');
        return null; // Stop retrying
      }
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,
  });

  client.on('error', (err) => {
    console.error('Redis connection error:', err.message);
  });

  client.on('connect', () => {
    console.log('Redis connected successfully');
  });

  return client;
};

export const redis = createRedisClient();
*/
