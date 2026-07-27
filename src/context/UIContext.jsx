import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════
 *  UIContext — Context API state layer
 * ═══════════════════════════════════════════════════════════════
 *  Cross-cutting UI state shared between distant components:
 *    • loading screen lifecycle
 *    • active section (scroll-spy → navbar highlight)
 *    • mobile menu open/closed
 *    • order-form service prefill (Services → OrderForm)
 *    • project detail modal
 *    • "already subscribed" memory (persisted)
 *
 *  This complements the Zustand store: Context handles React-tree
 *  UI state, Zustand persists the small slice worth remembering
 *  across visits.
 * ═══════════════════════════════════════════════════════════════
 */
const UIContext = createContext(null);

const STORAGE_KEY = 'portfolio-ui-memory';

/** Safely read persisted flags (private mode / disabled storage). */
const readMemory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

export function UIProvider({ children }) {
  const memory = readMemory();

  /* ── Loading screen ─────────────────────────────────────── */
  const [isLoading, setIsLoading] = useState(true);

  /* ── Navigation ─────────────────────────────────────────── */
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* ── Cross-section interactions ─────────────────────────── */
  const [prefilledService, setPrefilledService] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  /* ── Persisted memory ───────────────────────────────────── */
  const [hasSubscribed, setHasSubscribed] = useState(Boolean(memory.hasSubscribed));
  const [submittedOrders, setSubmittedOrders] = useState(memory.submittedOrders || []);

  /* Persist the small slice worth remembering. */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ hasSubscribed, submittedOrders }));
    } catch {
      /* storage unavailable — non-critical */
    }
  }, [hasSubscribed, submittedOrders]);

  /* Lock page scroll while the loader or a modal is visible. */
  useEffect(() => {
    const shouldLock = isLoading || Boolean(activeProject) || isMenuOpen;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLoading, activeProject, isMenuOpen]);

  /* Close the menu and modal on Escape. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setIsMenuOpen(false);
      setActiveProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const finishLoading = useCallback(() => setIsLoading(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const clearPrefilledService = useCallback(() => setPrefilledService(''), []);
  const openProject = useCallback((project) => setActiveProject(project), []);
  const closeProject = useCallback(() => setActiveProject(null), []);
  const markSubscribed = useCallback(() => setHasSubscribed(true), []);
  const addSubmittedOrder = useCallback(
    (reference) => setSubmittedOrders((prev) => [...prev, reference].slice(-5)),
    [],
  );

  const value = useMemo(
    () => ({
      // loading
      isLoading, setIsLoading, finishLoading,
      // navigation
      activeSection, setActiveSection,
      isMenuOpen, toggleMenu, closeMenu,
      // interactions
      prefilledService, setPrefilledService, clearPrefilledService,
      activeProject, openProject, closeProject,
      // memory
      hasSubscribed, markSubscribed,
      submittedOrders, addSubmittedOrder,
    }),
    [
      isLoading, finishLoading, activeSection, isMenuOpen, toggleMenu, closeMenu,
      prefilledService, clearPrefilledService, activeProject, openProject, closeProject,
      hasSubscribed, markSubscribed, submittedOrders, addSubmittedOrder,
    ],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

/**
 * Access shared UI state.
 * Throws a helpful error if used outside the provider.
 */
export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error('useUI() must be used inside a <UIProvider>. Wrap your app in main.jsx.');
  }
  return ctx;
}

export default UIContext;
