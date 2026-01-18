// Simple simulation of a database using LocalStorage
// This allows data to persist across page reloads

export const DB = {
  // Simulate network latency (300-800ms)
  simulateDelay: async () => {
    const delay = Math.floor(Math.random() * 500) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));
  },

  getItem: <T>(key: string, fallback: T | null = null): T | null => {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`Invalid JSON for key ${key}`, raw);
      return fallback;
    }
  },

  setItem: (key: string, value: any) => {
    if (value === undefined) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to DB`, e);
    }
  },

  // Initialize default data if empty
  initCollection: <T>(key: string, defaultData: T) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(defaultData));
    }
  }
};
