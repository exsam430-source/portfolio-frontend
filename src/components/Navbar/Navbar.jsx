import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { TbMenu2, TbX, TbSend, TbSun, TbMoon } from 'react-icons/tb';
import { useNavigation, useProfile, useUI } from '../../context';
import { useTheme } from '../../context/ThemeContext';
import { cn, scrollToSection } from '../../utils/helpers';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { navLinks } = useNavigation();
  const profile = useProfile();
  const { activeSection, isMenuOpen, toggleMenu, closeMenu } = useUI();
  const { isDark, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && closeMenu();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen, closeMenu]);

  const go = (href) => {
    closeMenu();
    setTimeout(() => scrollToSection(href), isMenuOpen ? 260 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'color-mix(in oklab, var(--surface) 85%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 8px 32px -16px rgba(0,0,0,0.9)'
            : 'none',
        }}
      >
        <nav
          className="container-x flex h-[4.5rem] items-center justify-between gap-4"
          aria-label="Primary"
        >
          {/* ── Logo ── */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); go('#hero'); }}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${profile.name} — back to top`}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                }}
              />
              <span
                className="relative grid size-10 place-items-center rounded-xl text-sm font-extrabold text-white transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  boxShadow: '0 0 20px rgba(108,99,255,0.5)',
                }}
              >
                {profile.initials}
              </span>
            </div>
            <span className="hidden text-[0.9375rem] font-bold tracking-tight sm:block"
              style={{ color: 'var(--text)' }}>
              {profile.name.split(' ')[0]}
              <span className="gradient-text">.dev</span>
            </span>
          </a>

          {/* ── Desktop Links ── */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); go(link.href); }}
                    aria-current={isActive ? 'page' : undefined}
                    className="relative rounded-lg px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-200"
                    style={{
                      color: isActive ? 'var(--text)' : 'var(--text-muted)',
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-lg"
                        style={{
                          background: 'color-mix(in oklab, var(--primary) 15%, transparent)',
                          border: '1px solid color-mix(in oklab, var(--primary) 30%, transparent)',
                        }}
                        aria-hidden="true"
                      />
                    )}
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: 'var(--primary)' }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Right: Theme + CTA + Burger ── */}
          <div className="flex items-center gap-2.5">

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="relative grid size-10 place-items-center rounded-xl border transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TbSun size={18} style={{ color: '#f59e0b' }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TbMoon size={18} style={{ color: '#6c63ff' }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hire Me CTA */}
            <button
              type="button"
              onClick={() => go('#order')}
              className="btn btn-primary hidden !px-5 !py-2.5 !text-[0.875rem] sm:inline-flex"
            >
              <TbSend size={16} aria-hidden="true" />
              Hire Me
            </button>

            {/* Burger */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-xl border transition-colors lg:hidden"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            >
              {isMenuOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
            </button>
          </div>
        </nav>

        {/* Scroll Progress Bar */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left"
          aria-hidden="true"
          css={{
            background:
              'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
            boxShadow: '0 0 8px var(--primary)',
          }}
        >
          <div
            style={{
              height: '2px',
              background:
                'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
              boxShadow: '0 0 8px var(--primary)',
            }}
          />
        </motion.div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="absolute inset-0"
              style={{ background: 'rgba(5,8,22,0.85)', backdropFilter: 'blur(8px)' }}
            />

            {/* Drawer */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col px-6 pb-8 pt-24"
              style={{
                background: 'var(--surface)',
                borderLeft: '1px solid var(--border)',
                backdropFilter: 'blur(20px)',
              }}
              aria-label="Mobile navigation"
            >
              {/* Neon accent line */}
              <div
                className="absolute left-0 top-1/4 h-1/2 w-[2px] rounded-full"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, var(--primary), var(--secondary), transparent)',
                }}
              />

              <ul className="flex flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, duration: 0.4 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); go(link.href); }}
                        aria-current={isActive ? 'page' : undefined}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200"
                        style={{
                          background: isActive
                            ? 'color-mix(in oklab, var(--primary) 15%, transparent)'
                            : 'transparent',
                          border: isActive
                            ? '1px solid color-mix(in oklab, var(--primary) 30%, transparent)'
                            : '1px solid transparent',
                          color: isActive ? 'var(--text)' : 'var(--text-muted)',
                        }}
                      >
                        <span
                          className="size-1.5 rounded-full transition-colors"
                          style={{
                            background: isActive ? 'var(--primary)' : 'var(--border)',
                          }}
                          aria-hidden="true"
                        />
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                onClick={() => go('#order')}
                className="btn btn-primary mt-7 w-full"
              >
                <TbSend size={17} aria-hidden="true" />
                Start Your Project
              </motion.button>

              {/* Theme toggle in mobile */}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                onClick={toggleTheme}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all"
                style={{
                  background: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                {isDark ? (
                  <><TbSun size={16} style={{ color: '#f59e0b' }} /> Switch to Light Mode</>
                ) : (
                  <><TbMoon size={16} style={{ color: '#6c63ff' }} /> Switch to Dark Mode</>
                )}
              </motion.button>

              {/* Profile info */}
              <div className="mt-auto pt-8 text-xs leading-relaxed"
                style={{ color: 'var(--text-muted)' }}>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>
                  {profile.name}
                </p>
                <p className="mt-1">{profile.location}</p>
                <p
                  className="mt-2.5 inline-flex items-center gap-1.5"
                  style={{ color: 'var(--accent)' }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden="true"
                  />
                  {profile.availabilityShort}
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}