import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TbEdit, TbTrash, TbStar, TbStarFilled, TbEye,
  TbLoader2, TbPlus, TbSearch, TbWorld, TbWorldOff,
  TbAlertTriangle, TbX,
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import {
  fetchAllProjectsAdmin,
  deleteProject,
  toggleFeatured,
  updateProjectStatus,
} from '../../api/services';
import { fadeUp, stagger } from '../../utils/motion';

function DeleteConfirmModal({ project, onConfirm, onCancel, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] grid place-items-center p-4"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
        onClick={onCancel}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card relative w-full max-w-md p-6 text-center"
      >
        <div
          className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl"
          style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}
        >
          <TbAlertTriangle size={26} />
        </div>
        <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
          Delete Project?
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          Are you sure you want to delete{' '}
          <strong style={{ color: 'var(--text)' }}>{project?.title}</strong>?
          This will also delete all images and videos from Cloudinary.
          This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn flex-1"
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
            }}
          >
            {loading ? (
              <TbLoader2 size={16} className="animate-spin" />
            ) : (
              <TbTrash size={16} />
            )}
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetchAllProjectsAdmin({ search });
      setProjects(res.data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    load();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProject(deleteTarget._id);
      toast.success(`"${deleteTarget.title}" deleted.`);
      setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleFeatured = async (project) => {
    setActionLoading((prev) => ({ ...prev, [`feat-${project._id}`]: true }));
    try {
      const res = await toggleFeatured(project._id);
      setProjects((prev) =>
        prev.map((p) =>
          p._id === project._id ? { ...p, featured: res.data.featured } : p
        )
      );
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, [`feat-${project._id}`]: false }));
    }
  };

  const handleStatusToggle = async (project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    setActionLoading((prev) => ({ ...prev, [`status-${project._id}`]: true }));
    try {
      await updateProjectStatus(project._id, newStatus);
      setProjects((prev) =>
        prev.map((p) =>
          p._id === project._id ? { ...p, status: newStatus } : p
        )
      );
      toast.success(`Project ${newStatus}.`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading((prev) => ({ ...prev, [`status-${project._id}`]: false }));
    }
  };

  return (
    <>
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmModal
            project={deleteTarget}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleting}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
              All Projects
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              {projects.length} project{projects.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Link to="/admin/projects/new" className="btn btn-primary shrink-0">
            <TbPlus size={18} />
            Add New Project
          </Link>
        </motion.div>

        {/* Search */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSearch}
          className="mb-6 flex gap-2"
        >
          <div className="relative flex-1">
            <TbSearch
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field !pl-10"
            />
          </div>
          <button type="submit" className="btn btn-ghost">
            Search
          </button>
        </motion.form>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-16">
            <TbLoader2
              size={28}
              className="animate-spin"
              style={{ color: 'var(--primary)' }}
            />
          </div>
        ) : projects.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
              No projects found
            </p>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              Add your first project to get started.
            </p>
            <Link to="/admin/projects/new" className="btn btn-primary mt-4">
              <TbPlus size={16} /> Add Project
            </Link>
          </div>
        ) : (
          <motion.div variants={stagger(0.04)} className="space-y-3">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={fadeUp}
                className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                {/* Thumbnail */}
                <div
                  className="size-14 shrink-0 overflow-hidden rounded-xl"
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

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate" style={{ color: 'var(--text)' }}>
                    {project.title}
                  </p>
                  <p
                    className="text-xs mt-0.5 truncate"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {project.category} • {project.year} •{' '}
                    {(project.tech || []).slice(0, 3).join(', ')}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
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
                    {project.featured && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase"
                        style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}
                      >
                        Featured
                      </span>
                    )}
                    {project.live && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase"
                        style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}
                      >
                        Live
                      </span>
                    )}
                    <span
                      className="text-[0.625rem] flex items-center gap-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <TbEye size={11} /> {project.views || 0}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle publish */}
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(project)}
                    disabled={actionLoading[`status-${project._id}`]}
                    title={project.status === 'published' ? 'Unpublish' : 'Publish'}
                    className="grid size-9 place-items-center rounded-lg border transition-colors"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                      color: project.status === 'published' ? '#10b981' : 'var(--text-muted)',
                    }}
                  >
                    {actionLoading[`status-${project._id}`] ? (
                      <TbLoader2 size={15} className="animate-spin" />
                    ) : project.status === 'published' ? (
                      <TbWorld size={15} />
                    ) : (
                      <TbWorldOff size={15} />
                    )}
                  </button>

                  {/* Toggle featured */}
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(project)}
                    disabled={actionLoading[`feat-${project._id}`]}
                    title={project.featured ? 'Unfeature' : 'Feature'}
                    className="grid size-9 place-items-center rounded-lg border transition-colors"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                      color: project.featured ? '#f59e0b' : 'var(--text-muted)',
                    }}
                  >
                    {actionLoading[`feat-${project._id}`] ? (
                      <TbLoader2 size={15} className="animate-spin" />
                    ) : project.featured ? (
                      <TbStarFilled size={15} />
                    ) : (
                      <TbStar size={15} />
                    )}
                  </button>

                  {/* Edit */}
                  <Link
                    to={`/admin/projects/edit/${project._id}`}
                    className="grid size-9 place-items-center rounded-lg border transition-colors"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                      color: 'var(--primary)',
                    }}
                    title="Edit"
                  >
                    <TbEdit size={15} />
                  </Link>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(project)}
                    className="grid size-9 place-items-center rounded-lg border transition-colors"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                      color: '#ef4444',
                    }}
                    title="Delete"
                  >
                    <TbTrash size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}