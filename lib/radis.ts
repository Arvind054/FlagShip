import { createClient } from 'redis';

// Redis Caching 
export const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 19345,
        connectTimeout: 200,
         reconnectStrategy: () => { return false;}
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect()
.then(()=>console.log("Redis Connected Successfully."))
.catch(()=>console.log("Redis Connection Failled."))
