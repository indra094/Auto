import { api } from './api';
import { User, UserOrgInfo } from '../types';

export const TeamService = {
    getUsersForOrg: async (orgId: string): Promise<User[]> => {
        const users = await api.get(`/auth/${orgId}/users`);
        return users || [];
    },

    getUserOrgInfo: async (userId: string, orgId: string) => {
        return await (api.get(`/auth/user-org-info?user_id=${userId}&org_id=${orgId}`));
    },

    updateUserForOrg: async (
        userId: string,
        orgID: string,
        role: string,
        permission_level: string,
        equity: number,
        vesting: string,
        commitment: number,
        status?: string,
        salary?: number,
        bonus?: number
    ): Promise<User> => {
        return await api.post('/auth/set-user-org-info', {
            user_id: userId,
            org_id: orgID,
            role,
            permission_level,
            equity,
            vesting,
            commitment,
            ...(status !== undefined ? { status } : {}),
            ...(salary !== undefined ? { salary } : {}),
            ...(bonus !== undefined ? { bonus } : {}),
        });
    },

    createUserForOrg: async (fullName: string, email: string, orgID: string, status: string, role: string, permission_level: string, equity: number, vesting: string, commitment: number, salary: number, bonus: number): Promise<User> => {
        let user;

        try {
            user = await api.post('/auth/user', { fullName, email, org_id: orgID, status: status, role: role, permission_level: permission_level, equity: equity, vesting: vesting, commitment: commitment, salary: salary, bonus: bonus });
        } catch (err: any) {
            console.log("err:", err);
            const detail = err?.message || "";

            if (detail === "Email already registered") {
                // If email already exists, continue with the next call
                // fetch the existing user (you need an endpoint for this, or you can keep the returned id)
                user = await api.get(`/auth/user-by-email/${email}`);
            } else {
                console.log("in here again", err)
                throw err;
            }
        }

        return await api.post('/auth/set-user-org-info', {
            user_id: user.id,
            org_id: orgID,
            role,
            permission_level,
            equity,
            vesting,
            commitment,
            ...(user.status !== undefined ? { status: user.status } : {}),
            ...(salary !== undefined ? { salary } : {}),
            ...(bonus !== undefined ? { bonus } : {}),
        });
    },

    setUserOrgInfo: async (userId: string, orgId: string, permission_level: string, equity: number, vesting: string, commitment: number) => {
        return await api.post('/auth/set-user-org-info', {
            user_id: userId,
            org_id: orgId,
            permission_level: permission_level,
            equity: equity,
            vesting: vesting,
            commitment: commitment,
            status: "Active",
        });
    },
};
