const API_BASE_URL = 'https://ziva-health.netlify.app';

export const authService = {
    async getCurrentProfile() {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
            throw new Error('No access token found');
        }

        const response = await fetch(`${API_BASE_URL}/api/v1/profile/current-profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token might be expired, try to refresh
                // For now, just throw error
                throw new Error('Unauthorized');
            }
            throw new Error('Failed to fetch profile');
        }

        return response.json();
    },

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    }
};