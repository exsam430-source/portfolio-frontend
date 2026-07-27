import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { useUI } from './context';

/* Route-level code splitting — these pages are rarely visited, so they
   should not weigh down the initial bundle. */
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Minimal fallback while a lazy route chunk downloads. */
function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <span className="size-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    </div>
  );
}

export default function App() {
  // Loading state + body scroll locking are owned by UIContext.
  const { isLoading, finishLoading } = useUI();

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={finishLoading} />}
      </AnimatePresence>

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
