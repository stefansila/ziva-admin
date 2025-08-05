import React, { useState, useEffect } from 'react';
import { eventService, Event } from '../../services/eventService';
import { useNotification } from '../../contexts/NotificationContext';

interface ProfileEventsTabProps {
    userId: number;
}

const ProfileEventsTab: React.FC<ProfileEventsTabProps> = ({ userId }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { showNotification } = useNotification();

    useEffect(() => {
        fetchUserEvents();
    }, [userId]);

    const fetchUserEvents = async () => {
        try {
            setIsLoading(true);
            const userEvents = await eventService.getEventsByProfileId(userId);
            setEvents(userEvents);
        } catch (error) {
            showNotification('error', 'Failed to load events', error instanceof Error ? error.message : 'Please try again');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="profile-events-tab">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <div className="loading-spinner"></div>
                    <p style={{ marginTop: '16px', color: 'rgba(5, 44, 88, 0.6)' }}>Loading events...</p>
                </div>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="profile-events-tab">
                <p className="tab-placeholder">No events found for this user</p>
            </div>
        );
    }

    return (
        <div className="profile-events-tab">
            <div className="events-summary-card">
                <h4>Total Events: {events.length}</h4>
            </div>
            <div className="profile-events-list">
                <table className="profile-events-table">
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Event Date</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td>#{event.id}</td>
                                <td>{formatDate(event.date)}</td>
                                <td>{formatDate(event.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfileEventsTab;