/* Skeleton loader block */
export function SkeletonBlock({ width = '100%', height = '20px', borderRadius = '8px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

/* Skeleton for a news card */
export function NewsCardSkeleton() {
  return (
    <div
      className="glass-card"
      style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <SkeletonBlock height="180px" borderRadius="16px 16px 0 0" />
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SkeletonBlock height="14px" width="60%" />
        <SkeletonBlock height="20px" />
        <SkeletonBlock height="20px" width="85%" />
        <SkeletonBlock height="14px" width="75%" />
        <SkeletonBlock height="14px" width="90%" />
        <SkeletonBlock height="36px" width="40%" borderRadius="10px" />
      </div>
    </div>
  );
}

/* Skeleton for ISS stat card */
export function StatCardSkeleton() {
  return (
    <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <SkeletonBlock height="14px" width="50%" />
      <SkeletonBlock height="32px" width="70%" />
      <SkeletonBlock height="12px" width="40%" />
    </div>
  );
}

/* Full-page loading spinner */
export function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '3px solid var(--border)',
          borderTop: '3px solid var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
