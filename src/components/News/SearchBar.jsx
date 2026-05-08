import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
      <Search
        size={18}
        color="var(--text-secondary)"
        style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
      />
      <input
        type="text"
        placeholder="Search news articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-field"
        style={{ paddingLeft: '44px', borderRadius: '12px' }}
      />
    </div>
  );
}
