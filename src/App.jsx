import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import ErrorBoundary from './components/ui/ErrorBoundary';
import F1Loader from './components/LoadingScreen/F1Loader';
import { useUI } from './context';

const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function RouteFallback() {
  return (
    <div
      className="grid min-h-screen place-items-center"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="size-9 animate-spin rounded-full border-2 border-t-transparent"
          style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
        />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Loading…
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const { isLoading, finishLoading } = useUI();

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {isLoading && (
          <F1Loader key="f1-loader" onComplete={finishLoading} />
        )}
      </AnimatePresence>

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}