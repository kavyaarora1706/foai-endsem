import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Satellite, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onMenuToggle, menuOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        background: 'rgba(15,17,23,0.85)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      className={theme === 'light' ? 'light' : ''}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={onMenuToggle}
          className="btn-ghost"
          style={{ padding: '8px', display: 'none' }}
          id="menu-toggle-btn"
          aria-label="Toggle sidebar"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Satellite size={18} color="white" />
        </div>
        <div>
          <div
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            ISS &amp; News AI
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Live Dashboard
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="pulse-dot" />
          <span style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>LIVE</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn-ghost"
          style={{ padding: '8px 12px' }}
          aria-label="Toggle theme"
          id="theme-toggle-btn"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #menu-toggle-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
