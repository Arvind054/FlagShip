import { createClient } from 'redis';

export const radisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-19345.crce283.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 19345
    }
});

radisClient.on('error', err => console.log('Redis Client Error', err));

await radisClient.connect();
