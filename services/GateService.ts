import { api } from './api';

export const GateService = {
  // GET /gates/incorporation
  getIncorporationReadiness: async () => {
    return api.get('/gates/incorporation');
  },

  // GET /gates/notifications
  getNotifications: async () => {
    return api.get('/gates/notifications');
  }
};
