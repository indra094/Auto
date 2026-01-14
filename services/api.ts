
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  get: async (endpoint: string) => {
    try {
      console.log(`[API] GET ${endpoint}`);
      const res = await fetch(`${API_URL}${endpoint}`);
      if (!res.ok) {
        console.error(`[API] GET ${endpoint} failed: ${res.status} ${res.statusText}`);
        throw new Error(`API Error: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.error(`[API] GET ${endpoint} Exception:`, err);
      return null;
    }
  },
  post: async (endpoint: string, data: any) => {
    try {
      console.log(`[API] POST ${endpoint}`, data);
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error(`[API] POST ${endpoint} failed: ${res.status} ${res.statusText}`);
        throw new Error(`API Error: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.error(`[API] POST ${endpoint} Exception:`, err);
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
  },
  patch: async (endpoint: string, data: any) => {
    try {
      console.log(`[API] PATCH ${endpoint}`, data);
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error(`[API] PATCH ${endpoint} failed: ${res.status} ${res.statusText}`);
        throw new Error(`API Error: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.error(`[API] PATCH ${endpoint} Exception:`, err);
      throw err;
    }
  }
};
