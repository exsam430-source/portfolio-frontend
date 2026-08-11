import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TbBriefcase, TbCircleCheck, TbCalendar } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useExperiences } from '../../context';
import { fadeUp, viewportOnce } from '../../utils/motion';

export default function Experience() {
  const experiences = useExperiences();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 55%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Journey"
          title="Experience &"
          highlight="growth"
          subtitle="How I got from writing my first line of JavaScript to shipping full-stack products for clients."
        />
        <h2 id="experience-heading" className="sr-only">Experience timeline</h2>

        <div ref={containerRef} className="relative mt-14 pl-10 sm:pl-0">
          {/* Track line */}
          <div
            aria-hidden="true"
            className="absolute left-[0.9375rem] top-2 bottom-2 w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{ background: 'var(--border)' }}
          />
          {/* Animated fill line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute left-[0.9375rem] top-2 bottom-2 w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
            css={{
              background:
                'linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))',
            }}
          >
            <div
              style={{
                width: '2px',
                height: '100%',
                background:
                  'linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))',
                boxShadow: '0 0 8px var(--primary)',
              }}
            />
          </motion.div>

          <ol className="space-y-8 sm:space-y-12">
            {experiences.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={item.id} className="relative sm:grid sm:grid-cols-2 sm:gap-10">
                  {/* Node */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={viewportOnce}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 18,
                    }}
                    className="absolute -left-10 top-6 z-10 grid size-8 place-items-center rounded-full text-white sm:left-1/2 sm:-translate-x-1/2"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--primary), var(--secondary))',
                      boxShadow: '0 0 15px rgba(108,99,255,0.6)',
                    }}
                    aria-hidden="true"
                  >
                    <TbBriefcase size={14} />
                    {item.current && (
                      <span
                        className="absolute inset-0 rounded-full animate-pulse-ring"
                        style={{ background: 'var(--primary)' }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.span>

                  {/* Card */}
                  <motion.article
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    whileHover={{ y: -5 }}
                    className={`card card-gradient-edge p-6 ${
                      isLeft
                        ? 'sm:col-start-1 sm:mr-6'
                        : 'sm:col-start-2 sm:ml-6'
                    }`}
                  >
                    {/* Period + Current badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="chip inline-flex items-center gap-1.5 !py-1"
                        style={{
                          background:
                            'color-mix(in oklab, var(--primary) 12%, transparent)',
                          borderColor:
                            'color-mix(in oklab, var(--primary) 30%, transparent)',
                          color: 'var(--primary-soft)',
                        }}
                      >
                        <TbCalendar size={12} aria-hidden="true" />
                        {item.period}
                      </span>
                      {item.current && (
                        <span
                          className="chip !py-1 flex items-center gap-1"
                          style={{
                            background: 'rgba(67,233,123,0.12)',
                            borderColor: 'rgba(67,233,123,0.4)',
                            color: 'var(--accent)',
                          }}
                        >
                          <span
                            className="size-1.5 rounded-full"
                            style={{ background: 'var(--accent)' }}
                            aria-hidden="true"
                          />
                          Current
                        </span>
                      )}
                    </div>

                    <h3
                      className="mt-3.5 text-lg font-bold leading-snug"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.role}
                    </h3>
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: 'var(--primary-soft)' }}
                    >
                      {item.company}
                    </p>

                    <p
                      className="mt-3 text-[0.875rem] leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-[0.8125rem]"
                          style={{ color: 'var(--text)', opacity: 0.8 }}
                        >
                          <TbCircleCheck
                            size={15}
                            className="mt-0.5 shrink-0"
                            style={{ color: 'var(--accent)' }}
                            aria-hidden="true"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <li
                          key={t}
                          className="chip chip-muted !py-1 !text-[0.6875rem]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}