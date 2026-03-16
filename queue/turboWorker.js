// queue/turboWorker.js
import { Worker } from "bullmq";
import redis from "../cache/redisClient.js";
import scrapeTurbo from "../scraper/turboScraper.js";
import parse from "../scraper/parser.js";
import buildCacheKey from "../utils/cacheKey.js";
import { scrapeLimit } from "../utils/limiter.js";

new Worker(
  "turboQueue",
  async job => {
    try {
      const filters = job.data;
      const cacheKey = buildCacheKey(filters);

      const html = await scrapeLimit(() => scrapeTurbo(filters));
      const parsed = parse(html);

      await redis.set(cacheKey, JSON.stringify(parsed), {
        EX: 300
      });

      return parsed;
    } catch (err) {
      console.error("Error processing job:", err);
      throw new Error('Failure reason as string or array');
    }
  },
  { connection: { host: "127.0.0.1", port: 6379 } }
);