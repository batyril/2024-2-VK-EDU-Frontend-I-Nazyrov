type CacheKey = string;
type CacheValue = string;

const cache = new Map<CacheKey, CacheValue>();

export function getCached(key: CacheKey): CacheValue | undefined {
  return cache.get(key);
}

export function setCached(key: CacheKey, value: CacheValue): void {
  cache.set(key, value);
}

export function generateCacheKey(
  text: string,
  from: string,
  to: string,
): CacheKey {
  return `${text}_${from}_${to}`;
}
