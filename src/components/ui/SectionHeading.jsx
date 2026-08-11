import { motion } from 'framer-motion';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

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
        <motion.div variants={fadeUp} className="mb-5 flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
            style={{
              background: 'color-mix(in oklab, var(--primary) 12%, transparent)',
              border: '1px solid color-mix(in oklab, var(--primary) 30%, transparent)',
              color: 'var(--primary-soft)',
            }}
          >
            <span
              className="size-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--primary)' }}
              aria-hidden="true"
            />
            {eyebrow}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={fadeUp}
        className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]"
        style={{ color: 'var(--text)' }}
      >
        {title}{' '}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </motion.h2>

      {/* Animated underline */}
      <motion.div
        variants={fadeUp}
        className={cn(
          'mt-5 h-[2px] w-24 rounded-full',
          centered && 'mx-auto',
        )}
        style={{
          background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          boxShadow: '0 0 10px var(--primary)',
        }}
        aria-hidden="true"
      />

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mt-5 text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}