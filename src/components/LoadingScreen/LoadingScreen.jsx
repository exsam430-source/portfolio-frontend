import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../../context';

/**
 * Full-screen intro: animated monogram reveal, name wipe-in,
 * progress bar, then a smooth fade-out handled by AnimatePresence in App.
 */
export default function LoadingScreen({ onComplete }) {
  const profile = useProfile();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setProgress(100);
      const t = setTimeout(onComplete, 220);
      return () => clearTimeout(t);
    }

    let frame;
    const start = performance.now();
    const DURATION = 1750;

    const tick = (now) => {
      const elapsed = now - start;
      // Ease-out so it feels fast at first, then settles at 100%.
      const pct = Math.min(100, (1 - (1 - elapsed / DURATION) ** 3) * 100);
      setProgress(pct);

      if (elapsed < DURATION) frame = requestAnimationFrame(tick);
      else setTimeout(onComplete, 380);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  const letters = profile.name.split('');

  return (
    <motion.div
      key="loading-screen"
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background noise"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[110px]"
      />

      {/* Monogram */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <span className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-secondary blur-xl opacity-55" aria-hidden="true" />
        <span className="relative grid size-20 place-items-center rounded-3xl border border-white/10 bg-gradient-to-br from-primary to-secondary text-3xl font-extrabold text-white shadow-glow">
          {profile.initials}
        </span>
      </motion.div>

      {/* Name — staggered letter reveal */}
      <div className="flex flex-wrap justify-center px-6" aria-hidden="true">
        {letters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.35 + i * 0.045, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-muted"
      >
        {profile.title}
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.95, duration: 0.5 }}
        className="mt-10 w-56 sm:w-72"
      >
        <div
          className="h-1 overflow-hidden rounded-full bg-white/8"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2.5 flex justify-between text-[0.6875rem] font-medium tabular-nums text-muted">
          <span>Loading experience</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
