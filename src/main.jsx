import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import { AppProviders } from './context';
import './index.css';

/* Toast styling matched to the dark-premium design system. */
const toastOptions = {
  duration: 4200,
  style: {
    background: 'rgba(30, 41, 59, 0.92)',
    color: '#F8FAFC',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '0.875rem',
    padding: '0.8125rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    backdropFilter: 'blur(14px)',
    boxShadow: '0 18px 45px -20px rgba(0,0,0,0.9)',
    maxWidth: '26rem',
  },
  success: { iconTheme: { primary: '#10B981', secondary: '#0F172A' } },
  error: { iconTheme: { primary: '#EF4444', secondary: '#0F172A' }, duration: 5500 },
  loading: { iconTheme: { primary: '#3B82F6', secondary: '#0F172A' } },
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Context API layer: PortfolioProvider (data) + UIProvider (state) */}
      <AppProviders>
        <App />
        <Toaster
          position="bottom-right"
          gutter={10}
          containerStyle={{ bottom: 88, right: 20 }}
          toastOptions={toastOptions}
        />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
