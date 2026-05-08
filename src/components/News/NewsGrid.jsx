import NewsCard from './NewsCard';
import { NewsCardSkeleton } from '../UI/LoadingSkeletons';
import ErrorBoundary from '../UI/ErrorBoundary';

export default function NewsGrid({ articles, loading, error, onRetry }) {
  if (error) {
    return (
      <div style={{ marginTop: '24px' }}>
        <ErrorBoundary message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '24px',
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>No articles found</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Try adjusting your search or check back later.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        marginTop: '24px',
      }}
    >
      {articles.map((article, idx) => (
        <NewsCard key={`${article.url}-${idx}`} article={article} />
      ))}
    </div>
  );
}
