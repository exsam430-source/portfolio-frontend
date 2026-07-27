// frontend/src/components/About/About.jsx
import { motion } from 'framer-motion';
import {
  TbDownload, TbBriefcase, TbUsersGroup, TbWorld, TbCircleCheck, TbMapPin, TbMail,
} from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import Counter from './Counter';
import { useProfile, useStats } from '../../context';
import { fadeUp, slideLeft, slideRight, stagger, viewportOnce } from '../../utils/motion';

// 📸 Your profile image (place file at: frontend/public/profile.jpg)
const PROFILE_IMAGE = '/profile.jpg';

const buildHighlights = (profile) => [
  { icon: TbBriefcase, label: `${profile.yearsExperience}+ Years Experience`, detail: 'Real products, shipped live', accent: '#3B82F6' },
  { icon: TbUsersGroup, label: 'Development Head', detail: 'Leading a software team', accent: '#8B5CF6' },
  { icon: TbWorld, label: 'Open to Remote Work', detail: 'Full-time, contract & freelance', accent: '#10B981' },
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
          {/* ── Photo ───────────────────────────── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28"
          >
            {/* Ambient glow behind photo */}
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/25 blur-2xl"
              aria-hidden="true"
            />

            <div className="card card-gradient-edge relative overflow-hidden !rounded-[1.75rem] p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-surface via-surface-2 to-background">
                <img
                  src={PROFILE_IMAGE}
                  alt={`${profile.name} — ${profile.title}`}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={800}
                  className="size-full object-cover object-[center_20%]"
                />

                {/* Subtle bottom gradient for badge legibility */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
                  aria-hidden="true"
                />

                {/* Floating status badge */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.45 }}
                  className="glass absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
                >
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full rounded-full bg-success animate-pulse-ring" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  <span className="text-xs font-semibold text-success">
                    {profile.availabilityShort}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[0.6875rem] text-muted">
                    <TbMapPin size={12} aria-hidden="true" /> Swat, PK
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ── Bio + highlights ───────────────────────────── */}
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
            >
              {profile.role} at <span className="gradient-text">{profile.company}</span>
            </motion.h3>

            <div className="mt-5 space-y-4">
              {profile.aboutBio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[0.9375rem] leading-relaxed text-muted sm:text-base"
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
                  className="card !rounded-xl p-4"
                >
                  <span
                    className="mb-3 grid size-9 place-items-center rounded-lg"
                    style={{ background: `${accent}1f`, color: accent }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <p className="text-[0.8125rem] font-bold leading-snug">{label}</p>
                  <p className="mt-0.5 text-[0.6875rem] text-muted">{detail}</p>
                </motion.li>
              ))}
            </motion.ul>

            {/* Counters */}
            <motion.div variants={fadeUp} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <Counter key={stat.id} {...stat} />
              ))}
            </motion.div>

            {/* Values */}
            <motion.div variants={fadeUp} className="mt-9">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-muted">
                How I approach work
              </h4>
              <ul className="grid gap-3 sm:grid-cols-2">
                {profile.values.map((value) => (
                  <li key={value.title} className="flex gap-2.5">
                    <TbCircleCheck
                      className="mt-0.5 shrink-0 text-success"
                      size={17}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[0.875rem] font-semibold">{value.title}</p>
                      <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">
                        {value.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTAs */}
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