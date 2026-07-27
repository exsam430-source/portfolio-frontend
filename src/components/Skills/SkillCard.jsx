import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/motion';

/**
 * Single skill tile: brand-coloured icon with a hover glow + bounce,
 * plus an animated proficiency bar that fills when scrolled into view.
 */
export default function SkillCard({ name, icon: Icon, brand, level }) {
  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ y: -7 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="card group relative overflow-hidden !rounded-xl p-4"
    >
      {/* Hover wash in the brand colour */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, ${brand}1a, transparent 72%)` }}
      />

      <div className="relative flex items-center gap-3">
        <motion.span
          whileHover={{ scale: 1.16, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 420, damping: 12 }}
          className="grid size-10 shrink-0 place-items-center rounded-lg transition-shadow duration-300"
          style={{ background: `${brand}18`, color: brand, boxShadow: `0 0 0 0 ${brand}00` }}
        >
          <span className="transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_9px_currentColor)]">
            <Icon size={21} aria-hidden="true" />
          </span>
        </motion.span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8125rem] font-semibold" title={name}>{name}</p>
          <p className="text-[0.6875rem] tabular-nums text-muted">{level}% proficiency</p>
        </div>
      </div>

      {/* Proficiency bar */}
      <div
        className="relative mt-3.5 h-1.5 overflow-hidden rounded-full bg-white/7"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${brand}99, ${brand})` }}
        />
      </div>
    </motion.li>
  );
}
