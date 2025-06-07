import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface PatientData {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  location: string;
  panicEvents: number;
}

interface GroupData {
  id: string;
  name: string;
  patientCount: number;
  patients: PatientData[];
}

const Groups: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>('moderate-risk');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const groupsData: GroupData[] = [
    {
      id: 'moderate-risk',
      name: 'Moderate Risk',
      patientCount: 10,
      patients: [
        { id: 1, name: 'User 1', email: 'user1@example.com', age: 69, gender: 'Male', location: 'New York', panicEvents: 1 },
        { id: 2, name: 'User 2', email: 'user2@example.com', age: 32, gender: 'Male', location: 'Houston', panicEvents: 3 },
        { id: 5, name: 'User 5', email: 'user5@example.com', age: 58, gender: 'Male', location: 'San Antonio', panicEvents: 2 },
        { id: 6, name: 'User 6', email: 'user6@example.com', age: 61, gender: 'Other', location: 'Chicago', panicEvents: 4 },
        { id: 7, name: 'User 7', email: 'user7@example.com', age: 35, gender: 'Other', location: 'Philadelphia', panicEvents: 3 },
        { id: 9, name: 'User 9', email: 'user9@example.com', age: 28, gender: 'Female', location: 'Houston', panicEvents: 2 },
        { id: 14, name: 'User 14', email: 'user14@example.com', age: 38, gender: 'Other', location: 'San Antonio', panicEvents: 2 },
        { id: 15, name: 'User 15', email: 'user15@example.com', age: 50, gender: 'Other', location: 'Chicago', panicEvents: 4 },
        { id: 17, name: 'User 17', email: 'user17@example.com', age: 27, gender: 'Other', location: 'Phoenix', panicEvents: 4 },
        { id: 18, name: 'User 18', email: 'user18@example.com', age: 34, gender: 'Other', location: 'Houston', panicEvents: 2 }
      ]
    },
    {
      id: 'low-risk',
      name: 'Low Risk',
      patientCount: 2,
      patients: [
        { id: 3, name: 'User 3', email: 'user3@example.com', age: 45, gender: 'Female', location: 'Los Angeles', panicEvents: 1 },
        { id: 4, name: 'User 4', email: 'user4@example.com', age: 29, gender: 'Male', location: 'Miami', panicEvents: 0 }
      ]
    },
    {
      id: 'control-group',
      name: 'Control Group',
      patientCount: 3,
      patients: [
        { id: 8, name: 'User 8', email: 'user8@example.com', age: 42, gender: 'Male', location: 'Seattle', panicEvents: 0 },
        { id: 10, name: 'User 10', email: 'user10@example.com', age: 55, gender: 'Female', location: 'Boston', panicEvents: 0 },
        { id: 11, name: 'User 11', email: 'user11@example.com', age: 33, gender: 'Other', location: 'Denver', panicEvents: 0 }
      ]
    },
    {
      id: 'high-risk',
      name: 'High Risk',
      patientCount: 3,
      patients: [
        { id: 12, name: 'User 12', email: 'user12@example.com', age: 67, gender: 'Male', location: 'Atlanta', panicEvents: 6 },
        { id: 13, name: 'User 13', email: 'user13@example.com', age: 41, gender: 'Female', location: 'Portland', panicEvents: 5 },
        { id: 16, name: 'User 16', email: 'user16@example.com', age: 52, gender: 'Male', location: 'Dallas', panicEvents: 7 }
      ]
    }
  ];

  const activeGroupData = groupsData.find(group => group.id === activeGroup);

  const filteredPatients = activeGroupData?.patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getGroupBadgeClass = (groupId: string): string => {
    switch (groupId) {
      case 'high-risk':
        return 'high-risk-badge';
      case 'moderate-risk':
        return 'moderate-risk-badge';
      case 'low-risk':
        return 'low-risk-badge';
      default:
        return 'control-group-badge';
    }
  };

  const generateAvatar = (name: string): string => {
    const colors = ['#6D64D3', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colorIndex = name.charCodeAt(0) % colors.length;
    const color = colors[colorIndex];
    
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="${color}"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Inter" font-size="14" font-weight="500">${initials}</text>
      </svg>
    `)}`;
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="top-right">
          <div className="dh-embed">
            <svg width={20} height={19} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.3" clipPath="url(#clip0_864_301)">
                <path d="M17.706 13.7598L15.606 6.18475C15.184 4.66096 14.2643 3.32221 12.9933 2.38173C11.7222 1.44125 10.173 0.95314 8.59247 0.995152C7.01189 1.03716 5.49082 1.60688 4.27156 2.61355C3.05229 3.62022 2.20495 5.00595 1.86451 6.55L0.240762 13.855C0.179888 14.1291 0.181353 14.4134 0.245049 14.6868C0.308746 14.9603 0.433046 15.216 0.608775 15.435C0.784504 15.654 1.00717 15.8307 1.26035 15.9521C1.51352 16.0735 1.79073 16.1366 2.07151 16.1365H5.17876C5.41744 16.9619 5.91784 17.6874 6.60461 18.2037C7.29137 18.72 8.12731 18.9992 8.98651 18.9992C9.84571 18.9992 10.6817 18.72 11.3684 18.2037C12.0552 17.6874 12.5556 16.9619 12.7943 16.1365H15.9C16.1891 16.1365 16.4742 16.0697 16.7332 15.9413C16.9921 15.8129 17.2179 15.6263 17.3928 15.3962C17.5677 15.1661 17.6871 15.8986 17.7416 15.6148C17.796 15.3309 17.7834 15.0383 17.706 13.7598ZM2.53876 13.8865L4.06126 7.03375C4.29445 5.9808 4.87317 5.03612 5.7053 4.35009C6.53742 3.66406 7.57512 3.2761 8.65322 3.24799C9.73131 3.21987 10.7878 3.55321 11.6546 4.19493C12.5213 4.83666 13.1485 5.74989 13.4363 6.78925L15.4073 13.8865H2.53876Z" fill="#052C58" />
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
                <h1 className="h1-48">Group Management</h1>
                <p className="text-op-60">Manage patient groups and view group members</p>
              </div>
            </section>
            
            <section className="animate-entrance animate-entrance-delay-2">
              <div className="groups-layout">
                <div className="groups-sidebar">
                  <div className="groups-sidebar-header">
                    <h3 className="groups-sidebar-title">Patient Groups</h3>
                    <p className="groups-sidebar-subtitle">Select a group to view its members</p>
                  </div>
                  <div className="groups-list">
                    {groupsData.map(group => (
                      <div
                        key={group.id}
                        className={`group-item ${activeGroup === group.id ? 'group-item-active' : ''}`}
                        onClick={() => setActiveGroup(group.id)}
                      >
                        <div className="group-item-content">
                          <div className="group-item-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="group-item-info">
                            <span className="group-item-name">{group.name}</span>
                            <span className="group-item-count">{group.patientCount} patients</span>
                          </div>
                        </div>
                        <div className="group-item-edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="groups-main">
                  <div className="groups-main-header">
                    <div className="groups-main-title-section">
                      <h2 className="groups-main-title">
                        {activeGroupData?.name}
                        <span className={`group-count-badge ${getGroupBadgeClass(activeGroup)}`}>
                          {activeGroupData?.patientCount} patients
                        </span>
                      </h2>
                    </div>
                    <div className="groups-main-controls">
                      <div className="search-container">
                        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 21L16.65 16.65" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input 
                          type="text" 
                          placeholder="Search members..." 
                          className="search-input"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <button className="add-user-btn">+ Add Group</button>
                    </div>
                  </div>
                  
                  <div className="patients-grid">
                    {filteredPatients.map(patient => (
                      <div key={patient.id} className="patient-card">
                        <div className="patient-card-header">
                          <img 
                            src={generateAvatar(patient.name)} 
                            alt={patient.name}
                            className="patient-avatar"
                          />
                          <div className="patient-info">
                            <h4 className="patient-name">{patient.name}</h4>
                            <p className="patient-email">{patient.email}</p>
                          </div>
                        </div>
                        <div className="patient-details">
                          <div className="patient-detail-row">
                            <span className="patient-detail-label">Age:</span>
                            <span className="patient-detail-value">{patient.age}</span>
                            <span className="patient-detail-label">Gender:</span>
                            <span className="patient-detail-value">{patient.gender}</span>
                            <span className="patient-detail-location">{patient.location}</span>
                          </div>
                          {patient.panicEvents > 0 && (
                            <div className="panic-events-badge">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              {patient.panicEvents} Panic Events
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups; 