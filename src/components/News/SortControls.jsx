import { SlidersHorizontal } from 'lucide-react';

export default function SortControls({ currentSort, onSortChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <SlidersHorizontal size={18} color="var(--text-secondary)" />
      <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>Sort by:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="input-field"
        style={{
          width: '120px',
          padding: '8px 12px',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '16px',
        }}
      >
        <option value="date">Date</option>
        <option value="source">Source</option>
      </select>
    </div>
  );
}
