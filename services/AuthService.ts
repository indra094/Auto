import { DB } from './db';
import { api } from './api';
import { User, Workspace, UserOrgInfo } from '../types';
import { WorkspaceService } from './WorkspaceService';
import { TeamService } from './TeamService';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

let userListeners: ((user: User | null) => void)[] = [];

export const AuthService = {
  getCachedUser: (): User | null => {
    if (!AuthService.isSessionValid()) {
      AuthService.logout();
      return null;
    }
    return DB.getItem<User | null>('user', null);
  },

  setCurrentWorkspace: async (workspace: Workspace): Promise<void> => {
    // 1. Persist change to user profile
    await AuthService.updateUser({ current_org_id: workspace.id });

    // 2. Update local workspace & Notify
    WorkspaceService.setWorkspaceAndNotify(workspace);

    // 3. Sync roles for this new workspace
    await AuthService.syncState();
  },

  syncState: async (): Promise<void> => {
    const user = AuthService.getCachedUser();
    if (!user) return;

    try {
      // 1. Sync Workspaces
      const workspaces = await api.get(`/auth/workspaces?email=${user.email}`);

      let activeWorkspace: Workspace | null = null;

      if (user.current_org_id) {
        activeWorkspace =
          workspaces.find((w: Workspace) => w.id === user.current_org_id) || null;
      }

      if (activeWorkspace) {
        WorkspaceService.setWorkspaceAndNotify(activeWorkspace);
      }

      console.log("in sync state", activeWorkspace);

      // 2. Sync Role from user-org-info (instead of UserOrgInfo)
      if (user) {
        // Use TeamService to fetch user org info
        const orgInfo = await TeamService.getUserOrgInfo(user.id, user.current_org_id);

        if (orgInfo?.role) {
          DB.setItem('UserOrgInfo', orgInfo.role);
        }
      }

    } catch (e) {
      console.error("Failed to sync state from backend", e);
      // Don't throw here to allow UI to continue with cached data
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    const user = await api.post('/auth/login', { email, password });
    console.log("in login", user)
    DB.setItem('user', user);
    AuthService.refreshSession();

    // Fetch initial state
    await AuthService.syncState();

    return user;
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    if (!AuthService.isSessionValid()) {
      AuthService.logout();
      return null;
    }
    const user = await api.get(`/auth/user-by-email/${email}`);
    DB.setItem('user', user);
    return user;
  },

  signup: async (fullName: string, email: string, password: string): Promise<User> => {
    let user: User | null = null;
    let userOrgInfo: UserOrgInfo | null = null;
    try {
      user = await api.post("/auth/signup", { fullName, email, password, status: "Active" });
      if (!user) throw new Error("Signup failed");

      // Use WorkspaceService just for creation, but we need to set it as current
      const ws = await api.post("/auth/workspace", { email });
      await AuthService.setCurrentWorkspace(ws);

      // Use TeamService for updated info
      userOrgInfo = await TeamService.getUserOrgInfo(user.id, ws.id);
      user.permission_level = userOrgInfo.permission_level;
      user.role = userOrgInfo.role;
      user.equity = userOrgInfo.equity;
      user.vesting = userOrgInfo.vesting;
      user.commitment = userOrgInfo.commitment;
      user.status = userOrgInfo.status;
      user.current_org_id = ws.id;

    } catch (err: any) {
      onerror?.(err.message);
      throw err;
    }

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
    localStorage.removeItem('UserOrgInfo');
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


  async updateUser(data: Partial<User>) {
    const current = AuthService.getCachedUser();
    if (!current) return null;

    const updatedUser = await api.patch(`/auth/user?email=${current.email}`, data);

    // 🔥 update local cache
    DB.setItem('user', updatedUser);

    // 🔔 notify listeners
    AuthService.notifyUserChange(updatedUser);

    return updatedUser;
  },

  onUserChange(cb: (user: User | null) => void) {
    userListeners.push(cb);
    return () => {
      userListeners = userListeners.filter(l => l !== cb);
    };
  },

  notifyUserChange(user: User | null) {
    userListeners.forEach(cb => cb(user));
  },
};
