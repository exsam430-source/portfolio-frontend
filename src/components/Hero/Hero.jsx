import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TbArrowDown, TbDownload, TbEye,
  TbBrandGithub, TbBrandLinkedin, TbMail, TbBrandWhatsapp,
} from 'react-icons/tb';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiTailwindcss,
} from 'react-icons/si';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useProfile } from '../../context';
import { useTheme } from '../../context/ThemeContext';
import useTypewriter from '../../hooks/useTypewriter';
import { scrollToSection } from '../../utils/helpers';
import { fadeUp, stagger, EASE } from '../../utils/motion';
import RobotAnimation from './RobotAnimation';

const FLOATING = [
  { Icon: SiReact, top: '15%', left: '5%', size: 40, color: '#61DAFB', delay: 0 },
  { Icon: SiNodedotjs, top: '25%', right: '7%', size: 36, color: '#5FA04E', delay: 1.1 },
  { Icon: SiMongodb, bottom: '28%', left: '8%', size: 34, color: '#47A248', delay: 0.6 },
  { Icon: SiExpress, bottom: '20%', right: '10%', size: 32, color: '#ffffff', delay: 1.7 },
  { Icon: SiJavascript, top: '55%', left: '3%', size: 28, color: '#F7DF1E', delay: 2.2 },
  { Icon: SiTailwindcss, top: '65%', right: '4%', size: 30, color: '#06B6D4', delay: 1.4 },
];

const buildSocials = (profile) => [
  { href: profile.socials.github, Icon: TbBrandGithub, label: 'GitHub' },
  { href: profile.socials.linkedin, Icon: TbBrandLinkedin, label: 'LinkedIn' },
  { href: profile.socials.email, Icon: TbMail, label: 'Email' },
  { href: profile.socials.whatsapp, Icon: TbBrandWhatsapp, label: 'WhatsApp' },
];

export default function Hero() {
  const profile = useProfile();
  const { isDark } = useTheme();
  const { text } = useTypewriter(profile.roles);
  const socials = buildSocials(profile);
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
      aria-label="Introduction"
    >
      {/* ── Particles Background ── */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'grab' },
              onClick: { enable: true, mode: 'push' },
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.5 } },
              push: { quantity: 3 },
            },
          },
          particles: {
            color: { value: '#6c63ff' },
            links: {
              color: '#6c63ff',
              distance: 150,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: 'none',
              random: true,
              straight: false,
              outModes: { default: 'bounce' },
            },
            number: {
              value: 60,
              density: { enable: true, area: 900 },
            },
            opacity: { value: 0.4 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 2.5 } },
          },
          detectRetina: true,
        }}
      />

      {/* ── Background Blobs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(108,99,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(108,99,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Aurora blobs */}
        <div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '-10%',
            left: '-15%',
            background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)',
            animation: 'aurora 18s ease-in-out infinite alternate',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            top: '5%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(255,101,132,0.15) 0%, transparent 70%)',
            animation: 'aurora 15s ease-in-out infinite alternate-reverse',
            animationDelay: '-6s',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            bottom: '-5%',
            left: '30%',
            background: 'radial-gradient(circle, rgba(67,233,123,0.1) 0%, transparent 70%)',
            animation: 'aurora 20s ease-in-out infinite alternate',
            animationDelay: '-11s',
            filter: 'blur(60px)',
          }}
        />

        {/* Floating tech icons */}
        {FLOATING.map(({ Icon, delay, color, size, ...pos }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: 1 + i * 0.14, duration: 0.9, ease: EASE }}
            style={{ ...pos, color, animationDelay: `${delay}s`, position: 'absolute' }}
            className="hidden animate-float-slow md:block"
          >
            <Icon size={size} />
          </motion.div>
        ))}

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--bg))',
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left: Text Content */}
          <motion.div
            variants={stagger(0.11, 0.15)}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Availability Pill */}
            <motion.div variants={fadeUp} className="mb-7 flex justify-center lg:justify-start">
              <span
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.8125rem] font-medium"
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
                <span style={{ color: 'var(--accent)' }}>{profile.availability}</span>
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={fadeUp}
              className="mb-3 text-base font-medium sm:text-lg"
              style={{ color: 'var(--text-muted)' }}
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name with glitch effect */}
            <motion.h1
              variants={fadeUp}
              className="text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="gradient-text-tri">{profile.name}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={fadeUp}
              className="mt-5 flex min-h-[3rem] items-center justify-center lg:justify-start"
            >
              <p
                className="font-display text-xl font-bold sm:text-2xl lg:text-3xl"
                style={{ color: 'var(--text)' }}
              >
                <span style={{ color: 'var(--primary)' }}>&lt;</span>
                <span aria-live="polite" style={{ color: 'var(--text)' }}>{text}</span>
                <span
                  className="ml-0.5 inline-block w-[3px] animate-blink"
                  style={{
                    height: '1em',
                    background: 'var(--primary)',
                    verticalAlign: 'middle',
                  }}
                  aria-hidden="true"
                />
                <span style={{ color: 'var(--primary)' }}> /&gt;</span>
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-base leading-relaxed lg:mx-0 sm:text-[1.0625rem]"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.heroBio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start"
            >
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary !px-7 !py-3.5"
              >
                <TbEye size={18} aria-hidden="true" />
                View My Work
              </button>
              <a
                href={profile.resumeUrl}
                download
                className="btn btn-neon !px-7 !py-3.5"
                aria-label="Download CV"
              >
                <TbDownload size={18} aria-hidden="true" />
                Download CV
              </a>
            </motion.div>

            {/* Socials */}
            <motion.ul
              variants={fadeUp}
              className="mt-9 flex items-center justify-center gap-3 lg:justify-start"
            >
              {socials.map(({ href, Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="group grid size-11 place-items-center rounded-xl border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'color-mix(in oklab, var(--surface) 50%, transparent)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                      backdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(108,99,255,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon
                      size={19}
                      className="transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: Robot Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="hidden lg:flex lg:items-center lg:justify-center"
          >
            <RobotAnimation />
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: '5+', label: 'Projects Delivered' },
            { value: '2+', label: 'Years Experience' },
            { value: '30+', label: 'Technologies' },
            { value: '4', label: 'Live Products' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card card-gradient-edge p-4 text-center"
            >
              <p
                className="font-display text-3xl font-extrabold"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </p>
              <p
                className="mt-1 text-[0.6875rem] font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        aria-label="Scroll to About"
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        style={{ color: 'var(--text-muted)' }}
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em]">
          Scroll
        </span>
        <span
          className="grid h-9 w-[1.375rem] place-items-start rounded-full border p-1 transition-colors group-hover:border-primary"
          style={{ borderColor: 'var(--border)' }}
        >
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            className="size-1.5 rounded-full"
            style={{ background: 'var(--primary)' }}
          />
        </span>
        <TbArrowDown
          size={13}
          className="animate-bounce"
          style={{ color: 'var(--primary)' }}
          aria-hidden="true"
        />
      </motion.button>
    </section>
  );
}