import { DB } from './db';

export interface Employee {
  id: string;
  name: string;
  type: 'Human' | 'AI';
  role: string;
  status: 'Active' | 'Paused' | 'Inactive';
}

const DEFAULT_EMPLOYEES: Employee[] = [
  { id: 'e_1', name: 'Sarah', type: 'AI', role: 'Market Research', status: 'Active' },
  { id: 'e_2', name: 'Devin', type: 'AI', role: 'QA', status: 'Paused' }
];

export const TeamService = {
  getEmployees: async (): Promise<Employee[]> => {
    await DB.simulateDelay();
    return DB.getItem<Employee[]>('employees', DEFAULT_EMPLOYEES);
  },

  addEmployee: async (employee: Omit<Employee, 'id'>) => {
    await DB.simulateDelay();
    const items = DB.getItem<Employee[]>('employees', DEFAULT_EMPLOYEES);
    const newItem = { ...employee, id: `e_${Date.now()}` };
    DB.setItem('employees', [...items, newItem]);
    return newItem;
  },

  getAIHistory: async (aiId: string) => {
    await DB.simulateDelay();
    return [
      { id: 1, activity: 'Drafted email', time: '2h ago' },
      { id: 2, activity: 'Analyzed transcript', time: '4h ago' }
    ];
  }
};
