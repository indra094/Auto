import { DB } from './db';
import { api } from './api';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  industry?: string;
  type?: string;
  stage?: string;
  onboardingStep: number;
}

export const AuthService = {
  getUser: (): User | null => {
    return DB.getItem<User | null>('user', null);
  },

  getWorkspace: (): Workspace | null => {
    return DB.getItem<Workspace | null>('workspace', null);
  },

  login: async (email: string): Promise<User> => {
    return api.post('/auth/login', { email });
  },

  signup: async (fullName: string, email: string): Promise<User> => {
    return api.post('/auth/signup', { fullName, email });
  },

  googleSignup: async (): Promise<User> => {
    return api.post('/auth/google', {});
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('workspace');
  },

  updateUser: async (data: Partial<User>) => {
    await DB.simulateDelay();
    const current = DB.getItem<User>('user', { id: 'u_1', fullName: '', email: '' });
    const updated = { ...current, ...data };
    DB.setItem('user', updated);
    return updated;
  },

  updateWorkspace: async (data: Partial<Workspace>) => {
    await DB.simulateDelay();
    const current = DB.getItem<Workspace>('workspace', { id: 'w_0', name: '', onboardingStep: 1 });
    const updated = { ...current, ...data };
    DB.setItem('workspace', updated);
    return updated;
  }
};