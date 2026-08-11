import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TbExternalLink, TbBrandGithub, TbArrowUpRight, TbStar } from 'react-icons/tb';
import { useUI } from '../../context';
import ProjectMockup from './ProjectMockup';

const CATEGORY_LABEL = {
  fullstack: 'Full Stack',
  ecommerce: 'E-Commerce',
  management: 'Management',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  other: 'Other',
};

export default function ProjectCard({ project, index }) {
  const { openProject } = useUI();
  const accentFrom = project.accentFrom || project.accent?.[0] || '#6c63ff';
  const accentTo = project.accentTo || project.accent?.[1] || '#ff6584';
  const slug = project.slug || project.id;

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
      {/* ── Thumbnail ── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectMockup project={project} />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex translate-y-full flex-col items-center justify-center gap-2.5 opacity-0 backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100"
          style={{
            background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
          }}
        >
          <div className="flex flex-wrap justify-center gap-2.5 px-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary !px-4 !py-2.5 !text-[0.8125rem]"
              >
                <TbExternalLink size={15} aria-hidden="true" />
                Visit Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost !px-4 !py-2.5 !text-[0.8125rem]"
              >
                <TbBrandGithub size={15} aria-hidden="true" />
                GitHub
              </a>
            )}
          </div>
          <Link
            to={`/projects/${slug}`}
            className="mt-1 inline-flex items-center gap-1 text-xs font-semibold underline-offset-4 hover:underline"
            style={{ color: 'var(--primary-soft)' }}
          >
            View full case study
            <TbArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex gap-1.5">
          <span
            className="rounded-full border px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider backdrop-blur"
            style={{
              background: `${accentFrom}22`,
              borderColor: `${accentFrom}55`,
              color: accentFrom,
            }}
          >
            {CATEGORY_LABEL[project.category] || project.category}
          </span>
          {project.featured && (
            <span
              className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider backdrop-blur"
              style={{
                borderColor: 'rgba(245,158,11,0.45)',
                background: 'rgba(245,158,11,0.15)',
                color: '#f59e0b',
              }}
            >
              <TbStar size={10} aria-hidden="true" /> Featured
            </span>
          )}
          {project.live && (
            <span
              className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider backdrop-blur"
              style={{
                borderColor: 'rgba(16,185,129,0.45)',
                background: 'rgba(16,185,129,0.15)',
                color: '#10b981',
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: '#10b981' }}
                aria-hidden="true"
              />
              Live
            </span>
          )}
        </div>

        <span
          className="pointer-events-none absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold backdrop-blur"
          style={{
            background: 'color-mix(in oklab, var(--bg) 65%, transparent)',
            color: 'var(--text-muted)',
          }}
        >
          {project.year}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="text-[1.0625rem] font-bold leading-snug"
          style={{ color: 'var(--text)' }}
        >
          <Link
            to={`/projects/${slug}`}
            className="text-left transition-colors hover:text-primary-soft"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-1 text-xs font-medium" style={{ color: accentTo }}>
          {project.tagline}
        </p>

        <p
          className="mt-3 line-clamp-3 text-[0.8125rem] leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {project.shortDescription || project.description}
        </p>

        {/* Tech badges */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {(project.tech || []).slice(0, 5).map((t) => (
            <li key={t} className="chip chip-muted !py-1 !text-[0.6875rem]">
              {t}
            </li>
          ))}
          {(project.tech || []).length > 5 && (
            <li className="chip !py-1 !text-[0.6875rem]">
              +{project.tech.length - 5}
            </li>
          )}
        </ul>

        {/* Footer */}
        <div
          className="mt-5 flex items-center gap-4 border-t pt-4"
          style={{ borderColor: 'var(--border)' }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <TbExternalLink size={14} aria-hidden="true" /> Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <TbBrandGithub size={14} aria-hidden="true" /> Code
            </a>
          )}
          <Link
            to={`/projects/${slug}`}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold transition-transform hover:translate-x-0.5"
            style={{ color: 'var(--primary-soft)' }}
          >
            Details <TbArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}