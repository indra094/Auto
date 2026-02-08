import { api } from './api';
import { DB } from './db';

export const AnalysisService = {
    fetchIdeaAnalysisFromServer: async (workspaceId: string) => {
        const analysis = await api.get(`/api/v1/${workspaceId}/idea-analysis`);
        if (analysis) {
            DB.setItem('ideaAnalysis', analysis);
        }
        return analysis;
    },

    createOrUpdateFounderAlignment: (orgId: string) => {
        return api.post(`/api/v1/${orgId}/founder-alignment`, {});
    },

    createOrUpdateAnalysis: (orgId: string) => {
        return api.post(`/api/v1/${orgId}/idea-analysis`, {});
    },

    createOrUpdateInvestorReadiness: (orgId: string) => {
        return api.post(`/api/v1/${orgId}/investor-readiness`, {});
    },

    getInvestorReadiness: (orgId: string) => {
        return api.get(`/api/v1/${orgId}/investor-readiness`);
    },

    getFounderAlignment: (orgId: string) => {
        return api.get(`/api/v1/${orgId}/founder-alignment`);
    },
};
