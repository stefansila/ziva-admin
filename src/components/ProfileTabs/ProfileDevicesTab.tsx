import React from 'react';

interface ProfileDevicesTabProps {
    userId: number;
}

const ProfileDevicesTab: React.FC<ProfileDevicesTabProps> = ({ userId }) => {
    // In the future, you can fetch devices data here
    
    return (
        <div className="profile-devices-tab">
            <p className="tab-placeholder">Connected devices will be displayed here</p>
        </div>
    );
};

export default ProfileDevicesTab;