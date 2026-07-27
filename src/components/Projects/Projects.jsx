import { useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { TbFolderOff, TbBrandGithub } from 'react-icons/tb';

import SectionHeading from '../ui/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import EmptyState from '../ui/EmptyState';
import { useProjects, useProfile } from '../../context';
import { fadeUp, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

export default function Projects() {
  const { categories: projectCategories, counts, getProjectsByCategory } = useProjects();
  const profile = useProfile();
  const [filter, setFilter] = useState('all');

  /* Filtering and the per-tab counts both come from the Portfolio context. */
  const visible = useMemo(
    () => getProjectsByCategory(filter),
    [filter, getProjectsByCategory],
  );

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
            className="no-scrollbar flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-line bg-surface/45 p-1.5 backdrop-blur"
          >
            {projectCategories.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(cat.id)}
                  className={cn(
                    'relative shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200',
                    isActive ? 'text-white' : 'text-muted hover:text-content',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projects-tab-pill"
                      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-glow"
                      aria-hidden="true"
                    />
                  )}
                  {cat.label}
                  <span className="ml-1.5 text-[0.6875rem] opacity-65">{counts[cat.id]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="mt-11 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.length > 0 ? (
                visible.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))
              ) : (
                <EmptyState
                  key="empty"
                  icon={TbFolderOff}
                  title="No projects in this category yet"
                  description="I'm actively building in this area. Switch to another filter to see what's already shipped."
                  action={
                    <button type="button" onClick={() => setFilter('all')} className="btn btn-ghost">
                      Show all projects
                    </button>
                  }
                />
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* GitHub CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-sm text-muted">Every project below is open source — code, commits and all.</p>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-ghost"
          >
            <TbBrandGithub size={18} aria-hidden="true" />
            Browse all repositories on GitHub
          </a>
        </motion.div>
      </div>

      {/* Detail modal (state lives in the Zustand store) */}
      <ProjectModal />
    </section>
  );
}
