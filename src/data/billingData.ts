import { BillingRecord } from '../components/BillingTable';

export const billingRecords: BillingRecord[] = [
  { id: 1, customer: 'User 5', invoice: 'INV-20250506-4781', date: 'May 6, 2025', status: 'Paid', amount: '$29.99', method: 'card' },
  { id: 2, customer: 'User 8', invoice: 'INV-20250506-3208', date: 'May 6, 2025', status: 'Paid', amount: '$29.99', method: 'card' },
  { id: 3, customer: 'User 18', invoice: 'INV-20250506-3741', date: 'May 6, 2025', status: 'Cancelled', amount: '$29.99', method: 'paypal' },
  { id: 4, customer: 'User 10', invoice: 'INV-20250503-9614', date: 'May 3, 2025', status: 'Overdue', amount: '$29.99', method: 'paypal' },
  { id: 5, customer: 'User 1', invoice: 'INV-20250502-2299', date: 'May 2, 2025', status: 'Paid', amount: '$19.99', method: 'paypal' },
  { id: 6, customer: 'User 16', invoice: 'INV-20250501-2164', date: 'May 1, 2025', status: 'Pending', amount: '$29.99', method: 'paypal' },
  { id: 7, customer: 'User 6', invoice: 'INV-20250429-4582', date: 'Apr 29, 2025', status: 'Overdue', amount: '$19.99', method: 'card' },
]; 