import { api } from './api';

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

export const ExternalService = {
  // Investors
  // GET /investors/
  getInvestors: async (): Promise<Investor[]> => {
    return api.get('/investors/');
  },

  // GET /investors/{id}
  getInvestorById: async (id: string): Promise<Investor | undefined> => {
    return api.get(`/investors/${id}`);
  },

  // PUT /investors/{id}
  updateInvestor: async (id: string, data: Partial<Investor>) => {
    return api.put(`/investors/${id}`, data);
  },

  // POST /investors/
  addInvestor: async (investor: Omit<Investor, 'id'>) => {
    return api.post('/investors/', investor);
  },

  // Customers
  // GET /customers/
  getCustomers: async (): Promise<Customer[]> => {
    return api.get('/customers/');
  },

  // GET /customers/{id}
  getCustomerById: async (id: string): Promise<Customer | undefined> => {
    return api.get(`/customers/${id}`);
  },

  // PUT /customers/{id}
  updateCustomer: async (id: string, data: Partial<Customer>) => {
    return api.put(`/customers/${id}`, data);
  },

  // POST /customers/
  addCustomer: async (customer: Omit<Customer, 'id'>) => {
    return api.post('/customers/', customer);
  },

  // Session State (Mocking navigation state)
  setSelectedInvestorId: (id: string) => localStorage.setItem('selected_investor_id', id),
  getSelectedInvestorId: () => localStorage.getItem('selected_investor_id'),

  setSelectedCustomerId: (id: string) => localStorage.setItem('selected_customer_id', id),
  getSelectedCustomerId: () => localStorage.getItem('selected_customer_id'),
};
