import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { billingRecords } from '../data/billingData';

interface BillingRecord {
  id: number;
  customer: string;
  invoice: string;
  date: string;
  status: 'Paid' | 'Overdue' | 'Pending' | 'Cancelled';
  amount: string;
  method: 'card' | 'paypal';
}

type SortKey = 'customer' | 'invoice' | 'date' | 'status' | 'amount';
type SortDirection = 'asc' | 'desc';

const statusClass: Record<string, string> = {
  Paid: 'status-indicator active',
  Overdue: 'status-indicator inactive',
  Pending: 'status-indicator unpaired',
  Cancelled: 'status-indicator maintenance',
};

const statusLabel: Record<string, string> = {
  Paid: 'Paid',
  Overdue: 'Overdue',
  Pending: 'Pending',
  Cancelled: 'Cancelled',
};

const Finance: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: SortDirection }>({ key: 'date', direction: 'desc' });
  const [records] = useState<BillingRecord[]>(billingRecords);

  // Dummy summary data
  const totalRevenue = 379.84;
  const avgInvoice = 24.43;
  const activeSubscriptions = 27;

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };

  // Filter records based on search term
  const filteredRecords = records.filter(r =>
    r.customer.toLowerCase().includes(search.toLowerCase()) ||
    r.invoice.toLowerCase().includes(search.toLowerCase())
  );

  // Sort records based on current sort configuration
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortConfig.key === 'amount') {
      // Extract numeric values from amount strings (removing '$')
      const aValue = parseFloat(a.amount.replace('$', ''));
      const bValue = parseFloat(b.amount.replace('$', ''));
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
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
                <h1 className="h1-48">Finance</h1>
                <p className="text-op-60">Manage billing and financial records</p>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-2">
              <div className="finance-cards-grid">
                <div className="grid-info-item">
                  <span className="text-op-60">Total Revenue</span>
                  <span className="span-item-procent">${totalRevenue.toFixed(2)}</span>
                </div>
                <div className="grid-info-item">
                  <span className="text-op-60">Avg. Invoice</span>
                  <span className="span-item-procent">${avgInvoice.toFixed(2)}</span>
                </div>
                <div className="grid-info-item">
                  <span className="text-op-60">Active Subscriptions</span>
                  <span className="span-item-procent">{activeSubscriptions}</span>
                </div>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-3">
              <div className="table-header">
                <h2 className="table-title">Billing Records</h2>
                <div className="search-container">
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="#052C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by customer or invoice..."
                    className="search-input"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </section>
            <section className="animate-entrance animate-entrance-delay-4">
              <div className="users-table-wrapper">
                <div className="users-table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th className="sortable" onClick={() => handleSort('customer')}>
                          <div className="th-content">
                            <span>Customer</span>
                            {renderSortIcon('customer')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('invoice')}>
                          <div className="th-content">
                            <span>Invoice</span>
                            {renderSortIcon('invoice')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('date')}>
                          <div className="th-content">
                            <span>Date</span>
                            {renderSortIcon('date')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('status')}>
                          <div className="th-content">
                            <span>Status</span>
                            {renderSortIcon('status')}
                          </div>
                        </th>
                        <th className="sortable" onClick={() => handleSort('amount')}>
                          <div className="th-content">
                            <span>Amount</span>
                            {renderSortIcon('amount')}
                          </div>
                        </th>
                        <th>Payment Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedRecords.map(record => (
                        <tr key={record.id}>
                          <td>{record.customer}</td>
                          <td>{record.invoice}</td>
                          <td>{record.date}</td>
                          <td>
                            <span className={statusClass[record.status]}>
                              {statusLabel[record.status]}
                            </span>
                          </td>
                          <td>{record.amount}</td>
                          <td>
                            {record.method === 'card' ? (
                              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="24" rx="4" fill="#F3F4F6"/>
                                <path d="M13.548 15.443H11.233L12.883 8.557H15.198L13.548 15.443Z" fill="#2566AF"/>
                                <path d="M20.884 8.7C20.404 8.5 19.649 8.28 18.729 8.28C16.509 8.28 14.914 9.46 14.904 11.14C14.894 12.38 16.039 13.08 16.894 13.5C17.769 13.93 18.059 14.2 18.059 14.58C18.049 15.15 17.364 15.4 16.729 15.4C15.849 15.4 15.374 15.28 14.644 14.93L14.354 14.79L14.039 16.81C14.604 17.08 15.644 17.31 16.724 17.32C19.089 17.32 20.654 16.15 20.674 14.35C20.684 13.38 20.124 12.64 18.824 12.02C18.059 11.63 17.594 11.37 17.599 10.97C17.599 10.61 18.014 10.22 18.919 10.22C19.679 10.21 20.224 10.36 20.644 10.52L20.839 10.61L21.149 8.65L20.884 8.7Z" fill="#2566AF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.259 8.557H27.144C27.544 8.567 27.854 8.667 27.969 9.097L28.894 15.443H26.679L26.154 13.133H23.654L23.049 15.443H20.669L23.535 9.046C23.729 8.68 24.044 8.557 24.434 8.557H25.259ZM25.069 11.483C25.069 11.483 25.744 9.87 25.889 9.483C25.879 9.483 25.639 9.483 25.284 9.483H24.984C24.878 9.627 24.214 11.483 24.214 11.483H25.069Z" fill="#2566AF"/>
                                <path d="M11.074 8.557L8.989 13.283L8.724 11.953C8.264 10.603 6.979 9.137 5.529 8.447L7.444 15.433H9.684L13.084 8.557H11.074Z" fill="#2566AF"/>
                                <path d="M7.139 8.557H3.704L3.669 8.737C6.179 9.357 7.839 11.343 8.314 13.283L7.649 9.107C7.554 8.677 7.374 8.567 7.139 8.557Z" fill="#E79800"/>
                              </svg>
                            ) : (
                              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="24" rx="4" fill="#F3F4F6"/>
                                <path d="M16.949 10.8H19.809C20.169 10.8 20.472 10.713 20.719 10.54C20.965 10.367 21.089 10.133 21.089 9.84C21.089 9.547 20.965 9.313 20.719 9.14C20.472 8.967 20.169 8.88 19.809 8.88H16.949V10.8Z" fill="#253B80"/>
                                <path d="M16.949 14.88H20.249C20.655 14.88 20.995 14.787 21.269 14.6C21.542 14.413 21.679 14.167 21.679 13.86C21.679 13.553 21.542 13.307 21.269 13.12C20.995 12.933 20.655 12.84 20.249 12.84H16.949V14.88Z" fill="#253B80"/>
                                <path d="M27.2 9C26.64 8.467 25.82 8.2 24.74 8.2H21.82V16.96H24.74C25.82 16.96 26.64 16.693 27.2 16.16C27.76 15.627 28.04 14.84 28.04 13.8C28.04 12.76 27.76 10.873 27.2 9ZM25.52 14.62C25.28 14.873 24.94 15 24.5 15H23.78V10.16H24.5C24.94 10.16 25.28 10.287 25.52 10.54C25.76 10.793 25.88 11.173 25.88 11.68V13.48C25.88 13.987 25.76 14.367 25.52 14.62Z" fill="#253B80"/>
                                <path d="M14 8.2H11.9V16.96H14V8.2Z" fill="#253B80"/>
                              </svg>
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

export default Finance; 