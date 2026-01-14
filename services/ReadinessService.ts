import { api } from './api';

export interface ReadinessGate {
    score: number;
    issues: string[];
}

export interface Notification {
    id: string;
    type: string;
    content: string;
    timestamp: string;
}

export const ReadinessService = {
    // GET /gates/incorporation
    getIncorporationReadiness: async (email: string): Promise<ReadinessGate> => {
        return api.get(`/gates/incorporation?email=${email}`);
    },

    // GET /gates/notifications
    getNotifications: async (email: string): Promise<Notification[]> => {
        return api.get(`/gates/notifications?email=${email}`);
    }
};
