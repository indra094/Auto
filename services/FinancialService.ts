import { api } from './api';
import { Financials } from '../types';

export const FinancialService = {
    getFinancials: async (orgId: string): Promise<Financials | null> => {
        return await api.get(`/api/v1/${orgId}/financials`);
    },

    updateFinancials: async (orgId: string, data: Financials): Promise<Financials> => {
        console.log("DATA", data);
        return await api.put(`/api/v1/${orgId}/financials`, data);
    },
};
