import { motion } from 'framer-motion';
import {
  TbDownload, TbBriefcase, TbUsersGroup, TbWorld,
  TbCircleCheck, TbMapPin, TbMail, TbCode,
} from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import Counter from './Counter';
import { useProfile, useStats } from '../../context';
import { fadeUp, slideLeft, slideRight, stagger, viewportOnce } from '../../utils/motion';

const PROFILE_IMAGE = '/profile.jpg';

const buildHighlights = (profile) => [
  {
    icon: TbBriefcase,
    label: `${profile.yearsExperience}+ Years Experience`,
    detail: 'Real products, shipped live',
    accent: 'var(--primary)',
  },
  {
    icon: TbUsersGroup,
    label: 'Development Head',
    detail: 'Leading a software team',
    accent: 'var(--secondary)',
  },
  {
    icon: TbWorld,
    label: 'Open to Remote Work',
    detail: 'Full-time, contract & freelance',
    accent: 'var(--accent)',
  },
];

export default function About() {
  const profile = useProfile();
  const stats = useStats();
  const HIGHLIGHTS = buildHighlights(profile);

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="About Me"
          title="Turning ideas into"
          highlight="working software"
          subtitle="A quick introduction to how I work and what I bring to a team or project."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* ── Photo Column ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28"
          >
            {/* Ambient glow */}
            <div
              className="absolute -inset-3 rounded-[2rem] blur-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(255,101,132,0.15), rgba(67,233,123,0.1))',
              }}
              aria-hidden="true"
            />

            <div className="card card-neon relative overflow-hidden !rounded-[1.75rem] p-2.5">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]"
                style={{
                  background: `linear-gradient(135deg, var(--surface), var(--surface-2))`,
                }}
              >
                <img
                  src={PROFILE_IMAGE}
                  alt={`${profile.name} — ${profile.title}`}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={800}
                  className="size-full object-cover object-[center_20%]"
                />

                {/* Bottom fade */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)',
                  }}
                  aria-hidden="true"
                />

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.45 }}
                  className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                  style={{
                    background: 'color-mix(in oklab, var(--surface) 60%, transparent)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid color-mix(in oklab, #ffffff 8%, transparent)',
                  }}
                >
                  <span className="relative flex size-2" aria-hidden="true">
                    <span
                      className="absolute inline-flex size-full rounded-full animate-pulse-ring"
                      style={{ background: 'var(--accent)' }}
                    />
                    <span
                      className="relative inline-flex size-2 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  </span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                    {profile.availabilityShort}
                  </span>
                  <span
                    className="ml-auto inline-flex items-center gap-1 text-[0.6875rem]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <TbMapPin size={12} aria-hidden="true" /> Swat, PK
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Code decoration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 top-12 hidden lg:block"
            >
              <div
                className="rounded-xl px-3 py-2 text-[0.65rem] font-mono"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--primary)',
                  boxShadow: '0 0 15px rgba(108,99,255,0.3)',
                }}
              >
                <TbCode size={14} className="inline mr-1" />
                const dev = "MA"
              </div>
            </motion.div>
          </motion.div>

          {/* ── Bio Column ── */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h3
              id="about-heading"
              variants={slideRight}
              className="text-2xl font-bold sm:text-[1.75rem]"
              style={{ color: 'var(--text)' }}
            >
              {profile.role} at{' '}
              <span className="gradient-text">{profile.company}</span>
            </motion.h3>

            <div className="mt-5 space-y-4">
              {profile.aboutBio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[0.9375rem] leading-relaxed sm:text-base"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Highlights */}
            <motion.ul variants={stagger(0.09)} className="mt-8 grid gap-3 sm:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, label, detail, accent }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="card !rounded-xl p-4 group"
                >
                  <span
                    className="mb-3 grid size-9 place-items-center rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `color-mix(in oklab, ${accent} 15%, transparent)`,
                      color: accent,
                    }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <p
                    className="text-[0.8125rem] font-bold leading-snug"
                    style={{ color: 'var(--text)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="mt-0.5 text-[0.6875rem]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {detail}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            {/* Counters */}
            <motion.div
              variants={fadeUp}
              className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <Counter key={stat.id} {...stat} />
              ))}
            </motion.div>

            {/* Values */}
            <motion.div variants={fadeUp} className="mt-9">
              <h4
                className="mb-4 text-sm font-bold uppercase tracking-[0.16em]"
                style={{ color: 'var(--text-muted)' }}
              >
                How I approach work
              </h4>
              <ul className="grid gap-3 sm:grid-cols-2">
                {profile.values.map((value) => (
                  <li key={value.title} className="flex gap-2.5">
                    <TbCircleCheck
                      className="mt-0.5 shrink-0"
                      size={17}
                      style={{ color: 'var(--accent)' }}
                      aria-hidden="true"
                    />
                    <div>
                      <p
                        className="text-[0.875rem] font-semibold"
                        style={{ color: 'var(--text)' }}
                      >
                        {value.title}
                      </p>
                      <p
                        className="mt-0.5 text-[0.8125rem] leading-relaxed"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {value.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <a
                href={profile.resumeUrl}
                download="Muhammad_Abdullah_CV.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary"
              >
                <TbDownload size={17} aria-hidden="true" />
                Download CV
              </a>
              <a href={profile.socials.email} className="btn btn-ghost">
                <TbMail size={17} aria-hidden="true" />
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}