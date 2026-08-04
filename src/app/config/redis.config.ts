import Redis from "ioredis";
import { config } from "./env.config";

const client = new Redis(config.redisUrl, {
    lazyConnect: true,
    enableOfflineQueue: false,
});

client.on("error", (error) => {
    console.error("Redis connection error:", error);
});

export const connectRedis = async () => {
    await client.connect();
    await client.ping();
    return client;
};

export default client;