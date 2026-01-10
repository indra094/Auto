// Simple simulation of a database using LocalStorage
// This allows data to persist across page reloads

export const DB = {
  // Simulate network latency (300-800ms)
  simulateDelay: async () => {
    const delay = Math.floor(Math.random() * 500) + 300;
    await new Promise(resolve => setTimeout(resolve, delay));
  },

  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error reading ${key} from DB`, e);
      return defaultValue;
    }
  },

  setItem: (key: string, value: any) => {
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
