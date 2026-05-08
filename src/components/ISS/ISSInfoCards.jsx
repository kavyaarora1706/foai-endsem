import { Compass, Zap, MapPin, Clock } from 'lucide-react';
import { StatCardSkeleton } from '../UI/LoadingSkeletons';

export default function ISSInfoCards({ currentPos, speed, nearestLocation, loading, lastUpdated }) {
  if (loading && !currentPos) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  if (!currentPos) return null;

  const cards = [
    {
      title: 'Coordinates',
      value: `${currentPos.lat.toFixed(2)}°, ${currentPos.lon.toFixed(2)}°`,
      subtitle: 'Latitude, Longitude',
      icon: Compass,
      color: '#3b82f6',
    },
    {
      title: 'Current Speed',
      value: speed > 0 ? `${Math.round(speed).toLocaleString()} km/h` : 'Calculating...',
      subtitle: 'Relative to Earth surface',
      icon: Zap,
      color: '#eab308',
    },
    {
      title: 'Nearest Region',
      value: nearestLocation || 'Unknown',
      subtitle: 'Approximate location',
      icon: MapPin,
      color: '#22c55e',
    },
    {
      title: 'Last Updated',
      value: lastUpdated ? new Date(lastUpdated * 1000).toLocaleTimeString() : '--:--',
      subtitle: 'Local time',
      icon: Clock,
      color: '#ec4899',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {cards.map((card, idx) => (
        <div key={idx} className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: `rgba(${hexToRgb(card.color)}, 0.15)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <card.icon size={18} color={card.color} />
            </div>
            <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>{card.title}</h4>
          </div>
          <div style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px 0', fontFamily: 'Space Grotesk, sans-serif' }}>
            {card.value}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
}

// Helper to convert hex to rgb for rgba background
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
}
