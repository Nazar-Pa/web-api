// utils/cacheKey.js
export default function buildCacheKey(filters) {
  return `turbo:${JSON.stringify(filters)}`;
};