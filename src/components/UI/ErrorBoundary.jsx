import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({ message, onRetry }) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        textAlign: 'center',
        border: '1px solid rgba(239, 68, 68, 0.3)',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AlertTriangle color="#ef4444" size={28} />
      </div>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Something went wrong</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
          {message || 'An unexpected error occurred while loading data.'}
        </p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary" style={{ marginTop: '8px' }}>
          <RefreshCcw size={16} /> Retry
        </button>
      )}
    </div>
  );
}
