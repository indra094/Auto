import { api } from './api';
import { Financials } from '../types';

export const FinancialService = {
    getFinancials: async (orgId: string): Promise<Financials | null> => {
        return await api.get(`/auth/${orgId}/financials`);
    },

    updateFinancials: async (orgId: string, data: Financials): Promise<Financials> => {
        return await api.put(`/auth/${orgId}/financials`, data);
    },
};
