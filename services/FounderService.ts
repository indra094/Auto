import { DB } from './db';

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
    await DB.simulateDelay();
    return DB.getItem<Founder[]>('founders', DEFAULT_FOUNDERS);
  },

  getFounderById: async (id: string): Promise<Founder | undefined> => {
    await DB.simulateDelay();
    const founders = DB.getItem<Founder[]>('founders', DEFAULT_FOUNDERS);
    return founders.find(f => f.id === id);
  },

  addFounder: async (founder: Omit<Founder, 'id' | 'status'>) => {
    await DB.simulateDelay();
    const founders = DB.getItem<Founder[]>('founders', DEFAULT_FOUNDERS);
    const newFounder = { ...founder, id: `f_${Date.now()}`, status: 'Incomplete' as const };
    DB.setItem('founders', [...founders, newFounder]);
    return newFounder;
  },

  updateFounder: async (id: string, updates: Partial<Founder>) => {
    await DB.simulateDelay();
    const founders = DB.getItem<Founder[]>('founders', DEFAULT_FOUNDERS);
    const updated = founders.map(f => f.id === id ? { ...f, ...updates } : f);
    DB.setItem('founders', updated);
    return updated.find(f => f.id === id);
  },

  getAlignmentScore: async (): Promise<number> => {
     await DB.simulateDelay();
     return 78; // Mock score calculation
  }
};
