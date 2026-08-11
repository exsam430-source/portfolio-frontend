import { motion } from 'framer-motion';
import {
  TbBrandGithub, TbBrandLinkedin, TbPhone,
  TbMail, TbHeart, TbMapPin,
} from 'react-icons/tb';

import { useNavigation, useProfile } from '../../context';
import { scrollToSection } from '../../utils/helpers';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';

const BUILT_WITH = [
  'React 19', 'Vite', 'Tailwind CSS v4',
  'Framer Motion', 'Node.js', 'Express', 'MongoDB',
];

const buildSocials = (profile) => [
  { icon: TbBrandGithub, label: 'GitHub', href: profile.socials.github },
  { icon: TbBrandLinkedin, label: 'LinkedIn', href: profile.socials.linkedin },
  { icon: TbMail, label: 'Email', href: profile.socials.email },
  { icon: TbPhone, label: 'Phone', href: profile.socials.phone },
];

export default function Footer() {
  const { navLinks } = useNavigation();
  const profile = useProfile();
  const socials = buildSocials(profile);
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'color-mix(in oklab, var(--surface) 25%, transparent)',
      }}
      role="contentinfo"
    >
      {/* Top glow */}
      <div
  aria-hidden="true"
  className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 rounded-full hidden md:block"
        style={{
          width: '34rem',
          height: '34rem',
          background:
            'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Neon top line */}
      <div
        className="absolute inset-x-0 top-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--primary), var(--secondary), transparent)',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-x relative py-14"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Brand */}
          <motion.div variants={fadeUp}>
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
              className="group inline-flex items-center gap-2.5"
            >
              <span
                className="grid size-10 place-items-center rounded-xl text-sm font-extrabold text-white transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary), var(--secondary))',
                  boxShadow: '0 0 20px rgba(108,99,255,0.5)',
                }}
              >
                {profile.initials}
              </span>
              <span
                className="text-base font-bold"
                style={{ color: 'var(--text)' }}
              >
                {profile.name.split(' ')[0]}
                <span className="gradient-text">.dev</span>
              </span>
            </a>

            <p
              className="mt-4 max-w-xs text-[0.875rem] leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              {profile.tagline}
            </p>

            <p
              className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem]"
              style={{ color: 'var(--text-muted)' }}
            >
              <TbMapPin
                size={14}
                style={{ color: 'var(--primary)' }}
                aria-hidden="true"
              />
              {profile.location}
            </p>

            <ul className="mt-5 flex gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer noopener"
                    aria-label={label}
                    title={label}
                    className="group grid size-9 place-items-center rounded-lg border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background:
                        'color-mix(in oklab, var(--surface) 50%, transparent)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.boxShadow =
                        '0 0 12px rgba(108,99,255,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick links */}
          <motion.nav variants={fadeUp} aria-label="Footer navigation">
            <h3
              className="text-[0.8125rem] font-bold uppercase tracking-[0.16em]"
              style={{ color: 'var(--text)' }}
            >
              Quick Links
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="group inline-flex items-center gap-1.5 text-[0.875rem] transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    <span
                      className="h-px w-0 transition-all duration-300 group-hover:w-3"
                      style={{ background: 'var(--primary)' }}
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Built with */}
          <motion.div variants={fadeUp}>
            <h3
              className="text-[0.8125rem] font-bold uppercase tracking-[0.16em]"
              style={{ color: 'var(--text)' }}
            >
              Built With
            </h3>
            <p
              className="mt-4 text-[0.8125rem] leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              A real MERN application — contact, order and newsletter forms write
              to MongoDB through a hardened Express API.
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {BUILT_WITH.map((tech) => (
                <li key={tech} className="chip chip-muted !py-1 !text-[0.6875rem]">
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider-glow my-9" aria-hidden="true" />

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left"
        >
          <p
            className="text-[0.8125rem]"
            style={{ color: 'var(--text-muted)' }}
          >
            © {year}{' '}
            <span className="font-semibold" style={{ color: 'var(--text)' }}>
              {profile.name}
            </span>
            . All rights reserved.
          </p>

          <p
            className="inline-flex items-center gap-1.5 text-[0.8125rem]"
            style={{ color: 'var(--text-muted)' }}
          >
            Designed &amp; built with
            <TbHeart
              size={14}
              style={{ color: 'var(--secondary)' }}
              aria-hidden="true"
            />
            in Swat, Pakistan
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}