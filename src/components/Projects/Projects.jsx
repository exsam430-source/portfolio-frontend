import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { TbFolderOff, TbBrandGithub, TbLoader2 } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import EmptyState from '../ui/EmptyState';
import { useProfile } from '../../context';
import { fetchProjects } from '../../api/services';
import { fadeUp, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'management', label: 'Management' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
];

export default function Projects() {
  const profile = useProfile();
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Fetch projects from backend API */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchProjects();
        if (!cancelled) {
          setProjects(res.data || []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          /* Fallback to empty — projects will show from static data if API down */
          setProjects([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  const counts = useMemo(() => {
    const c = { all: projects.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        c[cat.id] = projects.filter((p) => p.category === cat.id).length;
      }
    });
    return c;
  }, [projects]);

  return (
    <section id="projects" className="section relative" aria-labelledby="projects-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects I've"
          highlight="designed and built"
          subtitle="Real applications with real architecture — authentication, databases, dashboards and deployment."
        />
        <h2 id="projects-heading" className="sr-only">Featured projects</h2>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 flex justify-center"
        >
          <div
            role="tablist"
            aria-label="Filter projects by type"
            className="no-scrollbar flex max-w-full gap-1.5 overflow-x-auto rounded-2xl p-1.5 backdrop-blur"
            style={{
              background: 'color-mix(in oklab, var(--surface) 60%, transparent)',
              border: '1px solid var(--border)',
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = filter === cat.id;
              const count = counts[cat.id] || 0;
              if (cat.id !== 'all' && count === 0) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(cat.id)}
                  className="relative shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
                  style={{
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projects-tab-pill"
                      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        boxShadow: '0 0 20px rgba(108,99,255,0.5)',
                      }}
                      aria-hidden="true"
                    />
                  )}
                  {cat.label}
                  <span className="ml-1.5 text-[0.6875rem] opacity-65">{count}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="mt-16 flex flex-col items-center gap-3">
            <TbLoader2
              size={32}
              className="animate-spin"
              style={{ color: 'var(--primary)' }}
            />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Loading projects...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="mt-16 text-center">
            <p className="text-sm" style={{ color: 'var(--secondary)' }}>
              {error}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-ghost mt-4"
            >
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <LayoutGroup>
            <motion.div
              layout
              className="mt-11 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.length > 0 ? (
                  visible.map((project, i) => (
                    <ProjectCard key={project._id || project.id} project={project} index={i} />
                  ))
                ) : (
                  <EmptyState
                    key="empty"
                    icon={TbFolderOff}
                    title="No projects in this category yet"
                    description="Switch to another filter to see what's already shipped."
                    action={
                      <button
                        type="button"
                        onClick={() => setFilter('all')}
                        className="btn btn-ghost"
                      >
                        Show all projects
                      </button>
                    }
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}

        {/* GitHub CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Every project is open source — code, commits and all.
          </p>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-ghost"
          >
            <TbBrandGithub size={18} aria-hidden="true" />
            Browse repositories on GitHub
          </a>
        </motion.div>
      </div>

      <ProjectModal />
    </section>
  );
}