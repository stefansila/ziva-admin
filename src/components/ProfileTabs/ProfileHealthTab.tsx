import React, { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import { HealthProfile } from '../UserProfileModal';

interface ProfileHealthTabProps {
    healthProfile: HealthProfile | null;
    onHealthProfileUpdate: (profile: HealthProfile) => void;
}

const ProfileHealthTab: React.FC<ProfileHealthTabProps> = ({ healthProfile, onHealthProfileUpdate }) => {
    const [isUpdatingRiskGroup, setIsUpdatingRiskGroup] = useState(false);
    const { showNotification } = useNotification();

    const handleRiskGroupChange = async (newRiskGroup: string) => {
        if (!healthProfile) return;
        
        // Convert empty string to null
        const riskGroupValue = newRiskGroup === '' ? null : newRiskGroup as 'high' | 'control' | 'average' | 'moderate';
        
        // Store the original profile in case we need to revert
        const originalProfile = { ...healthProfile };
        
        setIsUpdatingRiskGroup(true);
        try {
            const token = localStorage.getItem('accessToken');
            
            const response = await fetch(`https://ziva-health.netlify.app/api/v1/health-profile/health-profiles/${healthProfile.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ riskGroup: riskGroupValue })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update risk group');
            }

            // Since PATCH might return different formats or even empty response
            // We'll manually update the profile with the new risk group
            const updatedProfile: HealthProfile = {
                ...originalProfile,
                riskGroup: riskGroupValue,
                updatedAt: new Date().toISOString() // Update the timestamp
            };
            
            onHealthProfileUpdate(updatedProfile);
            showNotification('success', 'Risk group updated', `Risk group changed to ${formatRiskGroupDisplay(riskGroupValue)}`);
        } catch (error) {
            showNotification('error', 'Failed to update risk group', error instanceof Error ? error.message : 'Please try again');
            // Revert to original profile on error
            onHealthProfileUpdate(originalProfile);
        } finally {
            setIsUpdatingRiskGroup(false);
        }
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Invalid Date';
            }
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    const formatRiskGroupDisplay = (riskGroup: string | null): string => {
        if (!riskGroup) return 'Unassigned';
        switch (riskGroup) {
            case 'high':
                return 'High Risk';
            case 'moderate':
                return 'Moderate Risk';
            case 'average':
                return 'Average Risk';
            case 'control':
                return 'Control Group';
            default:
                return riskGroup;
        }
    };

    if (!healthProfile) {
        return (
            <div className="profile-health-tab">
                <p className="tab-placeholder">Profile doesn't have a health profile setup.</p>
            </div>
        );
    }

    return (
        <div className="profile-health-tab">
            <div className="profile-info-grid">
                <div className="profile-info-item">
                    <label>Health Profile ID</label>
                    <p>{healthProfile.id}</p>
                </div>
                <div className="profile-info-item">
                    <label>Risk Group</label>
                    <select 
                        className="risk-group-select"
                        value={healthProfile.riskGroup || ''}
                        onChange={(e) => handleRiskGroupChange(e.target.value)}
                        disabled={isUpdatingRiskGroup}
                    >
                        <option value="">Unassigned</option>
                        <option value="high">High Risk</option>
                        <option value="moderate">Moderate Risk</option>
                        <option value="average">Average Risk</option>
                        <option value="control">Control Group</option>
                    </select>
                    {isUpdatingRiskGroup && <span className="updating-indicator">Updating...</span>}
                </div>
                <div className="profile-info-item">
                    <label>Frequency</label>
                    <p>{healthProfile.frequency || 'Not set'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Profile Created</label>
                    <p>{formatDate(healthProfile.createdAt)}</p>
                </div>
                <div className="profile-info-item">
                    <label>Last Updated</label>
                    <p>{formatDate(healthProfile.updatedAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHealthTab;