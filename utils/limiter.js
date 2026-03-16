// utils/limiter.js
import pLimit from "p-limit";

export const scrapeLimit = pLimit(5); // max 5 concurrent scrapes

export async function rateDelay() {
  await new Promise(r => setTimeout(r, 200)); // ~5 req/sec
}