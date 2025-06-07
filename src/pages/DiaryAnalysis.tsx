import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

type GroupType = 'All Groups' | 'High Risk' | 'Moderate Risk' | 'Low Risk' | 'Control Group';
type TimeRangeType = 'Week' | 'Month' | 'Quarter' | 'Year';
type TabType = 'Emotional Quadrants' | 'Trend Analysis';

const DiaryAnalysis: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<GroupType>('All Groups');
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRangeType>('Month');
  const [activeTab, setActiveTab] = useState<TabType>('Emotional Quadrants');

  // Static data for radar chart (Emotional Quadrants)
  const emotionalQuadrantsData = {
    labels: ['High Anxiety', 'Low Anxiety', 'Calm', 'Excited'],
    datasets: [
      {
        label: 'Emotional Patterns',
        data: [75, 45, 30, 60],
        backgroundColor: 'rgba(109, 100, 211, 0.2)',
        borderColor: '#6D64D3',
        borderWidth: 2,
        pointBackgroundColor: '#6D64D3',
        pointBorderColor: '#6D64D3',
        pointRadius: 4,
      },
    ],
  };

  // Static data for trend analysis (Line chart)
  const trendAnalysisData = {
    labels: [
      'about 1 month ago',
      '27 days ago',
      '24 days ago',
      '21 days ago',
      '18 days ago',
      '15 days ago',
      '12 days ago',
      '9 days ago',
      '6 days ago',
      '3 days ago'
    ],
    datasets: [
      {
        label: 'High Anxiety',
        data: [52, 55, 70, 68, 62, 48, 50, 42, 45, 47],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Low Anxiety',
        data: [36, 40, 56, 54, 48, 34, 22, 26, 30, 32],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Calm',
        data: [46, 52, 42, 46, 44, 48, 38, 34, 33, 37],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Excited',
        data: [44, 40, 48, 44, 42, 43, 50, 54, 55, 52],
        borderColor: '#6D64D3',
        backgroundColor: 'rgba(109, 100, 211, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const radarChartOptions = {
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
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
        },
        angleLines: {
          color: 'rgba(5, 44, 88, 0.1)',
        },
                 pointLabels: {
           color: 'rgba(5, 44, 88, 0.8)',
           font: {
             size: 14,
             weight: 500,
           },
         },
      },
    },
  };

  const lineChartOptions = {
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
        },
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#052C58',
        borderColor: '#6D64D3',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          maxTicksLimit: 6,
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
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
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
                <h1 className="h1-48">Diary Analysis</h1>
                <p className="text-op-60">Analysis of emotional patterns across diary entries</p>
              </div>
            </section>

            <section className="animate-entrance animate-entrance-delay-2">
              <div className="diary-analysis-section">
                <div className="diary-analysis-header">
                  <h2 className="diary-analysis-title">Emotional Patterns</h2>
                  <div className="diary-analysis-controls">
                    <div className="diary-control-group">
                      <span className="diary-control-label">Group:</span>
                      <select 
                        className="diary-select"
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value as GroupType)}
                      >
                        <option value="All Groups">All Groups</option>
                        <option value="High Risk">High Risk</option>
                        <option value="Moderate Risk">Moderate Risk</option>
                        <option value="Low Risk">Low Risk</option>
                        <option value="Control Group">Control Group</option>
                      </select>
                    </div>
                    <div className="diary-control-group">
                      <span className="diary-control-label">Time Range:</span>
                      <div className="diary-time-buttons">
                        {(['Week', 'Month', 'Quarter', 'Year'] as TimeRangeType[]).map(range => (
                          <button
                            key={range}
                            className={`diary-time-btn ${selectedTimeRange === range ? 'diary-time-btn-active' : ''}`}
                            onClick={() => setSelectedTimeRange(range)}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="diary-tabs">
                  <button 
                    className={`diary-tab ${activeTab === 'Emotional Quadrants' ? 'diary-tab-active' : ''}`}
                    onClick={() => setActiveTab('Emotional Quadrants')}
                  >
                    Emotional Quadrants
                  </button>
                  <button 
                    className={`diary-tab ${activeTab === 'Trend Analysis' ? 'diary-tab-active' : ''}`}
                    onClick={() => setActiveTab('Trend Analysis')}
                  >
                    Trend Analysis
                  </button>
                </div>

                <div className="diary-chart-content">
                  {activeTab === 'Emotional Quadrants' && (
                    <div className="diary-chart-container-full">
                      <div className="chart-wrapper">
                        <Radar data={emotionalQuadrantsData} options={radarChartOptions} />
                      </div>
                      <div className="diary-chart-description">
                        <h3 className="diary-description-title">Emotional Quadrants Analysis</h3>
                        <p className="diary-description-text">
                          This radar chart visualizes the emotional patterns across four key quadrants: High Anxiety, Low Anxiety, Calm, and Excited.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Trend Analysis' && (
                    <div className="diary-chart-container-full">
                      <div className="chart-wrapper">
                        <Line data={trendAnalysisData} options={lineChartOptions} />
                      </div>
                      <div className="diary-trend-analysis">
                        <div className="diary-insights-header">
                          <h3 className="diary-description-title">Emotional Trend Analysis</h3>
                          <button className="diary-insights-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Insights
                          </button>
                        </div>
                        <p className="diary-description-text">
                          Trend analysis shows how emotional states have evolved over time across all patient groups.
                        </p>
                        <div className="diary-key-observations">
                          <h4 className="diary-observations-title">Key Observations:</h4>
                          <ul className="diary-observations-list">
                            <li>Across all groups, anxiety levels fluctuate in predictable patterns related to external factors.</li>
                            <li>Monthly data indicates correlation between weekend periods and increased excitement levels.</li>
                            <li>The ratio between high and low anxiety states provides valuable predictive insights for intervention timing.</li>
                          </ul>
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

export default DiaryAnalysis; 