import { motion } from 'framer-motion';
import {
  TbTargetArrow, TbCircleCheck, TbCircleDashed, TbArrowRight,
} from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useLearning } from '../../context';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

const STATUS_STYLES = {
  'In Progress': {
    bg: 'rgba(108,99,255,0.12)',
    border: 'rgba(108,99,255,0.4)',
    color: 'var(--primary-soft)',
  },
  Planned: {
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.4)',
    color: '#f59e0b',
  },
};

export default function Learning() {
  const { items: learningItems, roadmap } = useLearning();

  return (
    <section
      id="learning"
      className="section !pt-0"
      aria-labelledby="learning-heading"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Always Learning"
          title="What I'm"
          highlight="learning next"
          subtitle="The stack does not stand still, and neither do I."
        />
        <h2 id="learning-heading" className="sr-only">Currently learning</h2>

        {/* Learning grid */}
        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {learningItems.map((item) => {
            const Icon = item.icon;
            const statusStyle = STATUS_STYLES[item.status] || STATUS_STYLES['Planned'];
            return (
              <motion.li
                key={item.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="card group relative overflow-hidden p-5"
              >
                {/* Hover wash */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(110% 80% at 50% 0%, ${item.brand}14, transparent 70%)`,
                  }}
                />

                <div className="relative flex items-start gap-3.5">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${item.brand}18`,
                      color: item.brand,
                      boxShadow: `0 0 15px ${item.brand}30`,
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="text-[0.9375rem] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {item.name}
                      </h3>
                      <span
                        className="shrink-0 rounded-full border px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider"
                        style={{
                          background: statusStyle.bg,
                          borderColor: statusStyle.border,
                          color: statusStyle.color,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p
                      className="mt-1.5 text-[0.75rem] leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.note}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative mt-4">
                  <div
                    className="mb-1.5 flex justify-between text-[0.6875rem] font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span>Progress</span>
                    <span className="tabular-nums">{item.progress}%</span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                    role="progressbar"
                    aria-valuenow={item.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.name} learning progress`}
                  >
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 1.1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15,
                      }}
                      className="block h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${item.brand}88, ${item.brand})`,
                        boxShadow: `0 0 8px ${item.brand}60`,
                      }}
                    />
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Career roadmap */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="card card-gradient-edge mt-8 p-6 sm:p-8"
        >
          <div className="mb-7 flex items-center gap-3">
            <span
              className="grid size-10 place-items-center rounded-xl text-white"
              style={{
                background:
                  'linear-gradient(135deg, var(--primary), var(--secondary))',
                boxShadow: '0 0 15px rgba(108,99,255,0.5)',
              }}
            >
              <TbTargetArrow size={20} aria-hidden="true" />
            </span>
            <div>
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--text)' }}
              >
                Career roadmap
              </h3>
              <p
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Where I am now and where I'm heading.
              </p>
            </div>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((phase, i) => (
              <motion.li
                key={phase.phase}
                variants={fadeUp}
                className="relative rounded-xl border p-4"
                style={{
                  background: 'color-mix(in oklab, var(--bg) 45%, transparent)',
                  borderColor: phase.done
                    ? 'color-mix(in oklab, var(--primary) 30%, transparent)'
                    : 'var(--border)',
                }}
              >
                {/* Connector arrow */}
                {i < roadmap.length - 1 && (
                  <TbArrowRight
                    size={16}
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block"
                    style={{ color: 'var(--border)' }}
                  />
                )}

                <div className="flex items-center gap-2">
                  {phase.done ? (
                    <TbCircleCheck
                      size={17}
                      style={{ color: 'var(--accent)' }}
                      aria-hidden="true"
                    />
                  ) : (
                    <TbCircleDashed
                      size={17}
                      style={{ color: 'var(--text-muted)' }}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="text-[0.625rem] font-bold uppercase tracking-[0.18em]"
                    style={{ color: 'var(--primary-soft)' }}
                  >
                    {phase.phase}
                  </span>
                </div>

                <h4
                  className="mt-2.5 text-[0.9375rem] font-bold"
                  style={{ color: 'var(--text)' }}
                >
                  {phase.title}
                </h4>
                <p
                  className="mt-1 text-[0.75rem] leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {phase.detail}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}