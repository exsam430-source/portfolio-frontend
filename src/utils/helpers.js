/** Join conditional class names (tiny clsx replacement). */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Smoothly scroll to an element id, compensating for the fixed navbar.
 * Falls back to instant scrolling when the user prefers reduced motion.
 */
export const scrollToSection = (id, offset = 80) => {
  const target = document.getElementById(String(id).replace('#', ''));
  if (!target) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
};

export const scrollToTop = () => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
};

/** "12 Aug 2025" */
export const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Truncate text on a word boundary. */
export const truncate = (text = '', max = 140) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(' ', max))}…`;

/** Debounce (used by scroll/resize handlers). */
export const debounce = (fn, wait = 150) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

/** Detect touch devices to disable hover-only effects. */
export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);
