import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BillingTable from '../components/BillingTable';
import { billingRecords } from '../data/billingData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

type FilterType = 'High Risk' | 'Moderate Risk' | 'Low Risk' | 'Control Group';
type TimeRange = '1D' | '7D' | '14D' | '30D';
type FinanceTab = 'revenue' | 'plans' | 'payments';

const Analytics: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('High Risk');
  const [timeRange, setTimeRange] = useState<TimeRange>('14D');
  const [financeActiveTab, setFinanceActiveTab] = useState<FinanceTab>('revenue');

  // Data for different filters
  const anxietyDataByFilter = {
    'High Risk': {
      labels: ['May 24, 03:00', 'May 25, 15:00', 'May 27, 03:00', 'May 28, 15:00', 'May 30, 03:00', 'May 31, 15:00', 'Jun 2, 00:00', 'Jun 3, 09:00', 'Jun 4, 18:00', 'Jun 6, 03:00', 'Jun 7, 21:00'],
      data: [31, 29, 22, 24, 26, 23, 22, 25, 27, 35, 33]
    },
    'Moderate Risk': {
      labels: ['May 24, 03:00', 'May 25, 15:00', 'May 27, 03:00', 'May 28, 15:00', 'May 30, 03:00', 'May 31, 15:00', 'Jun 2, 00:00', 'Jun 3, 09:00', 'Jun 4, 18:00', 'Jun 6, 03:00', 'Jun 7, 21:00'],
      data: [28, 26, 20, 22, 24, 21, 20, 23, 25, 32, 30]
    },
    'Low Risk': {
      labels: ['May 24, 03:00', 'May 25, 15:00', 'May 27, 03:00', 'May 28, 15:00', 'May 30, 03:00', 'May 31, 15:00', 'Jun 2, 00:00', 'Jun 3, 09:00', 'Jun 4, 18:00', 'Jun 6, 03:00', 'Jun 7, 21:00'],
      data: [25, 23, 18, 20, 22, 19, 18, 21, 23, 29, 27]
    },
    'Control Group': {
      labels: ['May 24, 03:00', 'May 25, 15:00', 'May 27, 03:00', 'May 28, 15:00', 'May 30, 03:00', 'May 31, 15:00', 'Jun 2, 00:00', 'Jun 3, 09:00', 'Jun 4, 18:00', 'Jun 6, 03:00', 'Jun 7, 21:00'],
      data: [22, 20, 16, 18, 20, 17, 16, 19, 21, 26, 24]
    }
  };

  // Daily panic events data
  const panicEventsData = {
    labels: ['May 24', 'May 25', 'May 26', 'May 27', 'May 28', 'May 29', 'May 30', 'Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7'],
    data: [0, 8, 8, 4, 7, 1, 2, 6, 3, 3, 7, 2, 0, 8]
  };

  // Data for group analysis charts (affected by filters)
  const groupAnalysisData = {
    'High Risk': {
      averageAnxiety: { 'Moderate Risk': 50, 'Low Risk': 78, 'Control Group': 68 },
      distribution: { 'Moderate Risk': 26, 'Low Risk': 39, 'Control Group': 35 }
    },
    'Moderate Risk': {
      averageAnxiety: { 'Moderate Risk': 50, 'Low Risk': 78, 'Control Group': 68 },
      distribution: { 'Moderate Risk': 26, 'Low Risk': 39, 'Control Group': 35 }
    },
    'Low Risk': {
      averageAnxiety: { 'Moderate Risk': 45, 'Low Risk': 72, 'Control Group': 62 },
      distribution: { 'Moderate Risk': 30, 'Low Risk': 35, 'Control Group': 35 }
    },
    'Control Group': {
      averageAnxiety: { 'Moderate Risk': 42, 'Low Risk': 70, 'Control Group': 60 },
      distribution: { 'Moderate Risk': 28, 'Low Risk': 37, 'Control Group': 35 }
    }
  };



  const currentAnxietyData = anxietyDataByFilter[activeFilter];
  const currentGroupData = groupAnalysisData[activeFilter];

  // Finance reporting data
  const monthlyRevenueData = {
    labels: ['Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025'],
    data: [0, 0, 220, 270, 340, 40]
  };

  const planDistributionData = {
    'Premium Plan': 63,
    'Basic Plan': 37
  };

  const invoiceStatusData = {
    'Paid': 50,
    'Overdue': 26,
    'Pending': 13,
    'Cancelled': 11
  };

  const paymentMethodsData = {
    'Bank Transfer': 39,
    'Credit Card': 29,
    'PayPal': 32
  };

  const anxietyChartData = {
    labels: currentAnxietyData.labels,
    datasets: [
      {
        label: 'Anxiety Level',
        data: currentAnxietyData.data,
        borderColor: '#6D64D3',
        backgroundColor: 'rgba(109, 100, 211, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6D64D3',
        pointBorderColor: '#6D64D3',
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#6D64D3',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const panicEventsChartData = {
    labels: panicEventsData.labels,
    datasets: [
      {
        label: 'Panic Events',
        data: panicEventsData.data,
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const anxietyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          maxTicksLimit: 8,
        },
      },
      y: {
        display: true,
        min: 15,
        max: 43,
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          stepSize: 5,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const panicEventsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#EF4444',
        borderColor: '#EF4444',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            return `Panic Events: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        min: 0,
        max: 8,
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          stepSize: 2,
        },
      },
    },
  };

  // Average Anxiety Level by Group chart data
  const averageAnxietyChartData = {
    labels: Object.keys(currentGroupData.averageAnxiety),
    datasets: [
      {
        label: 'Average Anxiety Level',
        data: Object.values(currentGroupData.averageAnxiety),
        backgroundColor: ['#6D64D3', '#10B981', '#F59E0B'],
        borderColor: ['#6D64D3', '#10B981', '#F59E0B'],
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  // Anxiety Distribution by Group chart data
  const distributionChartData = {
    labels: Object.keys(currentGroupData.distribution),
    datasets: [
      {
        data: Object.values(currentGroupData.distribution),
        backgroundColor: ['#6D64D3', '#10B981', '#F59E0B'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const averageAnxietyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        min: 0,
        max: 80,
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          stepSize: 20,
        },
      },
    },
  };

  const distributionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
          },
          color: '#052C58',
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label}: ${value}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  // Finance chart data
  const monthlyRevenueChartData = {
    labels: monthlyRevenueData.labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyRevenueData.data,
        backgroundColor: '#6D64D3',
        borderColor: '#6D64D3',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const planDistributionChartData = {
    labels: Object.keys(planDistributionData),
    datasets: [
      {
        data: Object.values(planDistributionData),
        backgroundColor: ['#6D64D3', '#10B981'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const invoiceStatusChartData = {
    labels: Object.keys(invoiceStatusData),
    datasets: [
      {
        data: Object.values(invoiceStatusData),
        backgroundColor: ['#10B981', '#F59E0B', '#F97316', '#6D64D3'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const paymentMethodsChartData = {
    labels: Object.keys(paymentMethodsData),
    datasets: [
      {
        data: Object.values(paymentMethodsData),
        backgroundColor: ['#6D64D3', '#10B981', '#F59E0B'],
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  };

  const monthlyRevenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Revenue: $${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        min: 0,
        max: 360,
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          stepSize: 90,
          callback: function(value: any) {
            return `$${value}`;
          },
        },
      },
    },
  };

  const planDistributionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
          },
          color: '#052C58',
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label} ${value}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  const invoiceStatusChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
          },
          color: '#052C58',
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label} ${value}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  const paymentMethodsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
          },
          color: '#052C58',
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label} ${value}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  const getFilterButtonClass = (filter: FilterType): string => {
    const baseClass = 'analytics-filter-btn';
    const activeClass = activeFilter === filter ? ' analytics-filter-btn-active' : '';
    
    switch (filter) {
      case 'High Risk':
        return `${baseClass} high-risk${activeClass}`;
      case 'Moderate Risk':
        return `${baseClass} moderate-risk${activeClass}`;
      case 'Low Risk':
        return `${baseClass} low-risk${activeClass}`;
      case 'Control Group':
        return `${baseClass} control-group${activeClass}`;
      default:
        return baseClass;
    }
  };

  const getTimeRangeButtonClass = (range: TimeRange): string => {
    return `analytics-time-btn ${timeRange === range ? 'analytics-time-btn-active' : ''}`;
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
                <h1 className="h1-48">Analytics</h1>
                <p className="text-op-60">Detailed analysis of anxiety data across users and groups</p>
              </div>
            </section>
            
            <section className="animate-entrance animate-entrance-delay-2">
              <div className="analytics-section">
                <div className="analytics-header">
                  <h2 className="analytics-title">Analytics</h2>
                  <div className="analytics-controls">
                    <span className="analytics-time-label">Time Range:</span>
                    <div className="analytics-time-buttons">
                      {(['1D', '7D', '14D', '30D'] as TimeRange[]).map(range => (
                        <button
                          key={range}
                          className={getTimeRangeButtonClass(range)}
                          onClick={() => setTimeRange(range)}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="analytics-filters">
                  <span className="analytics-filter-label">Filter by Group:</span>
                  <div className="analytics-filter-buttons">
                    {(['High Risk', 'Moderate Risk', 'Low Risk', 'Control Group'] as FilterType[]).map(filter => (
                      <button
                        key={filter}
                        className={getFilterButtonClass(filter)}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="chart-wrapper">
                  <h3 className="chart-title">Anxiety Level Over Time</h3>
                  <div className="chart">
                    <Line data={anxietyChartData} options={anxietyChartOptions} />
                  </div>
                </div>
              </div>
            </section>
            
            <section className="animate-entrance animate-entrance-delay-3">
              <div className="chart-wrapper">
                <h3 className="chart-title">Daily Panic Events</h3>
                <div className="chart">
                  <Bar data={panicEventsChartData} options={panicEventsChartOptions} />
                </div>
              </div>
            </section>

            {/* Filter tabs for group analysis */}
            <section className="animate-entrance animate-entrance-delay-5">
              <div className="analytics-filter-tabs">
                <button 
                  className={getFilterButtonClass('High Risk')}
                  onClick={() => setActiveFilter('High Risk')}
                >
                  By Group
                </button>
                <button 
                  className={getFilterButtonClass('Moderate Risk')}
                  onClick={() => setActiveFilter('Moderate Risk')}
                >
                  By Age
                </button>
                <button 
                  className={getFilterButtonClass('Low Risk')}
                  onClick={() => setActiveFilter('Low Risk')}
                >
                  By Gender
                </button>
              </div>
            </section>

            {/* Group Analysis Charts */}
            <section className="animate-entrance animate-entrance-delay-6">
              <div className="analytics-charts-grid">
                <div className="analytics-chart-container">
                  <h3 className="chart-title">Average Anxiety Level by Group</h3>
                  <div className="chart-wrapper">
                    <Bar data={averageAnxietyChartData} options={averageAnxietyChartOptions} />
                  </div>
                </div>
                <div className="analytics-chart-container">
                  <h3 className="chart-title">Anxiety Distribution by Group</h3>
                  <div className="chart-wrapper">
                    <Doughnut data={distributionChartData} options={distributionChartOptions} />
                  </div>
                </div>
              </div>
            </section>

            {/* Billing Section */}
            <section className="animate-entrance animate-entrance-delay-7">
              <div className="billing-section">
                <div className="billing-header">
                  <h2 className="billing-title">Billing</h2>
                  <p className="billing-subtitle">Track invoices and payments across all users</p>
                </div>
                <BillingTable records={billingRecords} showSearch={false} title="Billing Records" />
              </div>
            </section>

            {/* Finance Reporting Section */}
            <section className="animate-entrance animate-entrance-delay-8">
              <div className="finance-reporting-section">
                <div className="finance-reporting-header">
                  <h2 className="finance-reporting-title">Finance Reporting</h2>
                  <p className="finance-reporting-subtitle">Financial analytics and revenue metrics</p>
                </div>

                {/* Finance Summary Cards */}
                <div className="finance-summary-cards">
                  <div className="finance-summary-card">
                    <span className="finance-summary-label">Total Revenue</span>
                    <span className="finance-summary-value">$509.81</span>
                  </div>
                  <div className="finance-summary-card">
                    <span className="finance-summary-label">Avg. Invoice</span>
                    <span className="finance-summary-value">$26.83</span>
                  </div>
                  <div className="finance-summary-card">
                    <span className="finance-summary-label">Active Subscriptions</span>
                    <span className="finance-summary-value">17</span>
                  </div>
                </div>

                {/* Finance Tabs */}
                <div className="finance-tabs">
                  <button 
                    className={`finance-tab ${financeActiveTab === 'revenue' ? 'finance-tab-active' : ''}`}
                    onClick={() => setFinanceActiveTab('revenue')}
                  >
                    Revenue
                  </button>
                  <button 
                    className={`finance-tab ${financeActiveTab === 'plans' ? 'finance-tab-active' : ''}`}
                    onClick={() => setFinanceActiveTab('plans')}
                  >
                    Plans
                  </button>
                  <button 
                    className={`finance-tab ${financeActiveTab === 'payments' ? 'finance-tab-active' : ''}`}
                    onClick={() => setFinanceActiveTab('payments')}
                  >
                    Payments
                  </button>
                </div>

                {/* Finance Charts Content */}
                <div className="finance-charts-content">
                  {financeActiveTab === 'revenue' && (
                    <div className="finance-charts-grid">
                      <div className="finance-chart-container finance-chart-full-width">
                        <h3 className="chart-title">Monthly Revenue</h3>
                        <div className="chart-wrapper">
                          <Bar data={monthlyRevenueChartData} options={monthlyRevenueChartOptions} />
                        </div>
                      </div>
                      <div className="finance-chart-container">
                        <h3 className="chart-title">Plan Distribution</h3>
                        <div className="chart-wrapper">
                          <Doughnut data={planDistributionChartData} options={planDistributionChartOptions} />
                        </div>
                      </div>
                      <div className="finance-chart-container">
                        <h3 className="chart-title">Invoice Status</h3>
                        <div className="chart-wrapper">
                          <Doughnut data={invoiceStatusChartData} options={invoiceStatusChartOptions} />
                        </div>
                      </div>
                    </div>
                  )}

                  {financeActiveTab === 'plans' && (
                    <div className="finance-charts-grid finance-charts-grid-two">
                      <div className="finance-chart-container">
                        <h3 className="chart-title">Plan Distribution</h3>
                        <div className="chart-wrapper">
                          <Doughnut data={planDistributionChartData} options={planDistributionChartOptions} />
                        </div>
                      </div>
                      <div className="finance-chart-container">
                        <h3 className="chart-title">Invoice Status</h3>
                        <div className="chart-wrapper">
                          <Doughnut data={invoiceStatusChartData} options={invoiceStatusChartOptions} />
                        </div>
                      </div>
                    </div>
                  )}

                  {financeActiveTab === 'payments' && (
                    <div className="finance-charts-grid finance-charts-grid-single">
                      <div className="finance-chart-container">
                        <h3 className="chart-title">Payment Methods</h3>
                        <div className="chart-wrapper">
                          <Doughnut data={paymentMethodsChartData} options={paymentMethodsChartOptions} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics; 