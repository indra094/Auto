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

const DEFAULT_FOUNDERS: Founder[] = [
  {
    id: 'f_1',
    name: 'Alex (You)',
    role: 'CEO',
    hoursPerWeek: 60,
    equity: 52,
    cashContribution: 10000,
    riskTolerance: 'High',
    vestingCliff: 1,
    status: 'Complete'
  },
  {
    id: 'f_2',
    name: 'Jamie',
    role: 'CTO',
    hoursPerWeek: 25,
    equity: 48,
    cashContribution: 5000,
    riskTolerance: 'Low',
    vestingCliff: 1,
    status: 'Risk'
  }
];

export const FounderService = {
  init: () => {
    DB.initCollection('founders', DEFAULT_FOUNDERS);
  },

  getFounders: async (): Promise<Founder[]> => {
    // GET /founders/
    return api.get('/founders/');
  },

  getFounderById: async (id: string): Promise<Founder | undefined> => {
    // GET /founders/{id}
    return api.get(`/founders/${id}`);
  },

  addFounder: async (founder: Omit<Founder, 'id' | 'status'>) => {
    // POST /founders/
    return api.post('/founders/', founder);
  },

  updateFounder: async (id: string, updates: Partial<Founder>) => {
    // PUT /founders/{id}
    return api.put(`/founders/${id}`, updates);
  },

  getAlignmentScore: async (): Promise<number> => {
    await DB.simulateDelay();
    return 78; // Mock score calculation
  }
};
