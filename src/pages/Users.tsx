import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

interface UserData {
  id: number;
  name: string;
  email: string;
  group: string;
  risk: string;
  age: number;
  registered: string;
  status: string;
}

type SortKey = 'name' | 'group' | 'age' | 'registered' | 'status';
type SortDirection = 'asc' | 'desc';

const Users: React.FC = () => {
  const [users] = useState<UserData[]>([
    { id: 1, name: 'User 1', email: 'user1@example.com', group: 'Moderate Risk', risk: 'moderate', age: 24, registered: 'Oct 13, 2024', status: 'active' },
    { id: 10, name: 'User 10', email: 'user10@example.com', group: 'Control Group', risk: 'control', age: 50, registered: 'Jun 4, 2024', status: 'active' },
    { id: 11, name: 'User 11', email: 'user11@example.com', group: 'High Risk', risk: 'high', age: 69, registered: 'Jun 5, 2024', status: 'inactive' },
    { id: 12, name: 'User 12', email: 'user12@example.com', group: 'Control Group', risk: 'control', age: 65, registered: 'Jul 9, 2024', status: 'active' },
    { id: 13, name: 'User 13', email: 'user13@example.com', group: 'Low Risk', risk: 'low', age: 41, registered: 'Aug 19, 2024', status: 'inactive' },
    { id: 14, name: 'User 14', email: 'user14@example.com', group: 'Low Risk', risk: 'low', age: 27, registered: 'May 25, 2024', status: 'active' },
    { id: 15, name: 'User 15', email: 'user15@example.com', group: 'Control Group', risk: 'control', age: 18, registered: 'Dec 31, 2024', status: 'active' },
    { id: 16, name: 'User 16', email: 'user16@example.com', group: 'Control Group', risk: 'control', age: 40, registered: 'May 14, 2024', status: 'active' },
    { id: 17, name: 'User 17', email: 'user17@example.com', group: 'Low Risk', risk: 'low', age: 47, registered: 'Nov 22, 2024', status: 'active' },
  ]);

  const [showActions, setShowActions] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: SortDirection }>({ key: 'name', direction: 'asc' });

  // Add click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActions !== null && !(event.target as Element).closest('.action-menu') && !(event.target as Element).closest('.action-menu-trigger')) {
        setShowActions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActions]);

  const handleUserMenuClick = (userId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setShowActions(showActions === userId ? null : userId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users based on current sort configuration
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key === 'age') {
      return sortConfig.direction === 'asc' 
        ? a.age - b.age 
        : b.age - a.age;
    }
    
    // For string comparisons
    const aValue = String(a[sortConfig.key]).toLowerCase();
    const bValue = String(b[sortConfig.key]).toLowerCase();

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getRiskBadgeClass = (risk: string): string => {
    switch (risk) {
      case 'high':
        return 'high-risk-badge';
      case 'moderate':
        return 'moderate-risk-badge';
      case 'low':
        return 'low-risk-badge';
      default:
        return 'control-group-badge';
    }
  };

  const getRiskLabel = (risk: string): string => {
    switch (risk) {
      case 'high':
        return 'High Risk';
      case 'moderate':
        return 'Moderate Risk';
      case 'low':
        return 'Low Risk';
      default:
        return 'Control Group';
    }
  };

  // Helper function to render sort icon
  const renderSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return (
        <svg className="sort-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 9L12 3L6 9M6 15L12 21L18 15" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }

    return sortConfig.direction === 'asc' ? (
      <svg className="sort-icon active" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9L12 3L6 9" stroke="#6D64D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg className="sort-icon active" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 15L12 21L18 15" stroke="#6D64D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
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
                <h1 className="h1-48">Users</h1>
                <p className="text-op-60">Manage and monitor registered users</p>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-2">
              <div className="users-controls">
                <div className="search-container">
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="controls-right">
                  <button className="filter-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Filter
                  </button>
                  <button className="add-user-btn">Add User</button>
                </div>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-3">
              <div className="users-table-wrapper">
                <div className="users-table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th className="sortable" onClick={() => handleSort('name')}>
                          <div className="th-content">
                            <span>User</span>
                            {renderSortIcon('name')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('group')}>
                          <div className="th-content">
                            <span>Group</span>
                            {renderSortIcon('group')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('age')}>
                          <div className="th-content">
                            <span>Age</span>
                            {renderSortIcon('age')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('registered')}>
                          <div className="th-content">
                            <span>Registered</span>
                            {renderSortIcon('registered')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('status')}>
                          <div className="th-content">
                            <span>Status</span>
                            {renderSortIcon('status')}
                          </div>
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedUsers.map(user => (
                        <tr key={user.id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar">
                                {user.name.charAt(0)}
                              </div>
                              <div className="user-info">
                                <div className="user-name">{user.name}</div>
                                <div className="user-email">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`risk-badge ${getRiskBadgeClass(user.risk)}`}>
                              {getRiskLabel(user.risk)}
                            </span>
                          </td>
                          <td>{user.age}</td>
                          <td>{user.registered}</td>
                          <td>
                            <span className={`status-indicator ${user.status}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <button 
                              className="action-menu-trigger"
                              onClick={(e) => handleUserMenuClick(user.id, e)}
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            
                            {showActions === user.id && (
                              <div className="action-menu">
                                <ul>
                                  <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Edit User
                                  </li>
                                  <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M4 4H20C20.5304 4 21.0391 4.21071 21.4142 4.58579C21.7893 4.96086 22 5.46957 22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M22 6L12 13L2 6" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Message
                                  </li>
                                  <li>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M17 11L19 13L23 9" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Verify Identity
                                  </li>
                                  <li className="delete-option">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M3 6H5H21" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M10 11V17" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M14 11V17" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Delete User
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users; 