import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TbX, TbExternalLink, TbBrandGithub, TbCircleCheck,
  TbCalendar, TbArrowRight,
} from 'react-icons/tb';
import { useUI } from '../../context';
import ProjectMockup from './ProjectMockup';

export default function ProjectModal() {
  const { activeProject: project, closeProject: close } = useUI();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, close]);

  const slug = project?.slug || project?.id;

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
            aria-label="Close"
            onClick={close}
            className="absolute inset-0"
            style={{
              background: 'color-mix(in oklab, var(--bg) 85%, transparent)',
              backdropFilter: 'blur(8px)',
            }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl"
            style={{
              background: 'color-mix(in oklab, var(--surface) 95%, transparent)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Header image */}
            <div className="relative aspect-[16/8] shrink-0 overflow-hidden">
              <ProjectMockup project={project} />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, var(--surface), rgba(0,0,0,0.4), transparent)',
                }}
              />

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-xl transition-colors"
                style={{
                  background: 'color-mix(in oklab, var(--bg) 70%, transparent)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--text)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <TbX size={18} />
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  style={{ color: '#ffffff' }}
                >
                  {project.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
              <div
                className="mb-5 flex flex-wrap items-center gap-2 text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <TbCalendar size={14} aria-hidden="true" /> {project.year}
                </span>
                <span
                  className="size-1 rounded-full"
                  style={{ background: 'var(--border)' }}
                  aria-hidden="true"
                />
                <span className="capitalize">{project.category}</span>
                {project.live && (
                  <>
                    <span
                      className="size-1 rounded-full"
                      style={{ background: 'var(--border)' }}
                      aria-hidden="true"
                    />
                    <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                      <span className="size-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                      Live
                    </span>
                  </>
                )}
                {project.views > 0 && (
                  <>
                    <span className="size-1 rounded-full" style={{ background: 'var(--border)' }} />
                    <span>{project.views} views</span>
                  </>
                )}
              </div>

              <p
                className="text-[0.9375rem] leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {project.description}
              </p>

              {/* Features */}
              {project.features?.length > 0 && (
                <>
                  <h4
                    className="mb-3 mt-7 text-sm font-bold uppercase tracking-[0.16em]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Key features
                  </h4>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <TbCircleCheck
                          className="mt-0.5 shrink-0"
                          size={16}
                          style={{ color: 'var(--accent)' }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-[0.8125rem] leading-relaxed"
                          style={{ color: 'var(--text)', opacity: 0.85 }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Tech */}
              <h4
                className="mb-3 mt-7 text-sm font-bold uppercase tracking-[0.16em]"
                style={{ color: 'var(--text-muted)' }}
              >
                Built with
              </h4>
              <ul className="flex flex-wrap gap-2">
                {(project.tech || []).map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </div>

            {/* Sticky footer */}
            <div
              className="flex shrink-0 flex-wrap gap-2.5 p-4 sm:p-5"
              style={{
                background: 'color-mix(in oklab, var(--surface) 90%, transparent)',
                borderTop: '1px solid var(--border)',
              }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-primary flex-1 sm:flex-none"
                >
                  <TbExternalLink size={16} aria-hidden="true" /> Visit Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-ghost flex-1 sm:flex-none"
                >
                  <TbBrandGithub size={16} aria-hidden="true" /> Source Code
                </a>
              )}
              <Link
                to={`/projects/${slug}`}
                onClick={close}
                className="btn btn-neon ml-auto w-full sm:w-auto"
              >
                Full Case Study
                <TbArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}