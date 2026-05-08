import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './UI/Navbar';
import Sidebar from './UI/Sidebar';
import Chatbot from './Chatbot/Chatbot';
import { useISS } from '../hooks/useISS';
import { useNews } from '../hooks/useNews';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const issData = useISS();
  const newsData = useNews();

  const dashboardContext = {
    issData: issData.issData,
    astronauts: issData.astronauts.people,
    newsArticles: newsData.articles,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)} />
      
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        
        <main
          style={{
            flex: 1,
            padding: '24px',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          <Outlet context={{ issData, newsData }} />
        </main>
      </div>

      <Chatbot dashboardContext={dashboardContext} />
    </div>
  );
}
