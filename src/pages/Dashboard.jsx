import { useOutletContext } from 'react-router-dom';
import ISSInfoCards from '../components/ISS/ISSInfoCards';
import ISSMap from '../components/ISS/ISSMap';
import AstronautList from '../components/ISS/AstronautList';
import NewsGrid from '../components/News/NewsGrid';

export default function Dashboard() {
  const { issData: issContext, newsData } = useOutletContext();
  const { issData, positions, speed, astronauts, loading: issLoading } = issContext;
  const { articles, loading: newsLoading, error: newsError, refresh: loadNews } = newsData;

  // Show only top 4 news articles on dashboard
  const topNews = articles.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px' }}>Dashboard Overview</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>Live tracking and latest headlines</p>
        </div>
      </div>

      <ISSInfoCards
        currentPos={issData}
        speed={speed}
        nearestLocation="Tracking..."
        loading={issLoading}
        lastUpdated={issData?.timestamp / 1000}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ gridColumn: '1 / -1', '@media (min-width: 1024px)': { gridColumn: 'span 2' } }}>
          <ISSMap currentPos={issData} positions={positions} />
        </div>
        <div>
          <AstronautList astronauts={astronauts?.people || []} />
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '22px' }}>Top Headlines</h2>
          <a href="/news" className="btn-ghost" style={{ fontSize: '13px', textDecoration: 'none' }}>
            View All News
          </a>
        </div>
        <NewsGrid
          articles={topNews}
          loading={newsLoading}
          error={newsError}
          onRetry={loadNews}
        />
      </div>
    </div>
  );
}
