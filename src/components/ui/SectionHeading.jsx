import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

/**
 * Consistent section header: eyebrow label, gradient title, subtitle
 * and an animated underline. Used by every section on the page.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  className,
}) {
  const centered = align === 'center';

  return (
    <motion.header
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className="eyebrow mb-5">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={fadeUp}
        className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]"
      >
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </motion.h2>

      <motion.div
        variants={fadeUp}
        className={cn('mt-5 h-px w-24 bg-gradient-to-r from-primary to-secondary', centered && 'mx-auto')}
        aria-hidden="true"
      />

      {subtitle && (
        <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
