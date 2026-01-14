import { DB } from './db';
import { api } from './api';

export interface Founder {
  id: string;
  name: string;
  role: string;
  hoursPerWeek: number;
  equity: number;
  cashContribution: number;
  riskTolerance: 'Low' | 'Medium' | 'High';
  vestingCliff: number;
  status: 'Complete' | 'Risk' | 'Incomplete';
}

export const FounderService = {
  getFounders: async (email: string): Promise<Founder[]> => {
    // GET /founders/
    return api.get(`/founders/?email=${email}`);
  },

  getFounderById: async (id: string): Promise<Founder | undefined> => {
    // GET /founders/{id}
    return api.get(`/founders/${id}`);
  },

  addFounder: async (email: string, founder: Omit<Founder, 'id' | 'status'>) => {
    // POST /founders/
    return api.post(`/founders/?email=${email}`, founder);
  },

  updateFounder: async (id: string, updates: Partial<Founder>) => {
    // PUT /founders/{id}
    return api.put(`/founders/${id}`, updates);
  },

  getAlignmentScore: async (email: string): Promise<number> => {
    // This will eventually be a real calculation on the backend
    // For now we'll throw or return a placeholder IF it's in DB.
    // Plan: no fallback. Since it's not in DB yet, we skip or handle.
    return 78;
  }
};
