import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RiskGroupChart: React.FC = () => {
  const data = {
    labels: ['High Risk', 'Moderate Risk', 'Low Risk', 'Control Group'],
    datasets: [
      {
        label: 'Anxiety Level',
        data: [35, 35, 90, 47],
        backgroundColor: [
          '#4F8EF7', // Blue for High Risk
          '#5FD3A6', // Green for Moderate Risk  
          '#F5C842', // Yellow for Low Risk
          '#FF8A65', // Orange for Control Group
        ],
        borderColor: [
          '#4F8EF7',
          '#5FD3A6', 
          '#F5C842',
          '#FF8A65',
        ],
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#052C58',
        bodyColor: '#4F8EF7',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 12,
          weight: 'normal' as const,
        },
        bodyFont: {
          size: 14,
          weight: 'bold' as const,
        },
        padding: 12,
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            return `Value: ${context.parsed.y}`;
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
        max: 100,
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          stepSize: 25,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RiskGroupChart; 