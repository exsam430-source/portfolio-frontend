import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbExternalLink, TbBrandGithub, TbCircleCheck, TbCalendar } from 'react-icons/tb';

import { useUI } from '../../context';
import ProjectMockup from './ProjectMockup';
import { scrollToSection } from '../../utils/helpers';

/**
 * Accessible project case-study dialog.
 * Handles Escape to close, body scroll locking and focus management.
 */
export default function ProjectModal() {
  const { activeProject: project, closeProject: close } = useUI();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, close]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close project details"
            onClick={close}
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-surface/95 backdrop-blur-2xl sm:rounded-3xl"
          >
            {/* Header image */}
            <div className="relative aspect-[16/8] shrink-0 overflow-hidden">
              <ProjectMockup project={project} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/45 to-transparent" />

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-xl border border-white/12 bg-background/70 text-content backdrop-blur transition-colors hover:border-danger/55 hover:text-danger"
              >
                <TbX size={18} />
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <h3 id="project-modal-title" className="font-display text-2xl font-extrabold sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.tagline}</p>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <TbCalendar size={14} aria-hidden="true" /> {project.year}
                </span>
                <span className="size-1 rounded-full bg-muted/50" aria-hidden="true" />
                <span className="capitalize">
                  {{ fullstack: 'full stack', ecommerce: 'e-commerce', management: 'management system' }[project.category] || project.category}
                </span>
                {project.live && (
                  <>
                    <span className="size-1 rounded-full bg-muted/50" aria-hidden="true" />
                    <span className="inline-flex items-center gap-1.5 text-success">
                      <span className="size-1.5 rounded-full bg-success" aria-hidden="true" /> Live in production
                    </span>
                  </>
                )}
              </div>

              <p className="text-[0.9375rem] leading-relaxed text-muted">{project.description}</p>

              {/* Features */}
              <h4 className="mb-3 mt-7 text-sm font-bold uppercase tracking-[0.16em] text-muted">
                Key features
              </h4>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <TbCircleCheck className="mt-0.5 shrink-0 text-success" size={16} aria-hidden="true" />
                    <span className="text-[0.8125rem] leading-relaxed text-content/85">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Tech */}
              <h4 className="mb-3 mt-7 text-sm font-bold uppercase tracking-[0.16em] text-muted">
                Built with
              </h4>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </div>

            {/* Sticky footer */}
            <div className="flex shrink-0 flex-wrap gap-2.5 border-t border-line/70 bg-surface/90 p-4 sm:p-5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-primary flex-1 sm:flex-none"
                >
                  <TbExternalLink size={16} aria-hidden="true" /> Visit Live Site
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost flex-1 sm:flex-none"
              >
                <TbBrandGithub size={16} aria-hidden="true" /> Source Code
              </a>
              <button
                type="button"
                onClick={() => { close(); setTimeout(() => scrollToSection('order'), 250); }}
                className="btn btn-outline ml-auto w-full sm:w-auto"
              >
                Build something like this
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
