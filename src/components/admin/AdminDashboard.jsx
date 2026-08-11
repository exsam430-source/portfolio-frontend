import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TbFolderFilled, TbEye, TbStar, TbWorld,
  TbPlus, TbList, TbLoader2, TbTrendingUp,
  TbBrandReact,
} from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { fetchAllProjectsAdmin } from '../../api/services';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProjectsAdmin()
      .then((res) => setProjects(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: TbFolderFilled,
      color: 'var(--primary)',
    },
    {
      label: 'Published',
      value: projects.filter((p) => p.status === 'published').length,
      icon: TbWorld,
      color: 'var(--accent)',
    },
    {
      label: 'Featured',
      value: projects.filter((p) => p.featured).length,
      icon: TbStar,
      color: '#f59e0b',
    },
    {
      label: 'Total Views',
      value: projects.reduce((sum, p) => sum + (p.views || 0), 0),
      icon: TbEye,
      color: 'var(--secondary)',
    },
  ];

  return (
    <div>
      {/* Page header */}
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.h1
          variants={fadeUp}
          className="text-2xl font-extrabold sm:text-3xl"
          style={{ color: 'var(--text)' }}
        >
          Dashboard
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-1 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          Welcome back! Here's an overview of your portfolio.
        </motion.p>
      </motion.div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center py-16">
          <TbLoader2 size={28} className="animate-spin" style={{ color: 'var(--primary)' }} />
        </div>
      ) : (
        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="card card-gradient-edge p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="mt-1 text-3xl font-extrabold tabular-nums"
                      style={{ color: stat.color }}
                    >
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className="grid size-12 place-items-center rounded-xl"
                    style={{
                      background: `color-mix(in oklab, ${stat.color} 15%, transparent)`,
                      color: stat.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8"
      >
        <motion.div variants={fadeUp}>
          <Link
            to="/admin/projects/new"
            className="card card-gradient-edge flex items-center gap-4 p-5 hover:no-underline group"
          >
            <div
              className="grid size-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'color-mix(in oklab, var(--primary) 15%, transparent)',
                color: 'var(--primary)',
              }}
            >
              <TbPlus size={22} />
            </div>
            <div>
              <p className="font-bold" style={{ color: 'var(--text)' }}>
                Add New Project
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Create with images & video
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link
            to="/admin/projects"
            className="card flex items-center gap-4 p-5 group"
          >
            <div
              className="grid size-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'color-mix(in oklab, var(--secondary) 15%, transparent)',
                color: 'var(--secondary)',
              }}
            >
              <TbList size={22} />
            </div>
            <div>
              <p className="font-bold" style={{ color: 'var(--text)' }}>
                Manage Projects
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Edit, delete, reorder
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={fadeUp}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="card flex items-center gap-4 p-5 group"
          >
            <div
              className="grid size-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: 'color-mix(in oklab, var(--accent) 15%, transparent)',
                color: 'var(--accent)',
              }}
            >
              <TbBrandReact size={22} />
            </div>
            <div>
              <p className="font-bold" style={{ color: 'var(--text)' }}>
                View Portfolio
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                See the live site
              </p>
            </div>
          </a>
        </motion.div>
      </motion.div>

      {/* Recent Projects */}
      {!loading && projects.length > 0 && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg" style={{ color: 'var(--text)' }}>
              Recent Projects
            </h2>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold"
              style={{ color: 'var(--primary-soft)' }}
            >
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project._id}
                className="flex items-center gap-4 rounded-xl p-3 transition-colors"
                style={{ background: 'var(--surface-2)' }}
              >
                {/* Thumbnail */}
                <div
                  className="size-10 shrink-0 rounded-lg overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentFrom || '#6c63ff'}40, ${project.accentTo || '#ff6584'}30)`,
                  }}
                >
                  {project.thumbnail?.url && (
                    <img
                      src={project.thumbnail.url}
                      alt={project.title}
                      className="size-full object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ color: 'var(--text)' }}
                  >
                    {project.title}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {project.category} • {project.year}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase"
                    style={{
                      background: project.status === 'published'
                        ? 'rgba(16,185,129,0.15)'
                        : 'rgba(245,158,11,0.15)',
                      color: project.status === 'published' ? '#10b981' : '#f59e0b',
                    }}
                  >
                    {project.status}
                  </span>
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <TbEye size={12} /> {project.views || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}