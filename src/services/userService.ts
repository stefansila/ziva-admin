const API_BASE_URL = 'https://ziva-health.netlify.app';

export interface UserProfile {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    password: string;
    phoneNumber: string | null;
    avatarUrl: string | null;
    isActive: boolean;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
}

export const userService = {
    async getAllUsers(): Promise<UserProfile[]> {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/profile/profiles`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            throw new Error('Failed to fetch users');
        }

        return response.json();
    }
};