import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TbBriefcase, TbCircleCheck, TbCalendar } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import { useExperiences } from '../../context';
import { fadeUp, viewportOnce } from '../../utils/motion';

/**
 * Vertical timeline whose connector line "draws" itself as the section
 * scrolls through the viewport (scroll-linked scaleY).
 */
export default function Experience() {
  const experiences = useExperiences();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 55%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

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
          {/* Track */}
          <div
            aria-hidden="true"
            className="absolute left-[0.9375rem] top-2 bottom-2 w-px bg-line/60 sm:left-1/2 sm:-translate-x-1/2"
          />
          {/* Animated draw */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute left-[0.9375rem] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary via-secondary to-accent sm:left-1/2 sm:-translate-x-1/2"
          />

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
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="absolute -left-10 top-6 z-10 grid size-8 place-items-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-secondary text-white sm:left-1/2 sm:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <TbBriefcase size={14} />
                    {item.current && (
                      <span className="absolute inset-0 rounded-full bg-primary/60 animate-pulse-ring" />
                    )}
                  </motion.span>

                  {/* Card */}
                  <motion.article
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className={`card card-gradient-edge p-6 ${isLeft ? 'sm:col-start-1 sm:mr-6' : 'sm:col-start-2 sm:ml-6'}`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip !py-1 inline-flex items-center gap-1.5">
                        <TbCalendar size={12} aria-hidden="true" />
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="chip !border-success/40 !bg-success/12 !py-1 !text-success">
                          <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3.5 text-lg font-bold leading-snug">{item.role}</h3>
                    <p className="mt-1 text-sm font-medium text-primary-soft">{item.company}</p>

                    <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">{item.description}</p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[0.8125rem] text-content/80">
                          <TbCircleCheck size={15} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <li key={t} className="chip chip-muted !py-1 !text-[0.6875rem]">{t}</li>
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
