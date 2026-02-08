
import { DB } from './db';
import { api } from './api';
import { Financials, User, Workspace, UserOrgInfo } from '../types';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes



let workspaceChangeListeners: ((w: Workspace | null) => void)[] = [];
let userListeners: ((user: User | null) => void)[] = [];

export const AuthService = {
  getCachedUser: (): User | null => {
    if (!AuthService.isSessionValid()) {
      AuthService.logout();
      return null;
    }
    return DB.getItem<User | null>('user', null);
  },

  getCachedWorkspace: (): Workspace | null => {
    return DB.getItem<Workspace | null>('workspace', null);
  },

  fetchWorkspaceFromServer: async (workspaceId: string) => {
    const workspace = await api.get(`/auth/workspace/${workspaceId}`);

    if (workspace) {
      DB.setItem('workspace', workspace);
    }
    return workspace;
  },

  fetchIdeaAnalysisFromServer: async (workspaceId: string) => {
    const analysis = await api.get(`/auth/${workspaceId}/idea-analysis`);
    if (analysis) {
      DB.setItem('ideaAnalysis', analysis);
    }
    return analysis;
  },

  getWorkspaces: async (email: string): Promise<Workspace[]> => {
    // Handle potential null response if API fails
    const res = await api.get(`/auth/workspaces?email=${email}`);
    return res || [];
  },

  setCurrentWorkspace: async (workspace: Workspace): Promise<void> => {
    // 1. Persist change to user profile
    await AuthService.updateUser({ current_org_id: workspace.id });

    // 2. Update local workspace & Notify
    AuthService.setWorkspaceAndNotify(workspace);

    // 3. Sync roles for this new workspace
    await AuthService.syncState();
  },

  createWorkspace: async (email: string): Promise<Workspace> => {
    // After switching, we need to sync the role for this specific org
    const workspace = await api.post(`/auth/workspace`, { email: email });
    if (workspace) {
      DB.setItem('workspace', workspace);
    }
    return workspace;
  },

  getUsersForOrg: async (orgId: string): Promise<User[]> => {
    const users = await api.get(`/auth/${orgId}/users`);
    return users || [];
  },


  getUserOrgInfo: async (userId: string, orgId: string) => {
    return await (api.get(`/auth/user-org-info?user_id=${userId}&org_id=${orgId}`));
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
        DB.setItem('workspace', activeWorkspace);
      }

      console.log("in sync state", activeWorkspace);

      // 2. Sync Role from user-org-info (instead of UserOrgInfo)
      if (user) {
        const orgInfo = await api.get(
          `/auth/user-org-info?user_id=${user.id}&org_id=${user.current_org_id}`
        );

        if (orgInfo?.role) {
          DB.setItem('UserOrgInfo', orgInfo.role);
        }
      }

    } catch (e) {
      console.error("Failed to sync state from backend", e);
      // Don't throw here to allow UI to continue with cached data
    }
  },

  createOrUpdateFounderAlignment: (orgId: string) => {
    return api.post(`/auth/${orgId}/founder-alignment`, {});
  },

  createOrUpdateAnalysis: (orgId: string) => {
    return api.post(`/auth/${orgId}/idea-analysis`, {});
  },

  createOrUpdateInvestorReadiness: (orgId: string) => {
    return api.post(`/auth/${orgId}/investor-readiness`, {});
  },

  getInvestorReadiness: (orgId: string) => {
    return api.get(`/auth/${orgId}/investor-readiness`);
  },

  getFounderAlignment: (orgId: string) => {
    return api.get(`/auth/${orgId}/founder-alignment`);
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

  updateUserForOrg: async (
    userId: string,
    orgID: string,
    role: string,
    permission_level: string,
    equity: number,
    vesting: string,
    commitment: number,
    status?: string,
    salary?: number,
    bonus?: number
  ): Promise<User> => {
    return await api.post('/auth/set-user-org-info', {
      user_id: userId,
      org_id: orgID,
      role,
      permission_level,
      equity,
      vesting,
      commitment,
      ...(status !== undefined ? { status } : {}),
      ...(salary !== undefined ? { salary } : {}),
      ...(bonus !== undefined ? { bonus } : {}),
    });

  },


  createUserForOrg: async (fullName: string, email: string, orgID: string, status: string, role: string, permission_level: string, equity: number, vesting: string, commitment: number, salary: number, bonus: number): Promise<User> => {
    let user;

    try {
      user = await api.post('/auth/user', { fullName, email, org_id: orgID, status: status, role: role, permission_level: permission_level, equity: equity, vesting: vesting, commitment: commitment, salary: salary, bonus: bonus });
    } catch (err: any) {
      console.log("err:", err);
      const detail = err?.message || "";

      if (detail === "Email already registered") {
        // If email already exists, continue with the next call
        // fetch the existing user (you need an endpoint for this, or you can keep the returned id)
        user = await api.get(`/auth/user-by-email/${email}`);
      } else {
        console.log("in here again", err)
        throw err;
      }
    }

    return await api.post('/auth/set-user-org-info', {
      user_id: user.id,
      org_id: orgID,
      role,
      permission_level,
      equity,
      vesting,
      commitment,
      ...(status !== undefined ? { status } : {}),
      ...(salary !== undefined ? { salary } : {}),
      ...(bonus !== undefined ? { bonus } : {}),
    });
  },

  signup: async (fullName: string, email: string, password: string): Promise<User> => {
    let user: User | null = null;
    let userOrgInfo: UserOrgInfo | null = null;
    try {
      user = await api.post("/auth/signup", { fullName, email, password, status: "Active" });
      if (!user) throw new Error("Signup failed");

      const ws = await api.post("/auth/workspace", { email });
      await AuthService.setCurrentWorkspace(ws);

      userOrgInfo = await AuthService.getUserOrgInfo(user.id, ws.id);
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

  updateWorkspace: async (data: Partial<Workspace>) => {
    const user = AuthService.getCachedUser();
    if (!user) return null;

    const updated = await api.patch(`/auth/${user.current_org_id}/workspace`, data);

    // Notify listeners so UI updates immediately
    AuthService.setWorkspaceAndNotify(updated);

    return updated;
  },


  setOnboarding: async (workspaceId: string, step: number) => {
    const data = await api.post(`/auth/${workspaceId}/set-onboarding`, { step });
    console.log("[AuthService] Set onboarding step:", step);
    // Notify listeners so UI updates immediately
    AuthService.setWorkspaceAndNotify(data);

    return data;
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

  setUserOrgInfo: async (userId: string, orgId: string, permission_level: string, equity: number, vesting: string, commitment: number) => {
    return await api.post('/auth/set-user-org-info', {
      user_id: userId,
      org_id: orgId,
      permission_level: permission_level,
      equity: equity,
      vesting: vesting,
      commitment: commitment,
      status: "Active",
    });
  },



  getFinancials: async (orgId: string): Promise<Financials | null> => {
    return await api.get(`/auth/${orgId}/financials`);
  },

  updateFinancials: async (orgId: string, data: Financials): Promise<Financials> => {
    return await api.put(`/auth/${orgId}/financials`, data);
  },

  onWorkspaceChange: (listener: (w: Workspace | null) => void) => {
    workspaceChangeListeners.push(listener);
    return () => {
      workspaceChangeListeners = workspaceChangeListeners.filter(l => l !== listener);
    };
  },

  getDashboard: async (orgId: string): Promise<Dashboard | null> => {
    return await api.get(`/auth/${orgId}/dashboard`);
  },

  updateDashboard: async (orgId: string): Promise<Dashboard> => {
    return await api.post(`/auth/${orgId}/dashboard`, {});
  },

  setWorkspaceAndNotify: (w: Workspace | null) => {
    DB.setItem('workspace', w);
    console.log("🔥 Workspace set", w);
    workspaceChangeListeners.forEach(l => l(w));
  }
};
