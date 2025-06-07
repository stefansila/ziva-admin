import React, { useState } from 'react';

export interface BillingRecord {
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

interface BillingTableProps {
  records: BillingRecord[];
  showSearch?: boolean;
  title?: string;
}

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

const BillingTable: React.FC<BillingTableProps> = ({ 
  records, 
  showSearch = true, 
  title = "Billing Records" 
}) => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: SortDirection }>({ 
    key: 'date', 
    direction: 'desc' 
  });

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
      {showSearch && (
        <div className="table-header">
          <h2 className="table-title">{title}</h2>
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
      )}
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
                        <path fillRule="evenodd" clipRule="evenodd" d="M25.259 8.557H27.144C27.544 8.567 27.854 8.667 27.969 9.097L28.894 15.443H26.679L26.154 13.133H23.654L23.049 15.443H20.669L23.535 9.046C23.729 8.68 24.044 8.557 24.434 8.557H25.259ZM25.069 11.483C25.069 11.483 25.744 9.87 25.889 9.483C25.879 9.483 25.639 9.483 25.284 9.483H24.984C24.878 9.627 24.214 11.483 24.214 11.483H25.069Z" fill="#2566AF"/>
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
    </>
  );
};

export default BillingTable; 