import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../../context/ThemeContext';

// Custom ISS Icon
const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Component to handle automatic map recentering
function MapController({ center }) {
  const map = useMap();
  const prevCenterRef = useRef(center);

  useEffect(() => {
    // Only pan if the center has changed significantly to avoid jitter
    if (center[0] !== prevCenterRef.current[0] || center[1] !== prevCenterRef.current[1]) {
      map.setView(center, map.getZoom(), { animate: true, duration: 1.5 });
      prevCenterRef.current = center;
    }
  }, [center, map]);

  return null;
}

export default function ISSMap({ currentPos, positions }) {
  const { theme } = useTheme();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Default to a 0,0 center if no data yet
  const center = currentPos ? [currentPos.lat, currentPos.lon] : [0, 0];

  // Extract lat/lon pairs for the polyline trajectory
  const path = positions.map((p) => [p.lat, p.lon]);

  // Tile URL based on theme
  const tileUrl =
    theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  useEffect(() => {
    // Force a small delay to ensure container is sized before rendering map fully
    const timer = setTimeout(() => setMapLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mapLoaded) return <div className="skeleton" style={{ height: '400px', borderRadius: '16px' }} />;

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden' }} className="glass-card">
      <MapContainer
        center={center}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url={tileUrl} />

        {currentPos && (
          <Marker position={center} icon={issIcon}>
            <Tooltip permanent direction="top" offset={[0, -20]} className="iss-tooltip">
              <div style={{ textAlign: 'center', fontSize: '12px' }}>
                <strong>ISS Current</strong><br />
                {currentPos.lat.toFixed(4)}, {currentPos.lon.toFixed(4)}
              </div>
            </Tooltip>
          </Marker>
        )}

        {path.length > 1 && (
          <Polyline
            positions={path}
            color={theme === 'dark' ? '#8b5cf6' : '#4f46e5'}
            weight={3}
            opacity={0.7}
            dashArray="5, 10"
          />
        )}

        {currentPos && <MapController center={center} />}
      </MapContainer>

      <style>{`
        .iss-tooltip {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 6px 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .leaflet-tooltip-top:before {
          border-top-color: var(--border);
        }
      `}</style>
    </div>
  );
}
