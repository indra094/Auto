import { DB } from './db';
import { api } from './api';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

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

export interface MyRole {
  title: string;
  responsibility: string;
  authority: string[]; // ['hiring', 'product', 'fundraising', 'financial']
  commitment: number; // hrs/week
  startDate: string;
  plannedChange: string; // 'none' | 'reduce' | 'exit' | 'advisory'
  salary: number;
  bonus: string;
  equity: number;
  vesting: string;
  expectations: string[];
  lastUpdated: string;
  status: 'Active' | 'Advisory' | 'Inactive';
}

export const AuthService = {
  getUser: (): User | null => {
    if (!AuthService.isSessionValid()) {
      AuthService.logout();
      return null;
    }
    return DB.getItem<User | null>('user', null);
  },

  getWorkspace: (): Workspace | null => {
    if (!AuthService.isSessionValid()) {
      AuthService.logout();
      return null;
    }
    return DB.getItem<Workspace | null>('workspace', null);
  },

  login: async (email?: string): Promise<User> => {
    // POST /auth/login
    const emailToUse = email || "indra094@gmail.com";
    const user = await api.post('/auth/login', { email: emailToUse });
    DB.setItem('user', user);
    // Initialize a default workspace if none exists
    if (!DB.getItem('workspace', null)) {
      AuthService.updateWorkspace({ name: `Auto`, onboardingStep: 5 });
    }
    AuthService.refreshSession();
    return user;
  },

  signup: async (fullName: string, email: string): Promise<User> => {
    // POST /auth/signup
    const user = await api.post('/auth/signup', { fullName, email });
    DB.setItem('user', user);
    // Initialize a default workspace
    AuthService.updateWorkspace({ name: `${fullName}'s Workspace`, onboardingStep: 1 });
    AuthService.refreshSession();
    return user;
  },

  googleSignup: async (): Promise<User> => {
    // POST /auth/google
    const user = await api.post('/auth/google', {});
    DB.setItem('user', user);
    // Initialize a default workspace
    AuthService.updateWorkspace({ name: `${user.fullName}'s Workspace`, onboardingStep: 1 });
    AuthService.refreshSession();
    return user;
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('workspace');
    localStorage.removeItem('lastActivity');
  },

  refreshSession: () => {
    localStorage.setItem('lastActivity', Date.now().toString());
  },

  isSessionValid: (): boolean => {
    const lastActivity = localStorage.getItem('lastActivity');
    const user = localStorage.getItem('user');
    if (!lastActivity || !user) return false;

    const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10);
    return timeSinceLastActivity < SESSION_TIMEOUT;
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
  },

  getMyRole: (): MyRole => {
    return DB.getItem<MyRole>('myRole', {
      title: 'Co-Founder / CEO',
      responsibility: 'Product & Strategy',
      authority: ['product'],
      commitment: 40,
      startDate: '2026-01-01',
      plannedChange: 'none',
      salary: 0,
      bonus: 'None',
      equity: 12.5,
      vesting: '4 yrs, 1 yr cliff',
      expectations: ['Ship MVP', 'Validate pricing'],
      lastUpdated: new Date().toLocaleDateString(),
      status: 'Active'
    });
  },

  updateMyRole: async (data: Partial<MyRole>) => {
    await DB.simulateDelay();
    const current = AuthService.getMyRole();
    const updated = { ...current, ...data, lastUpdated: new Date().toLocaleDateString() };
    DB.setItem('myRole', updated);
    return updated;
  }
};