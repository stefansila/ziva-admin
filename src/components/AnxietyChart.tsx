import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnxietyChart: React.FC = () => {
  // Generate realistic anxiety data - one point per day
  const generateData = () => {
    const data = [];
    const labels = [];
    const now = new Date();
    
    // Create data points that mimic the pattern from the image - 15 days
    const basePattern = [65, 63, 61, 59, 62, 68, 72, 69, 65, 78, 82, 79, 75, 68, 64];
    
    for (let i = 14; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i); // One day back
      date.setHours(12, 0, 0, 0); // Set to noon for consistency
      
      // Format date as "May 23, 12:00"
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      
      labels.push(`${month} ${day}, 12:00`);
      
      // Use base pattern with some random variation
      const baseValue = basePattern[14 - i] || 65;
      const variation = (Math.random() - 0.5) * 4; // ±2 variation
      const anxietyLevel = Math.max(47, Math.min(88, baseValue + variation));
      data.push(Math.round(anxietyLevel * 100) / 100);
    }
    
    return { labels, data };
  };

  const { labels, data: anxietyData } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Anxiety Level',
        data: anxietyData,
        borderColor: '#6D64D3', // Brand purple color
        backgroundColor: 'rgba(109, 100, 211, 0.1)', // Light purple fill
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Smooth curves
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
        callbacks: {
          title: function(context: any) {
            // Format: "May 27, 2025, 12:00:00 PM"
            const label = context[0].label;
            const [datePart] = label.split(', ');
            return `${datePart}, 2025, 12:00:00 PM`;
          },
          label: function(context: any) {
            return `Value: ${context.parsed.y.toFixed(2)}`;
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
          maxTicksLimit: 8,
        },
      },
      y: {
        display: true,
        min: 47,
        max: 88,
        grid: {
          color: 'rgba(5, 44, 88, 0.1)',
          borderDash: [5, 5],
        },
        ticks: {
          color: 'rgba(5, 44, 88, 0.6)',
          font: {
            size: 12,
          },
          stepSize: 10,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AnxietyChart; 