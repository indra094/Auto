import { api } from './api';
import { Dashboard } from '../types';

export const DashboardService = {
    getDashboard: async (orgId: string): Promise<{ size: number; dashboard: Dashboard } | null> => {
        return await api.get(`/auth/${orgId}/dashboard`);
    },

    updateDashboard: async (orgId: string): Promise<any> => {
        return await api.post(`/auth/${orgId}/dashboard`, {});
    },
};
