import { useOutletContext } from 'react-router-dom';
import ISSInfoCards from '../components/ISS/ISSInfoCards';
import ISSMap from '../components/ISS/ISSMap';
import AstronautList from '../components/ISS/AstronautList';
import { RefreshCcw } from 'lucide-react';

export default function ISS() {
  const { issData: issContext } = useOutletContext();
  const { issData, positions, speed, astronauts, loading, refresh } = issContext;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px' }}>Live ISS Tracker</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>Real-time telemetry and mapping</p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="btn-primary"
          style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh Position'}
        </button>
      </div>

      <ISSInfoCards
        currentPos={issData}
        speed={speed}
        nearestLocation="Tracking..."
        loading={loading}
        lastUpdated={issData?.timestamp / 1000}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div style={{ gridColumn: '1 / -1', '@media (min-width: 1024px)': { gridColumn: 'span 2' } }}>
          <div className="glass-card" style={{ padding: '24px', height: '100%' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Global Trajectory</h3>
            <ISSMap currentPos={issData} positions={positions} />
          </div>
        </div>
        <div>
          <AstronautList astronauts={astronauts?.people || []} />
        </div>
      </div>
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
