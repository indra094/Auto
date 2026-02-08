import { api } from './api';
import { Dashboard } from '../types';

export const DashboardService = {
    getDashboard: async (orgId: string): Promise<{ size: number; dashboard: Dashboard } | null> => {
        return await api.get(`/api/v1/${orgId}/dashboard`);
    },

    updateDashboard: async (orgId: string): Promise<any> => {
        return await api.post(`/api/v1/${orgId}/dashboard`, {});
    },
};
