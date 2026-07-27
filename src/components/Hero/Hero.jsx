import { motion } from 'framer-motion';
import {
  TbArrowDown, TbDownload, TbEye, TbMapPin, TbBrandGithub, TbBrandLinkedin, TbMail, TbPhone,
} from 'react-icons/tb';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTailwindcss,
} from 'react-icons/si';

import { useProfile } from '../../context';
import useTypewriter from '../../hooks/useTypewriter';
import { scrollToSection } from '../../utils/helpers';
import { fadeUp, stagger, EASE } from '../../utils/motion';

/* Floating background icons: position (%), size, brand colour, delay. */
const FLOATING = [
  { Icon: SiReact, top: '16%', left: '7%', size: 42, color: '#61DAFB', delay: 0 },
  { Icon: SiNodedotjs, top: '26%', right: '9%', size: 38, color: '#5FA04E', delay: 1.1 },
  { Icon: SiMongodb, bottom: '26%', left: '11%', size: 36, color: '#47A248', delay: 0.6 },
  { Icon: SiExpress, bottom: '19%', right: '13%', size: 34, color: '#F8FAFC', delay: 1.7 },
  { Icon: SiJavascript, top: '52%', left: '4%', size: 30, color: '#F7DF1E', delay: 2.2 },
  { Icon: SiTailwindcss, top: '62%', right: '5%', size: 32, color: '#06B6D4', delay: 1.4 },
];

/** Built from context so the links always match profile.js. */
const buildSocials = (profile) => [
  { href: profile.socials.github, Icon: TbBrandGithub, label: 'GitHub profile' },
  { href: profile.socials.linkedin, Icon: TbBrandLinkedin, label: 'LinkedIn profile' },
  { href: profile.socials.email, Icon: TbMail, label: 'Send an email' },
  { href: profile.socials.phone, Icon: TbPhone, label: 'Call me' },
];

export default function Hero() {
  const profile = useProfile();
  const { text } = useTypewriter(profile.roles);
  const socials = buildSocials(profile);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 noise"
      aria-label="Introduction"
    >
      {/* ── Animated background ─────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-bg" />

        {/* Aurora blobs */}
        <div className="absolute -left-32 top-[-10%] size-[36rem] rounded-full bg-primary/18 blur-[130px] animate-aurora" />
        <div
          className="absolute -right-40 top-[8%] size-[32rem] rounded-full bg-secondary/18 blur-[130px] animate-aurora"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="absolute bottom-[-18%] left-1/3 size-[30rem] rounded-full bg-accent/12 blur-[130px] animate-aurora"
          style={{ animationDelay: '-11s' }}
        />

        {/* Floating tech icons */}
        {FLOATING.map(({ Icon, delay, color, size, ...pos }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.18, scale: 1 }}
            transition={{ delay: 1 + i * 0.14, duration: 0.9, ease: EASE }}
            style={{ ...pos, color, animationDelay: `${delay}s` }}
            className="absolute hidden animate-float-slow md:block"
          >
            <Icon size={size} />
          </motion.div>
        ))}

        {/* Fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div
        variants={stagger(0.11, 0.15)}
        initial="hidden"
        animate="visible"
        className="container-x relative text-center"
      >
        {/* Availability pill */}
        <motion.div variants={fadeUp} className="mb-7 flex justify-center">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.8125rem] font-medium">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-success animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            <span className="text-success">{profile.availability}</span>
            <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
            <span className="hidden items-center gap-1 text-muted sm:inline-flex">
              <TbMapPin size={13} aria-hidden="true" />
              {profile.location}
            </span>
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p variants={fadeUp} className="mb-3 text-base font-medium text-muted sm:text-lg">
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-shadow-glow text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
        >
          <span className="gradient-text-tri">{profile.name}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex min-h-[2.75rem] items-center justify-center sm:min-h-[3.25rem]"
        >
          <p className="font-display text-xl font-bold text-content/90 sm:text-2xl lg:text-3xl">
            <span className="text-muted">&lt;</span>
            <span aria-live="polite">{text}</span>
            <span className="ml-0.5 inline-block w-[3px] translate-y-0.5 self-stretch bg-primary animate-blink" style={{ height: '1em' }} aria-hidden="true" />
            <span className="text-muted"> /&gt;</span>
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-[1.0625rem]"
        >
          {profile.heroBio}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <button type="button" onClick={() => scrollToSection('projects')} className="btn btn-primary !px-7 !py-3.5">
            <TbEye size={18} aria-hidden="true" />
            View My Work
          </button>

          <a
            href={profile.resumeUrl}
            download
            className="btn btn-ghost !px-7 !py-3.5"
            aria-label="Download CV as PDF"
          >
            <TbDownload size={18} aria-hidden="true" />
            Download CV
          </a>
        </motion.div>

        {/* Socials */}
        <motion.ul variants={fadeUp} className="mt-9 flex items-center justify-center gap-3">
          {socials.map(({ href, Icon, label }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer noopener"
                aria-label={label}
                className="group grid size-11 place-items-center rounded-xl border border-line bg-surface/50 text-muted backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/55 hover:text-primary hover:shadow-glow"
              >
                <Icon size={19} className="transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-label="Scroll to the About section"
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-primary sm:flex"
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em]">Scroll</span>
        <span className="grid h-9 w-[1.375rem] place-items-start rounded-full border border-line p-1 transition-colors group-hover:border-primary/60">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="size-1.5 rounded-full bg-current"
          />
        </span>
        <TbArrowDown size={13} className="animate-bounce" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
