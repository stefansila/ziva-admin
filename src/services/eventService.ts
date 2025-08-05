const API_BASE_URL = 'https://ziva-health.netlify.app';

export interface Event {
    id: number;
    profileId: number;
    date: string;
    createdAt: string;
    updatedAt: string | null;
}

export interface EventsResponse {
    data: Event[];
    total: number;
    offset: number;
    limit: number;
    totalPages: number;
}

export const eventService = {
    async getEvents(params?: {
        profileId?: number;
        limit?: number;
        offset?: number;
        startDate?: string;
        endDate?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
    }): Promise<EventsResponse> {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            throw new Error('No access token found');
        }

        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const url = `${API_BASE_URL}/api/v1/event/events${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        return response.json();
    },

    async getEventsByProfileId(profileId: number): Promise<Event[]> {
        const response = await this.getEvents({ profileId, limit: 100 });
        return response.data;
    },

    async checkUserHasEvents(profileId: number): Promise<boolean> {
        try {
            const response = await this.getEvents({ profileId, limit: 1 });
            return response.total > 0;
        } catch {
            return false;
        }
    }
};