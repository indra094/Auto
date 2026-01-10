import { DB } from './db';

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
    await DB.simulateDelay();
    // Simulate fetching existing user or erroring if not found (mock logic: always succeeds for demo)
    const user = { 
      id: 'u_1', 
      fullName: 'Jane Founder', 
      email, 
      role: 'CEO',
      avatarUrl: undefined 
    };
    
    // Simulate fetching associated workspace
    const workspace = {
      id: 'w_1',
      name: 'Acme Corp',
      industry: 'SaaS',
      type: 'SaaS',
      stage: 'Pre-seed',
      onboardingStep: 6
    };

    DB.setItem('user', user);
    DB.setItem('workspace', workspace);
    return user;
  },

  signup: async (fullName: string, email: string): Promise<User> => {
    await DB.simulateDelay();
    const user = { 
      id: `u_${Date.now()}`, 
      fullName, 
      email, 
      role: 'Founder' // Default role until specified
    };
    
    // Initialize empty workspace for new user
    const workspace: Workspace = {
      id: `w_${Date.now()}`,
      name: '',
      onboardingStep: 1
    };

    DB.setItem('user', user);
    DB.setItem('workspace', workspace);
    return user;
  },

  googleSignup: async (): Promise<User> => {
    await DB.simulateDelay();
    const user = {
      id: `u_g_${Date.now()}`,
      fullName: 'Alex Google',
      email: 'alex@gmail.com',
      role: 'Founder',
      avatarUrl: '' 
    };
    
    const workspace: Workspace = {
      id: `w_${Date.now()}`,
      name: '',
      onboardingStep: 1
    };

    DB.setItem('user', user);
    DB.setItem('workspace', workspace);
    return user;
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
