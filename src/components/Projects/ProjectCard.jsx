import { motion } from 'framer-motion';
import { TbExternalLink, TbBrandGithub, TbArrowUpRight, TbStar } from 'react-icons/tb';

import { useUI } from '../../context';
import ProjectMockup from './ProjectMockup';

const CATEGORY_LABEL = {
  fullstack: 'Full Stack',
  ecommerce: 'E-Commerce',
  management: 'Management',
  frontend: 'Frontend',
  backend: 'Backend',
};

/**
 * Project card with a generated browser mockup, hover overlay containing
 * the live/GitHub links, tech badges and a "details" affordance.
 */
export default function ProjectCard({ project, index }) {
  const { openProject } = useUI();
  const [from, to] = project.accent;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="card group relative flex flex-col overflow-hidden"
    >
      {/* ── Thumbnail ─────────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectMockup project={project} />

        {/* Hover overlay — slides up on desktop, always visible on touch */}
        <div className="absolute inset-0 flex translate-y-full flex-col items-center justify-center gap-2.5 bg-background/88 opacity-0 backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <div className="flex flex-wrap justify-center gap-2.5 px-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary !px-4 !py-2.5 !text-[0.8125rem]"
                aria-label={`Open the live site of ${project.title}`}
              >
                <TbExternalLink size={15} aria-hidden="true" />
                Visit Live Site
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost !px-4 !py-2.5 !text-[0.8125rem]"
              aria-label={`View the source code of ${project.title} on GitHub`}
            >
              <TbBrandGithub size={15} aria-hidden="true" />
              GitHub
            </a>
          </div>

          <button
            type="button"
            onClick={() => openProject(project)}
            className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary-soft underline-offset-4 hover:underline"
          >
            View full case study
            <TbArrowUpRight size={13} aria-hidden="true" />
          </button>
        </div>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex gap-1.5">
          <span
            className="rounded-full border px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider backdrop-blur"
            style={{ background: `${from}22`, borderColor: `${from}55`, color: from }}
          >
            {CATEGORY_LABEL[project.category]}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-warning/45 bg-warning/15 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-warning backdrop-blur">
              <TbStar size={10} aria-hidden="true" /> Featured
            </span>
          )}
          {project.live && (
            <span className="inline-flex items-center gap-1 rounded-full border border-success/45 bg-success/15 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider text-success backdrop-blur">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" /> Live
            </span>
          )}
        </div>

        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-background/65 px-2.5 py-1 text-[0.625rem] font-semibold text-muted backdrop-blur">
          {project.year}
        </span>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.0625rem] font-bold leading-snug">
          <button
            type="button"
            onClick={() => openProject(project)}
            className="text-left transition-colors hover:text-primary-soft"
          >
            {project.title}
          </button>
        </h3>

        <p className="mt-1 text-xs font-medium" style={{ color: to }}>
          {project.tagline}
        </p>

        <p className="mt-3 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Tech badges */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t} className="chip chip-muted !py-1 !text-[0.6875rem]">{t}</li>
          ))}
          {project.tech.length > 5 && (
            <li className="chip !py-1 !text-[0.6875rem]">+{project.tech.length - 5}</li>
          )}
        </ul>

        {/* Footer links */}
        <div className="mt-5 flex items-center gap-4 border-t border-line/70 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-primary"
            >
              <TbExternalLink size={14} aria-hidden="true" /> Live
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted transition-colors hover:text-primary"
          >
            <TbBrandGithub size={14} aria-hidden="true" /> Code
          </a>
          <button
            type="button"
            onClick={() => openProject(project)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary-soft transition-transform hover:translate-x-0.5"
          >
            Details <TbArrowUpRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
