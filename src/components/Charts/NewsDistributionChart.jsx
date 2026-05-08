import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NewsDistributionChart({ articles, onSourceClick, activeSource }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { labels, dataCounts, colors } = useMemo(() => {
    if (!articles || articles.length === 0) return { labels: [], dataCounts: [], colors: [] };

    // Group by source
    const sourceMap = {};
    articles.forEach(a => {
      const srcName = a.source?.name || 'Unknown';
      sourceMap[srcName] = (sourceMap[srcName] || 0) + 1;
    });

    // Sort by count descending and take top 5, group rest into "Other"
    const sorted = Object.entries(sourceMap).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5);
    const other = sorted.slice(5).reduce((acc, curr) => acc + curr[1], 0);

    const finalLabels = top.map(item => item[0]);
    const finalCounts = top.map(item => item[1]);

    if (other > 0) {
      finalLabels.push('Other');
      finalCounts.push(other);
    }

    // Dynamic colors based on active filter
    const palette = ['#6366f1', '#ec4899', '#8b5cf6', '#14b8a6', '#f59e0b', '#64748b'];
    
    const finalColors = finalLabels.map((label, idx) => {
      if (activeSource && label !== activeSource && label !== 'Other') {
        return isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.2)';
      }
      return palette[idx % palette.length];
    });

    return { labels: finalLabels, dataCounts: finalCounts, colors: finalColors };
  }, [articles, activeSource, isDark]);

  if (!labels.length) {
    return (
      <div className="glass-card" style={{ padding: '24px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No news data available.</p>
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        data: dataCounts,
        backgroundColor: colors,
        borderColor: isDark ? '#1e2235' : '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDark ? '#f1f5f9' : '#0f172a',
          usePointStyle: true,
          padding: 20,
          font: { family: 'Inter', size: 12 },
        },
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(30, 34, 53, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDark ? '#f1f5f9' : '#0f172a',
        bodyColor: isDark ? '#94a3b8' : '#475569',
        borderColor: '#6366f1',
        borderWidth: 1,
        padding: 10,
      },
    },
    onClick: (event, elements) => {
      if (!elements || elements.length === 0) return;
      const index = elements[0].index;
      const clickedLabel = labels[index];
      if (clickedLabel !== 'Other' && onSourceClick) {
        onSourceClick(clickedLabel);
      }
    },
    onHover: (event, elements) => {
      event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
    },
  };

  return (
    <div className="glass-card" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>News Sources</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>Click a segment to filter</p>
      <div style={{ flex: 1, position: 'relative' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
