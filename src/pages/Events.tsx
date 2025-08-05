import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { eventService, Event, EventsResponse } from '../services/eventService';
import { useNotification } from '../contexts/NotificationContext';
import UserProfileModal from '../components/UserProfileModal';

interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [userInfoMap, setUserInfoMap] = useState<Map<number, UserInfo>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEvents, setTotalEvents] = useState(0);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { showNotification } = useNotification();
    const eventsPerPage = 10;

    useEffect(() => {
        fetchEvents();
    }, [currentPage]);

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const offset = (currentPage - 1) * eventsPerPage;
            const response = await eventService.getEvents({
                limit: eventsPerPage,
                offset: offset,
                search: searchTerm || undefined
            });
            
            setEvents(response.data);
            setTotalPages(response.totalPages);
            setTotalEvents(response.total);
            
            // Fetch user info for each unique profile ID
            await fetchUserInfo(response.data);
        } catch (error) {
            showNotification('error', 'Failed to load events', error instanceof Error ? error.message : 'Please try again');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserInfo = async (events: Event[]) => {
        const uniqueProfileIds = Array.from(new Set(events.map(event => event.profileId)));
        const newUserInfoMap = new Map<number, UserInfo>();
        
        const token = localStorage.getItem('accessToken');
        
        await Promise.all(
            uniqueProfileIds.map(async (profileId) => {
                try {
                    const response = await fetch(`https://ziva-health.netlify.app/api/v1/profile/profiles/${profileId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (response.ok) {
                        const userData = await response.json();
                        newUserInfoMap.set(profileId, {
                            id: userData.id,
                            firstName: userData.firstName || '',
                            lastName: userData.lastName || '',
                            email: userData.email
                        });
                    }
                } catch (error) {
                    console.error(`Failed to fetch user info for profile ${profileId}:`, error);
                }
            })
        );
        
        setUserInfoMap(newUserInfoMap);
    };

    const getUserDisplayName = (profileId: number): string => {
        const userInfo = userInfoMap.get(profileId);
        if (!userInfo) return `Profile ${profileId}`;
        
        if (userInfo.firstName && userInfo.lastName) {
            return `${userInfo.firstName} ${userInfo.lastName}`;
        }
        if (userInfo.firstName) return userInfo.firstName;
        if (userInfo.lastName) return userInfo.lastName;
        return userInfo.email.split('@')[0];
    };

    const handleProfileClick = (profileId: number, e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedUserId(profileId);
        setShowProfileModal(true);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchEvents();
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Sidebar />
            <div className="content">
                <div className="top-right">
                    <div className="dh-embed">
                        <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.3" clipPath="url(#clip0_864_301)">
                                <path d="M17.706 13.7598L15.606 6.18475C15.184 4.66096 14.2643 3.32221 12.9933 2.38173C11.7222 1.44125 10.173 0.95314 8.59247 0.995152C7.01189 1.03716 5.49082 1.60688 4.27156 2.61355C3.05229 3.62022 2.20495 5.00595 1.86451 6.55L0.240762 13.855C0.179888 14.1291 0.181353 14.4134 0.245049 14.6868C0.308746 14.9603 0.433046 15.216 0.608775 15.435C0.784504 15.654 1.00717 15.8307 1.26035 15.9521C1.51352 16.0735 1.79073 16.1366 2.07151 16.1365H5.17876C5.41744 16.9619 5.91784 17.6874 6.60461 18.2037C7.29137 18.72 8.12731 18.9992 8.98651 18.9992C9.84571 18.9992 10.6817 18.72 11.3684 18.2037C12.0552 17.6874 12.5556 16.9619 12.7943 16.1365H15.9C16.1891 16.1365 16.4742 16.0697 16.7332 15.9413C16.9921 15.8129 17.2179 15.6263 17.3928 15.3962C17.5677 15.1661 17.6871 14.8986 17.7416 14.6148C17.796 14.3309 17.7834 14.0383 17.706 13.7598ZM2.53876 13.8865L4.06126 7.03375C4.29445 5.9808 4.87317 5.03612 5.7053 4.35009C6.53742 3.66406 7.57512 3.2761 8.65322 3.24799C9.73131 3.21987 10.7878 3.55321 11.6546 4.19493C12.5213 4.83666 13.1485 5.74989 13.4363 6.78925L15.4073 13.8865H2.53876Z" fill="#052C58" />
                            </g>
                            <circle cx={16} cy={4} r={4} fill="#6D64D3" />
                            <defs>
                                <clipPath id="clip0_864_301">
                                    <rect width={18} height={18} fill="white" transform="translate(0 1)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div id="hamburger-trigger" className="hamburger-trigger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="gap-40">
                    <div className="gap-24">
                        <section className="animate-entrance animate-entrance-delay-1">
                            <div className="gap-10">
                                <h1 className="h1-48">Events</h1>
                                <p className="text-op-60">Track and monitor all user events</p>
                            </div>
                        </section>
                        
                        <section className="animate-entrance animate-entrance-delay-2">
                            <div className="events-controls">
                                <form onSubmit={handleSearch} className="search-container">
                                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21 21L16.65 16.65" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search events..." 
                                        className="search-input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </form>
                                <div className="events-summary">
                                    <span className="events-count">Total Events: <strong>{totalEvents}</strong></span>
                                </div>
                            </div>
                        </section>

                        <section className="animate-entrance animate-entrance-delay-3">
                            <div className="events-table-wrapper">
                                <div className="events-table-container">
                                    {isLoading ? (
                                        <div style={{ padding: '40px', textAlign: 'center' }}>
                                            <div className="loading-spinner"></div>
                                            <p style={{ marginTop: '16px', color: 'rgba(5, 44, 88, 0.6)' }}>Loading events...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <table className="events-table">
                                                <thead>
                                                    <tr>
                                                        <th>Event ID</th>
                                                        <th>User</th>
                                                        <th>Event Date</th>
                                                        <th>Created At</th>
                                                        <th>Updated At</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {events.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'rgba(5, 44, 88, 0.6)' }}>
                                                                No events found
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        events.map(event => (
                                                            <tr key={event.id}>
                                                                <td>#{event.id}</td>
                                                                <td>
                                                                    <a 
                                                                        href="#" 
                                                                        className="profile-link"
                                                                        onClick={(e) => handleProfileClick(event.profileId, e)}
                                                                    >
                                                                        {getUserDisplayName(event.profileId)}
                                                                    </a>
                                                                </td>
                                                                <td>{formatDate(event.date)}</td>
                                                                <td>{formatDate(event.createdAt)}</td>
                                                                <td>{event.updatedAt ? formatDate(event.updatedAt) : 'Never'}</td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                            
                                            {totalPages > 1 && (
                                                <div className="pagination">
                                                    <button 
                                                        className="pagination-btn"
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Previous
                                                    </button>
                                                    <span className="pagination-info">
                                                        Page {currentPage} of {totalPages}
                                                    </span>
                                                    <button 
                                                        className="pagination-btn"
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {showProfileModal && selectedUserId && (
                <UserProfileModal
                    userId={selectedUserId}
                    isOpen={showProfileModal}
                    onClose={() => {
                        setShowProfileModal(false);
                        setSelectedUserId(null);
                    }}
                />
            )}
        </>
    );
};

export default Events;