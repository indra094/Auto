import { api } from './api';
import { DB } from './db';

export const AnalysisService = {
    fetchIdeaAnalysisFromServer: async (workspaceId: string) => {
        const analysis = await api.get(`/auth/${workspaceId}/idea-analysis`);
        if (analysis) {
            DB.setItem('ideaAnalysis', analysis);
        }
        return analysis;
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
};
