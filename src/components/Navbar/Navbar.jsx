import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { TbMenu2, TbX, TbSend } from 'react-icons/tb';

import { useNavigation, useProfile, useUI } from '../../context';
import { cn, scrollToSection } from '../../utils/helpers';

/**
 * Fixed navbar:
 *  • transparent at the top, glassmorphic once scrolled
 *  • scroll-progress bar along the bottom edge
 *  • active-section highlight driven by the scroll-spy store
 *  • full-screen animated mobile menu with focus/scroll locking
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { navLinks } = useNavigation();
  const profile = useProfile();
  const { activeSection, isMenuOpen, toggleMenu, closeMenu } = useUI();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  /* Toggle the glass background after a small scroll distance. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll + close on Escape while the mobile menu is open. */
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => e.key === 'Escape' && closeMenu();
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen, closeMenu]);

  const go = (href) => {
    closeMenu();
    // Wait for the menu exit animation before scrolling.
    setTimeout(() => scrollToSection(href), isMenuOpen ? 260 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-400',
          scrolled
            ? 'border-b border-white/8 bg-background/72 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.9)]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="container-x flex h-[4.5rem] items-center justify-between gap-4" aria-label="Primary">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); go('#hero'); }}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-extrabold text-white transition-transform duration-300 group-hover:scale-110">
              {profile.initials}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70" aria-hidden="true" />
            </span>
            <span className="hidden text-[0.9375rem] font-bold tracking-tight sm:block">
              {profile.name.split(' ')[0]}
              <span className="gradient-text">.dev</span>
            </span>
          </a>

          {/* Desktop links */}
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
                    className={cn(
                      'relative rounded-lg px-3.5 py-2 text-[0.875rem] font-medium transition-colors duration-200',
                      isActive ? 'text-content' : 'text-muted hover:text-content',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-lg border border-primary/25 bg-primary/12"
                        aria-hidden="true"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + burger */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => go('#order')}
              className="btn btn-primary hidden !px-5 !py-2.5 !text-[0.875rem] sm:inline-flex"
            >
              <TbSend size={16} aria-hidden="true" />
              Hire Me
            </button>

            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="grid size-10 place-items-center rounded-xl border border-line bg-surface/60 text-content transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
            >
              {isMenuOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
            </button>
          </div>
        </nav>

        {/* Scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-primary via-secondary to-accent"
          aria-hidden="true"
        />
      </motion.header>

      {/* Mobile menu */}
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
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="absolute inset-0 bg-background/85 backdrop-blur-xl"
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col border-l border-white/8 bg-surface/92 px-6 pb-8 pt-24 backdrop-blur-2xl"
              aria-label="Mobile navigation"
            >
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
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors',
                          isActive
                            ? 'border border-primary/25 bg-primary/12 text-content'
                            : 'text-muted hover:bg-white/5 hover:text-content',
                        )}
                      >
                        <span className={cn('size-1.5 rounded-full transition-colors', isActive ? 'bg-primary' : 'bg-muted/40')} aria-hidden="true" />
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

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

              <div className="mt-auto pt-8 text-xs leading-relaxed text-muted">
                <p className="font-semibold text-content">{profile.name}</p>
                <p className="mt-1">{profile.location}</p>
                <p className="mt-2.5 inline-flex items-center gap-1.5 text-success">
                  <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
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
