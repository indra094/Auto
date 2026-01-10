import { DB } from './db';

export const GateService = {
  getIncorporationReadiness: async () => {
    await DB.simulateDelay();
    return {
      score: 63,
      issues: ['No signed agreement', 'Zero customer validation']
    };
  },

  getNotifications: async () => {
    await DB.simulateDelay();
    return [
      { id: 1, title: 'Alignment Score Dropped', type: 'Warning' }
    ];
  }
};
