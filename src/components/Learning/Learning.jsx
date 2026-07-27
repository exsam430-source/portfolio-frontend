import { motion } from 'framer-motion';
import { TbTargetArrow, TbCircleCheck, TbCircleDashed, TbArrowRight } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useLearning } from '../../context';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

const STATUS_STYLES = {
  'In Progress': 'border-primary/40 bg-primary/12 text-primary-soft',
  Planned: 'border-warning/40 bg-warning/12 text-warning',
};

export default function Learning() {
  const { items: learningItems, roadmap } = useLearning();

  return (
    <section id="learning" className="section !pt-0" aria-labelledby="learning-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Always Learning"
          title="What I'm"
          highlight="learning next"
          subtitle="The stack does not stand still, and neither do I. Here's what I'm actively adding to my toolkit."
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
            return (
              <motion.li
                key={item.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="card group relative overflow-hidden p-5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(110% 80% at 50% 0%, ${item.brand}14, transparent 70%)` }}
                />

                <div className="relative flex items-start gap-3.5">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.brand}18`, color: item.brand }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[0.9375rem] font-bold">{item.name}</h3>
                      <span
                        className={cn(
                          'shrink-0 rounded-full border px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider',
                          STATUS_STYLES[item.status],
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">{item.note}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="relative mt-4">
                  <div className="mb-1.5 flex justify-between text-[0.6875rem] font-medium text-muted">
                    <span>Progress</span>
                    <span className="tabular-nums">{item.progress}%</span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-white/7"
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
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                      className="block h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${item.brand}88, ${item.brand})` }}
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
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <TbTargetArrow size={20} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Career roadmap</h3>
              <p className="text-xs text-muted">Where I am now and where I'm heading.</p>
            </div>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((phase, i) => (
              <motion.li
                key={phase.phase}
                variants={fadeUp}
                className="relative rounded-xl border border-line bg-background/45 p-4"
              >
                {/* Connector arrow (desktop only) */}
                {i < roadmap.length - 1 && (
                  <TbArrowRight
                    size={16}
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-line lg:block"
                  />
                )}

                <div className="flex items-center gap-2">
                  {phase.done ? (
                    <TbCircleCheck size={17} className="text-success" aria-hidden="true" />
                  ) : (
                    <TbCircleDashed size={17} className="text-muted" aria-hidden="true" />
                  )}
                  <span className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-primary-soft">
                    {phase.phase}
                  </span>
                </div>

                <h4 className="mt-2.5 text-[0.9375rem] font-bold">{phase.title}</h4>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">{phase.detail}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
