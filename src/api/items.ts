import axios from "axios";

export interface Item {
  id: string;
  name: string;
  description: string;
}

export interface FetchItemResult {
  item: Item;
  clientMs: number;
  serverMs: number;
}

/**
 * Fetch an item by ID from the backend
 * @param id - The item ID to fetch
 * @returns The item data, client time, and server time
 */
export const fetchItem = async (id: string | number): Promise<FetchItemResult> => {
  const startTime = performance.now();

  const response = await axios.get(`/api/items/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });

  const endTime = performance.now();
  const clientMs = Math.round(endTime - startTime);
  const serverMs = parseInt(response.headers["x-server-timems"] || "0");

  return {
    item: response.data,
    clientMs,
    serverMs,
  };
};

/**
 * Evict the cache for a specific item ID
 * @param id - The item ID to evict from cache
 */
export const evictById = async (id: string | number): Promise<void> => {
  await axios.delete(`/api/items/cache/${id}`);
};

/**
 * Evict all items from the cache
 */
export const evictAll = async (): Promise<void> => {
  await axios.delete(`/api/items/cache`);
};
