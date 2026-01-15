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
  getEmployees: async (email: string): Promise<Employee[]> => {
    return api.get(`/team/employees?email=${email}`);
  },

  // POST /team/employees
  addEmployee: async (email: string, employee: Omit<Employee, 'id'>) => {
    return api.post(`/team/employees?email=${email}`, employee);
  },

  // GET /team/ai-history/{ai_id}
  getAIHistory: async (aiId: string) => {
    return api.get(`/team/ai-history/${aiId}`);
  },

  // POST /team/invite
  inviteExecutive: async (email: string, executive: { name: string; email: string; role: string }) => {
    return api.post(`/team/invite?email=${email}`, executive);
  }
};
