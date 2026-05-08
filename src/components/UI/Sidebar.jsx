import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Satellite,
  Newspaper,
  BarChart2,
  X,
} from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/iss', label: 'ISS Tracker', icon: Satellite },
  { to: '/news', label: 'News', icon: Newspaper },
  { to: '/charts', label: 'Charts', icon: BarChart2 },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={onClose}
          style={{
            display: 'none',
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 39,
          }}
          id="sidebar-overlay"
        />
      )}

      <aside
        style={{
          width: '220px',
          minHeight: 'calc(100vh - 64px)',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          position: 'sticky',
          top: '64px',
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          flexShrink: 0,
          transition: 'transform 0.3s ease',
        }}
        id="main-sidebar"
      >
        {/* Mobile close button */}
        <div
          style={{
            display: 'none',
            justifyContent: 'flex-end',
            marginBottom: '8px',
          }}
          id="sidebar-close-row"
        >
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Version tag at bottom */}
        <div style={{ marginTop: 'auto', padding: '12px 4px' }}>
          <div
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              borderTop: '1px solid var(--border)',
              paddingTop: '12px',
            }}
          >
            ISS &amp; News AI v1.0
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          #main-sidebar {
            position: fixed !important;
            top: 64px;
            left: 0;
            z-index: 40;
            transform: ${open ? 'translateX(0)' : 'translateX(-100%)'};
            height: calc(100vh - 64px);
          }
          #sidebar-overlay { display: block !important; }
          #sidebar-close-row { display: flex !important; }
        }
      `}</style>
    </>
  );
}
