import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/AppLayout';

import Dashboard from './pages/Dashboard';
import ISS from './pages/ISS';
import News from './pages/News';
import Charts from './pages/Charts';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="iss" element={<ISS />} />
            <Route path="news" element={<News />} />
            <Route path="charts" element={<Charts />} />
          </Route>
        </Routes>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
            },
          }}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
