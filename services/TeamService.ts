import { api } from './api';

export interface Employee {
  id: string;
  name: string;
  type: 'Human' | 'AI';
  role: string;
  status: 'Active' | 'Paused' | 'Inactive';
}

export const TeamService = {
  // GET /team/employees
  getEmployees: async (): Promise<Employee[]> => {
    return api.get('/team/employees');
  },

  // POST /team/employees
  addEmployee: async (employee: Omit<Employee, 'id'>) => {
    return api.post('/team/employees', employee);
  },

  // GET /team/ai-history/{ai_id}
  getAIHistory: async (aiId: string) => {
    return api.get(`/team/ai-history/${aiId}`);
  }
};
