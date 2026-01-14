import { api } from './api';

export const IntelligenceService = {
  // GET /intelligence/dashboard
  getDashboardStats: async () => {
    return api.get('/intelligence/dashboard');
  },

  // GET /intelligence/connections
  getRelevantConnections: async () => {
    return api.get('/intelligence/connections');
  }
};
