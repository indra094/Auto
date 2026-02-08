import { api } from './api';
import { DB } from './db';
import { Workspace } from '../types';

let workspaceChangeListeners: ((w: Workspace | null) => void)[] = [];

export const WorkspaceService = {
    getWorkspaces: async (email: string): Promise<Workspace[]> => {
        // Handle potential null response if API fails
        const res = await api.get(`/api/v1/workspaces?email=${email}`);
        return res || [];
    },

    fetchWorkspaceFromServer: async (workspaceId: string) => {
        const workspace = await api.get(`/api/v1/workspace/${workspaceId}`);

        if (workspace) {
            DB.setItem('workspace', workspace);
        }
        return workspace;
    },

    getCachedWorkspace: (): Workspace | null => {
        return DB.getItem<Workspace | null>('workspace', null);
    },

    createWorkspace: async (email: string): Promise<Workspace> => {
        // After switching, we need to sync the role for this specific org
        const workspace = await api.post(`/api/v1/workspace`, { email: email });
        if (workspace) {
            DB.setItem('workspace', workspace);
        }
        return workspace;
    },

    updateWorkspace: async (orgId: string, data: Partial<Workspace>) => {
        const updated = await api.patch(`/api/v1/${orgId}/workspace`, data);

        // Notify listeners so UI updates immediately
        WorkspaceService.setWorkspaceAndNotify(updated);

        return updated;
    },

    setOnboarding: async (workspaceId: string, step: number) => {
        const data = await api.post(`/api/v1/${workspaceId}/set-onboarding`, { step });
        console.log("[WorkspaceService] Set onboarding step:", step);
        // Notify listeners so UI updates immediately
        WorkspaceService.setWorkspaceAndNotify(data);

        return data;
    },

    onWorkspaceChange: (listener: (w: Workspace | null) => void) => {
        workspaceChangeListeners.push(listener);
        return () => {
            workspaceChangeListeners = workspaceChangeListeners.filter(l => l !== listener);
        };
    },

    setWorkspaceAndNotify: (w: Workspace | null) => {
        DB.setItem('workspace', w);
        console.log("🔥 Workspace set", w);
        workspaceChangeListeners.forEach(l => l(w));
    }
};
