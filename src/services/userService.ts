import { eventService } from './eventService';


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
    dateOfBirth: string | null;
    gender: string | null;
}

export interface HealthProfile {
    id: number;
    profileId: number;
    frequency: string;
    riskGroup: 'high' | 'control' | 'average' | 'moderate' | null;
    createdAt: string;
    updatedAt: string;
}

export interface CombinedUserProfile extends UserProfile {
    healthProfile?: HealthProfile;
    hasEvents?: boolean;
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
    },

    async getAllHealthProfiles(): Promise<HealthProfile[]> {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/health-profile/health-profiles`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch health profiles');
        }

        return response.json();
    },

    async getCombinedUserProfiles(): Promise<CombinedUserProfile[]> {
        try {
            const [users, healthProfiles] = await Promise.all([
                this.getAllUsers(),
                this.getAllHealthProfiles()
            ]);

            // Create a map of health profiles by profileId
            const healthProfileMap = new Map<number, HealthProfile>();
            healthProfiles.forEach(hp => {
                healthProfileMap.set(hp.profileId, hp);
            });

            // Check events for each user in parallel
            const usersWithEvents = await Promise.all(
                users.map(async (user) => {
                    const hasEvents = await eventService.checkUserHasEvents(user.id);
                    return {
                        ...user,
                        healthProfile: healthProfileMap.get(user.id),
                        hasEvents
                    };
                })
            );

            return usersWithEvents;
        } catch (error) {
            throw error;
        }
    },

    async getHealthProfilesByRiskGroup(riskGroup: 'high' | 'control' | 'average' | 'moderate'): Promise<HealthProfile[]> {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/health-profile/health-profiles?riskGroup=${riskGroup}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch health profiles by risk group');
        }

        return response.json();
    }
};