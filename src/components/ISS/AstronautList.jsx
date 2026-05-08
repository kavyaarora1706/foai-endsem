import { Users } from 'lucide-react';

export default function AstronautList({ astronauts }) {
  return (
    <div className="glass-card" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(99,102,241,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={20} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Crew on Board</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Currently in space</p>
          </div>
        </div>
        <div
          style={{
            background: 'var(--accent)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '14px',
          }}
        >
          {astronauts.length} total
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
        {astronauts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '20px' }}>No crew data available.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {astronauts.map((astro, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--accent-light)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {astro.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{astro.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{astro.craft}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
