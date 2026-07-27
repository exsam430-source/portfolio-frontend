import { useEffect } from 'react';
import { useUI } from '../context';

/**
 * Highlights the navbar link matching the section currently in view.
 * Uses a single IntersectionObserver (cheap) rather than scroll listeners,
 * and writes the result into UIContext so the navbar can react.
 *
 * @param {string[]} sectionIds ids of the <section> elements to observe
 */
export default function useScrollSpy(sectionIds) {
  const { setActiveSection } = useUI();

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        if (visible.size) {
          // Pick the section occupying the most viewport space.
          const [topId] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
          setActiveSection(topId);
        }
      },
      {
        // Ignore the area behind the fixed navbar.
        rootMargin: '-88px 0px -55% 0px',
        threshold: [0.15, 0.35, 0.6, 0.85],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, setActiveSection]);
}
