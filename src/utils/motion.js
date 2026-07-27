/* Reusable Framer Motion variants — keeps animation behaviour
   consistent across every section and avoids duplicated objects. */

export const EASE = [0.16, 1, 0.3, 1];

/** Standard scroll-reveal viewport config. */
export const viewportOnce = { once: true, amount: 0.2, margin: '-60px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -42 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 42 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

/** Parent wrapper that staggers its children. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Per-character/word hero text reveal. */
export const textReveal = {
  hidden: { opacity: 0, y: '55%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.35, ease: EASE } },
};
