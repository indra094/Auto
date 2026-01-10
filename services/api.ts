
const API_URL = 'http://localhost:8000';

export const api = {
  get: async (endpoint: string) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`);
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  post: async (endpoint: string, data: any) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  put: async (endpoint: string, data: any) => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};
