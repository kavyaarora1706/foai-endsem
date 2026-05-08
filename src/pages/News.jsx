import { useOutletContext } from 'react-router-dom';
import NewsGrid from '../components/News/NewsGrid';
import SearchBar from '../components/News/SearchBar';
import SortControls from '../components/News/SortControls';
import { RefreshCcw, FilterX } from 'lucide-react';

export default function News() {
  const { newsData } = useOutletContext();
  const {
    articles,
    loading,
    error,
    search,
    setSearch,
    sortBy,
    setSortBy,
    refresh,
  } = newsData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px' }}>Space & Science News</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)' }}>Latest updates from around the world</p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="btn-primary"
          style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh News'}
        </button>
      </div>

      <div className="glass-card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 300px' }}>
          <SearchBar onSearch={setSearch} initialValue={search} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ height: '24px', width: '1px', background: 'var(--border)' }} />
          <SortControls currentSort={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      <NewsGrid
        articles={articles}
        loading={loading}
        error={error}
        onRetry={refresh}
      />
      
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
