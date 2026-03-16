// cache/redisClient.js
import { createClient } from "redis";

const redis = createClient();

redis.on("error", (err) => console.error("Redis Client Error", err));

// Wait for the connection to finish before exporting
await redis.connect();
console.log('Connected to Redis!');

export default redis;
