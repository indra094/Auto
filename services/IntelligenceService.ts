import { api } from './api';

export const IntelligenceService = {
  // GET /intelligence/dashboard
  getDashboardStats: async (email: string) => {
    return api.get(`/intelligence/dashboard?email=${email}`);
  },

  // GET /intelligence/connections
  getRelevantConnections: async (email: string) => {
    return api.get(`/intelligence/connections?email=${email}`);
  },

  // POST /intelligence/decision
  logDecision: async (email: string, decision: { type: string; details: string; impact: string }) => {
    return api.post(`/intelligence/decision?email=${email}`, decision);
  }
};
