import React from 'react';
import { UserProfile } from '../../services/userService';

interface ProfileGeneralTabProps {
    userProfile: UserProfile;
}

const ProfileGeneralTab: React.FC<ProfileGeneralTabProps> = ({ userProfile }) => {
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateAge = (dateOfBirth: string | null): number | null => {
        if (!dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="profile-general-tab">
            <div className="profile-info-grid">
                <div className="profile-info-item">
                    <label>First Name</label>
                    <p>{userProfile.firstName || 'Not provided'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Last Name</label>
                    <p>{userProfile.lastName || 'Not provided'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Email</label>
                    <p>{userProfile.email}</p>
                </div>
                <div className="profile-info-item">
                    <label>Phone Number</label>
                    <p>{userProfile.phoneNumber || 'Not provided'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Gender</label>
                    <p>{userProfile.gender || 'Not provided'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Age</label>
                    <p>{userProfile.dateOfBirth ? `${calculateAge(userProfile.dateOfBirth)} years` : 'Not provided'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Date of Birth</label>
                    <p>{userProfile.dateOfBirth ? new Date(userProfile.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Account Status</label>
                    <p>{userProfile.isActive ? 'Active' : 'Inactive'}</p>
                </div>
                <div className="profile-info-item">
                    <label>Last Login</label>
                    <p>{formatDate(userProfile.lastLoginAt)}</p>
                </div>
                <div className="profile-info-item">
                    <label>Created</label>
                    <p>{formatDate(userProfile.createdAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileGeneralTab;