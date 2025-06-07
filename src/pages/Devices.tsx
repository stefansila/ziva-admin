import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface DeviceData {
  id: number;
  serial: string;
  fw: string;
  model: string;
  assigned: string;
  assignedLink?: string;
  battery: number;
  lastSync: string;
  status: 'paired' | 'inactive' | 'unpaired' | 'maintenance';
}

type SortKey = 'name' | 'group' | 'age' | 'registered' | 'status';
type SortDirection = 'asc' | 'desc';

const statusLabels: Record<string, string> = {
  paired: 'active',
  inactive: 'inactive',
  unpaired: 'unpaired',
  maintenance: 'maintenance',
};

const statusClass: Record<string, string> = {
  paired: 'status-indicator active',
  inactive: 'status-indicator inactive',
  unpaired: 'status-indicator unpaired',
  maintenance: 'status-indicator maintenance',
};

const Devices: React.FC = () => {
  const [devices] = useState<DeviceData[]>([
    { id: 1, serial: 'SN-1182-6519', fw: '3.3.2', model: 'EEG-3000', assigned: 'User 6', assignedLink: '#', battery: 42, lastSync: 'May 3, 2025', status: 'paired' },
    { id: 2, serial: 'SN-1583-4119', fw: '3.6.3', model: 'EEG-2000', assigned: 'User 14', assignedLink: '#', battery: 46, lastSync: 'May 3, 2025', status: 'paired' },
    { id: 3, serial: 'SN-2417-2648', fw: '2.5.3', model: 'EEG-2000', assigned: 'Unassigned', battery: 27, lastSync: 'Never synced', status: 'inactive' },
    { id: 4, serial: 'SN-3711-2819', fw: '3.7.8', model: 'EEG-1000', assigned: 'Unassigned', battery: 29, lastSync: 'Never synced', status: 'unpaired' },
    { id: 5, serial: 'SN-4286-9659', fw: '2.7.4', model: 'EEG-2000', assigned: 'User 15', assignedLink: '#', battery: 28, lastSync: 'May 6, 2025', status: 'maintenance' },
    { id: 6, serial: 'SN-4291-1113', fw: '3.2.8', model: 'EEG-4000', assigned: 'User 14', assignedLink: '#', battery: 76, lastSync: 'May 6, 2025', status: 'paired' },
    { id: 7, serial: 'SN-4393-1811', fw: '2.1.2', model: 'EEG-1000', assigned: 'User 6', assignedLink: '#', battery: 97, lastSync: 'May 5, 2025', status: 'paired' },
    { id: 8, serial: 'SN-4536-9858', fw: '3.2.1', model: 'EEG-2000', assigned: 'User 9', assignedLink: '#', battery: 91, lastSync: 'May 7, 2025', status: 'paired' },
  ]);
  const [search, setSearch] = useState('');

  const filteredDevices = devices.filter(device =>
    device.serial.toLowerCase().includes(search.toLowerCase()) ||
    device.model.toLowerCase().includes(search.toLowerCase()) ||
    device.assigned.toLowerCase().includes(search.toLowerCase())
  );

  const getBatteryColor = (battery: number) => {
    if (battery < 30) return 'battery-red';
    if (battery < 60) return 'battery-orange';
    return 'battery-green';
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
                <h1 className="h1-48">Device Management</h1>
                <p className="text-op-60">Monitor and manage connected EEG sensors</p>
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
                    placeholder="Search devices..."
                    className="search-input"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="controls-right">
                  <button className="filter-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Filter
                  </button>
                  <button className="add-user-btn">Add Device</button>
                </div>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-3">
              <div className="users-table-wrapper">
                <div className="users-table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Serial Number</th>
                        <th>Model</th>
                        <th>Assigned To</th>
                        <th>Battery</th>
                        <th>Last Sync</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDevices.map(device => (
                        <tr key={device.id}>
                          <td>
                            <div style={{fontWeight: 600}}>{device.serial}</div>
                            <div style={{fontSize: 12, color: '#8A94A6'}}>FW: {device.fw}</div>
                          </td>
                          <td>{device.model}</td>
                          <td>
                            {device.assignedLink ? (
                              <a href={device.assignedLink} style={{color: '#2563eb', fontWeight: 500}}>{device.assigned}</a>
                            ) : (
                              <span style={{color: '#8A94A6'}}>Unassigned</span>
                            )}
                          </td>
                          <td>
                            <span className={`battery-badge ${getBatteryColor(device.battery)}`}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight: 4, verticalAlign: 'middle'}} xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="7" width="18" height="10" rx="2" stroke="#8A94A6" strokeWidth="2"/>
                                <rect x="20" y="10" width="2" height="4" rx="1" fill="#8A94A6"/>
                              </svg>
                              {device.battery}%
                            </span>
                          </td>
                          <td>{device.lastSync}</td>
                          <td>
                            <span className={statusClass[device.status]}>
                              {statusLabels[device.status]}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <button className="action-menu-trigger">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
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

export default Devices; 