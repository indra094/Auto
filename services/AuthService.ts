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
      return null;
    }
    return DB.getItem<Workspace | null>('workspace', null);
  },

  getMyRole: (): MyRole => {
    const role = DB.getItem<MyRole | null>('myRole', null);
    if (!role) {
      throw new Error("MyRole state missing - all information must be in DB");
    }
    return role;
  },

  syncState: async (): Promise<void> => {
    const user = AuthService.getUser();
    if (!user) return;

    try {
      // Sync Workspace
      const workspace = await api.get(`/auth/workspace?email=${user.email}`);
      DB.setItem('workspace', workspace);

      // Sync MyRole
      const myRole = await api.get(`/auth/myrole?email=${user.email}`);
      DB.setItem('myRole', myRole);
    } catch (e) {
      console.error("Failed to sync state from backend", e);
      throw e; // Throw instead of falling back
    }
  },

  login: async (email: string): Promise<User> => {
    const user = await api.post('/auth/login', { email });
    DB.setItem('user', user);
    AuthService.refreshSession();

    // Fetch initial state
    await AuthService.syncState();

    return user;
  },

  signup: async (fullName: string, email: string): Promise<User> => {
    const user = await api.post('/auth/signup', { fullName, email });
    DB.setItem('user', user);
    AuthService.refreshSession();

    // Fetch initial state
    await AuthService.syncState();

    return user;
  },

  googleSignup: async (email: string): Promise<User> => {
    const user = await api.post(`/auth/google?email=${email}`, {});
    DB.setItem('user', user);
    AuthService.refreshSession();

    // Fetch initial state
    await AuthService.syncState();

    return user;
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('workspace');
    localStorage.removeItem('myRole');
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
    const current = AuthService.getUser();
    if (!current) return null;

    const updated = await api.patch(`/auth/user?email=${current.email}`, data);
    DB.setItem('user', updated);
    return updated;
  },

  updateWorkspace: async (data: Partial<Workspace>) => {
    const user = AuthService.getUser();
    if (!user) return null;

    const updated = await api.patch(`/auth/workspace?email=${user.email}`, data);
    DB.setItem('workspace', updated);
    return updated;
  },

  updateMyRole: async (data: Partial<MyRole>) => {
    const user = AuthService.getUser();
    if (!user) return null;

    const updated = await api.patch(`/auth/myrole?email=${user.email}`, data);
    DB.setItem('myRole', updated);
    return updated;
  }
};