import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export default function ISSSpeedChart({ speedHistory }) {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.2)';
  
  if (!speedHistory || speedHistory.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '24px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Waiting for speed data...</p>
      </div>
    );
  }

  const data = {
    labels: speedHistory.map(d => d.time),
    datasets: [
      {
        label: 'Speed (km/h)',
        data: speedHistory.map(d => d.speed),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#8b5cf6',
        pointRadius: 3,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(30, 34, 53, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#f1f5f9' : '#0f172a',
        bodyColor: isDark ? '#94a3b8' : '#475569',
        borderColor: '#6366f1',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y.toLocaleString()} km/h`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, maxTicksLimit: 8 },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor },
        suggestedMin: 27000,
        suggestedMax: 28000,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  return (
    <div className="glass-card" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>ISS Speed Velocity</h3>
      <div style={{ flex: 1, position: 'relative' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
