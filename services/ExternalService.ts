import { DB } from './db';

export interface Investor {
  id: string;
  name: string;
  type: string;
  stage: string;
  status: string;
  notes?: string;
}

export interface Customer {
  id: string;
  company: string;
  role: string;
  status: string;
  signal: number;
  notes?: string;
}

const DEFAULT_INVESTORS: Investor[] = [
  { id: 'inv_1', name: 'Sequoia Capital', type: 'VC', stage: 'Seed - IPO', status: 'To Contact', notes: '' },
  { id: 'inv_2', name: 'Y Combinator', type: 'Accelerator', stage: 'Pre-seed', status: 'Applied', notes: '' },
  { id: 'inv_3', name: 'Jason Calacanis', type: 'Angel', stage: 'Seed', status: 'Meeting Set', notes: '' }
];

const DEFAULT_CUSTOMERS: Customer[] = [
  { id: 'cust_1', company: 'Acme Corp', role: 'VP Engineering', status: 'Interviewed', signal: 4, notes: 'Struggling with equity management.' },
  { id: 'cust_2', company: 'Beta Inc', role: 'CTO', status: 'Outreach', signal: 2, notes: '' }
];

export const ExternalService = {
  // Investors
  getInvestors: async (): Promise<Investor[]> => {
    await DB.simulateDelay();
    return DB.getItem<Investor[]>('investors', DEFAULT_INVESTORS);
  },
  
  getInvestorById: async (id: string): Promise<Investor | undefined> => {
    await DB.simulateDelay();
    const items = DB.getItem<Investor[]>('investors', DEFAULT_INVESTORS);
    return items.find(i => i.id === id);
  },

  updateInvestor: async (id: string, data: Partial<Investor>) => {
    await DB.simulateDelay();
    const items = DB.getItem<Investor[]>('investors', DEFAULT_INVESTORS);
    const updated = items.map(i => i.id === id ? { ...i, ...data } : i);
    DB.setItem('investors', updated);
    return updated.find(i => i.id === id);
  },

  addInvestor: async (investor: Omit<Investor, 'id'>) => {
     await DB.simulateDelay();
     const items = DB.getItem<Investor[]>('investors', DEFAULT_INVESTORS);
     const newItem = { ...investor, id: `inv_${Date.now()}` };
     DB.setItem('investors', [...items, newItem]);
     return newItem;
  },

  // Customers
  getCustomers: async (): Promise<Customer[]> => {
    await DB.simulateDelay();
    return DB.getItem<Customer[]>('customers', DEFAULT_CUSTOMERS);
  },

  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    await DB.simulateDelay();
    const items = DB.getItem<Customer[]>('customers', DEFAULT_CUSTOMERS);
    return items.find(i => i.id === id);
  },

  updateCustomer: async (id: string, data: Partial<Customer>) => {
    await DB.simulateDelay();
    const items = DB.getItem<Customer[]>('customers', DEFAULT_CUSTOMERS);
    const updated = items.map(i => i.id === id ? { ...i, ...data } : i);
    DB.setItem('customers', updated);
    return updated.find(i => i.id === id);
  },

  addCustomer: async (customer: Omit<Customer, 'id'>) => {
    await DB.simulateDelay();
    const items = DB.getItem<Customer[]>('customers', DEFAULT_CUSTOMERS);
    const newItem = { ...customer, id: `cust_${Date.now()}` };
    DB.setItem('customers', [...items, newItem]);
    return newItem;
  },

  // Session State (Mocking navigation state)
  setSelectedInvestorId: (id: string) => localStorage.setItem('selected_investor_id', id),
  getSelectedInvestorId: () => localStorage.getItem('selected_investor_id'),
  
  setSelectedCustomerId: (id: string) => localStorage.setItem('selected_customer_id', id),
  getSelectedCustomerId: () => localStorage.getItem('selected_customer_id'),
};
