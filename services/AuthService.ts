
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
  geography?: string;
  type?: string;
  stage?: string;

  problem?: string;
  solution?: string;
  customer?: string;

  onboardingStep?: number;
};

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

let workspaceChangeListeners: ((w: Workspace | null) => void)[] = [];

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

  getWorkspaces: async (): Promise<Workspace[]> => {
    const user = AuthService.getUser();
    if (!user) return [];
    // Handle potential null response if API fails
    const res = await api.get(`/auth/workspaces?email=${user.email}`);
    return res || [];
  },

  setCurrentWorkspace: async (workspace: Workspace): Promise<void> => {
    DB.setItem('workspace', workspace);
    // After switching, we need to sync the role for this specific org
    await AuthService.syncState();
  },

  getMyRole: (): MyRole => {
    const role = DB.getItem<MyRole | null>('myRole', null);
    if (!role) {
      // Return default empty role instead of throwing error to allow app to load
      return {
        title: '',
        responsibility: '',
        authority: [],
        commitment: 0,
        startDate: '',
        plannedChange: 'none',
        salary: 0,
        bonus: '',
        equity: 0,
        vesting: '',
        expectations: [],
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'Active'
      };
    }
    return role;
  },

  syncState: async (): Promise<void> => {
    const user = AuthService.getUser();
    if (!user) return;

    try {
      // Sync Workspace
      const workspaces = await api.get(`/auth/workspaces?email=${user.email}`);
      if (workspaces && workspaces.length > 0) {
        DB.setItem('workspace', workspaces[0]);
      }
      console.log("in sync state", workspaces);

      // Sync MyRole
      const myRole = await api.get(`/auth/myrole?email=${user.email}`);
      if (myRole) DB.setItem('myRole', myRole);
    } catch (e) {
      console.error("Failed to sync state from backend", e);
      // Don't throw here to allow UI to continue with cached data
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
    let user: User | null = null;

    try {
      user = await api.post("/auth/signup", { fullName, email });
    } catch (err: any) {
      onerror?.(err.message);
      throw err;
    }

    if (!user) throw new Error("Signup failed");

    DB.setItem('user', user);
    AuthService.refreshSession();

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

    DB.setItem('workspace', updated); // << IMPORTANT
    return updated;
  },


  setOnboarding: async (workspaceId: string, step: number) => {
    const data = await api.post(`/auth/${workspaceId}/set-onboarding`, { step });

    DB.setItem('workspace', data); // update local workspace
    return data;
  },

  updateMyRole: async (data: Partial<MyRole>) => {
    const user = AuthService.getUser();
    if (!user) return null;

    const updated = await api.patch(`/auth/myrole?email=${user.email}`, data);
    DB.setItem('myRole', updated);
    return updated;
  },

  onWorkspaceChange: (listener: (w: Workspace | null) => void) => {
    workspaceChangeListeners.push(listener);
    return () => {
      workspaceChangeListeners = workspaceChangeListeners.filter(l => l !== listener);
    };
  },

  setWorkspaceAndNotify: (w: Workspace | null) => {
    DB.setItem('workspace', w);
    workspaceChangeListeners.forEach(l => l(w));
  }
};
