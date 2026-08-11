import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { TbArrowUp } from 'react-icons/tb';
import { scrollToTop } from '../../utils/helpers';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 18 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 340, damping: 24 }}
          aria-label="Scroll back to top"
          className="group fixed bottom-6 right-5 z-40 grid size-12 place-items-center rounded-full border transition-colors sm:bottom-8 sm:right-8"
          style={{
            background:
              'color-mix(in oklab, var(--surface) 85%, transparent)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.color = 'var(--primary)';
            e.currentTarget.style.boxShadow =
              '0 0 20px rgba(108,99,255,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
          }}
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <circle
              cx="24" cy="24" r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ color: 'rgba(255,255,255,0.08)' }}
            />
            <motion.circle
              cx="24" cy="24" r="22"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              stroke="url(#btt-gradient)"
              style={{ pathLength: progress }}
            />
            <defs>
              <linearGradient id="btt-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
            </defs>
          </svg>

          <TbArrowUp
            size={19}
            className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}