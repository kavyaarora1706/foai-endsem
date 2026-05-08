import { useOutletContext, useNavigate } from 'react-router-dom';
import ISSSpeedChart from '../components/Charts/ISSSpeedChart';
import NewsDistributionChart from '../components/Charts/NewsDistributionChart';
import ISSMap from '../components/ISS/ISSMap';

export default function Charts() {
  const { issData: issContext, newsData } = useOutletContext();
  const { speedHistory, issData, positions } = issContext;
  const { articles } = newsData;
  const navigate = useNavigate();

  const onSourceClick = (source) => {
    // Navigate to news page when a source is clicked to show results
    navigate('/news');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '28px' }}>Interactive Analytics</h1>
        <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>Visualizing telemetry and information</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <ISSSpeedChart speedHistory={speedHistory} />
        </div>
        
        <div>
          <NewsDistributionChart
            articles={articles}
            activeSource={null}
            onSourceClick={onSourceClick}
          />
        </div>

        <div>
          <div className="glass-card" style={{ padding: '24px', height: '350px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Live Trajectory Minimap</h3>
            <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden' }}>
              <ISSMap currentPos={issData} positions={positions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
