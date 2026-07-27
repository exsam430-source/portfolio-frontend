import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Counts from 0 → `end` once the element scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve (not setInterval),
 * so it stays smooth and pauses automatically in background tabs.
 *
 * @returns {[number, React.RefObject]} current value and the ref to attach
 */
export default function useCountUp(end = 0, duration = 1800) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setValue(end);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const easeOutCubic = (t) => 1 - (1 - t) ** 3;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return [value, ref];
}
