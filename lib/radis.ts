import { Redis } from '@upstash/redis';
import IORedis, { type RedisOptions } from "ioredis";

function createConnectionOptions(): RedisOptions {
    const redisUrl = process.env.UPSTASH_REDIS_TCP_URL;

    if (!redisUrl) {
        throw new Error("UPSTASH_REDIS_TCP_URL is not defined");
    }

    const parsedUrl = new URL(redisUrl);
    const connectionOptions: RedisOptions = {
        host: parsedUrl.hostname,
        port: Number(parsedUrl.port || (parsedUrl.protocol === "rediss:" ? 6380 : 6379)),
        maxRetriesPerRequest: null,
    };

    if (parsedUrl.username) {
        connectionOptions.username = decodeURIComponent(parsedUrl.username);
    }

    if (parsedUrl.password) {
        connectionOptions.password = decodeURIComponent(parsedUrl.password);
    }

    if (parsedUrl.protocol === "rediss:") {
        connectionOptions.tls = {};
    }

    return connectionOptions;
}

export const connection = createConnectionOptions();

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

