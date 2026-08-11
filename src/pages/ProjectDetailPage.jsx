import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TbArrowLeft, TbExternalLink, TbBrandGithub, TbCircleCheck,
  TbCalendar, TbEye, TbLoader2, TbPlayerPlay, TbPhoto,
  TbX,
} from 'react-icons/tb';
import { fetchProjectBySlug } from '../api/services';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { fadeUp, stagger, viewportOnce } from '../utils/motion';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchProjectBySlug(slug);
        if (!cancelled) {
          setProject(res.data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main
          className="grid min-h-screen place-items-center"
          style={{ background: 'var(--bg)' }}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative grid size-16 place-items-center rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                boxShadow: '0 0 30px rgba(108,99,255,0.5)',
              }}
            >
              <TbLoader2 size={28} className="animate-spin" color="white" />
            </div>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              Loading project...
            </p>
          </div>
        </main>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <main
          className="grid min-h-screen place-items-center px-4"
          style={{ background: 'var(--bg)' }}
        >
          <div className="text-center">
            <p
              className="font-display text-8xl font-extrabold"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </p>
            <p
              className="mt-4 text-xl font-bold"
              style={{ color: 'var(--text)' }}
            >
              Project not found
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              {error || 'This project does not exist or has been removed.'}
            </p>
            <Link to="/" className="btn btn-primary mt-6 inline-flex">
              <TbArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  const accentFrom = project.accentFrom || '#6c63ff';
  const accentTo = project.accentTo || '#ff6584';

  return (
    <>
      <Navbar />
      <main
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
          paddingTop: '4.5rem',
          minHeight: '100vh',
        }}
      >
        {/* ═══ HERO SECTION ═══ */}
        <section
          className="relative"
          style={{
            minHeight: '40vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            {project.thumbnail?.url ? (
              <img
                src={project.thumbnail.url}
                alt={project.title}
                className="size-full object-cover"
                style={{ opacity: 0.35 }}
              />
            ) : (
              <div
                className="size-full"
                style={{
                  background: `linear-gradient(135deg, ${accentFrom}30, ${accentTo}20)`,
                }}
              />
            )}
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to bottom,
                color-mix(in oklab, var(--bg) 20%, transparent) 0%,
                color-mix(in oklab, var(--bg) 60%, transparent) 60%,
                var(--bg) 100%
              )`,
            }}
          />

          {/* Content */}
          <div
            className="container-x relative z-10"
            style={{
              width: '100%',
              paddingTop: '5rem',
              paddingBottom: '3rem',
            }}
          >
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--primary-soft)' }}
            >
              <TbArrowLeft size={16} /> Back to Portfolio
            </Link>

            <div className="mb-4 flex flex-wrap gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                style={{
                  background: `${accentFrom}30`,
                  color: accentFrom,
                  border: `1px solid ${accentFrom}50`,
                }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(245,158,11,0.2)',
                    color: '#f59e0b',
                    border: '1px solid rgba(245,158,11,0.4)',
                  }}
                >
                  ⭐ Featured
                </span>
              )}
              {project.live && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(67,233,123,0.2)',
                    color: '#43e97b',
                    border: '1px solid rgba(67,233,123,0.4)',
                  }}
                >
                  <span
                    className="size-1.5 rounded-full animate-pulse"
                    style={{ background: '#43e97b' }}
                  />
                  Live
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl font-extrabold sm:text-5xl lg:text-6xl">
              <span
                style={{
                  background: `linear-gradient(135deg, #ffffff, ${accentFrom})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {project.title}
              </span>
            </h1>

            {project.tagline && (
              <p
                className="mt-3 text-base sm:text-lg font-medium"
                style={{ color: accentTo }}
              >
                {project.tagline}
              </p>
            )}

            <div
              className="mt-4 flex flex-wrap items-center gap-4 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <TbCalendar size={16} /> {project.year}
              </span>
              {project.views > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <TbEye size={16} /> {project.views} views
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-primary !px-5 !py-3"
                >
                  <TbExternalLink size={18} /> Visit Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-neon !px-5 !py-3"
                >
                  <TbBrandGithub size={18} /> Source Code
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ═══ MAIN CONTENT — FIXED FOR MOBILE ═══ */}
        <section
          className="relative"
          style={{
            padding: '3rem 0',
            width: '100%',
            background: 'var(--bg)',
          }}
        >
          <div
            className="container-x"
            style={{ width: '100%' }}
          >
            <div
              style={{
                display: 'grid',
                gap: '2rem',
                gridTemplateColumns: '1fr',
              }}
              className="lg:!grid-cols-[2fr_1fr]"
            >
              {/* ═══ LEFT: Main Content ═══ */}
              <div style={{ minWidth: 0, width: '100%' }}>

                {/* About */}
                {project.description && (
                  <div>
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-4"
                      style={{ color: 'var(--text)' }}
                    >
                      About This Project
                    </h2>
                    <p
                      className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.description}
                    </p>
                  </div>
                )}

                {/* Features */}
                {project.features?.length > 0 && (
                  <div className="mt-8 sm:mt-10">
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
                      style={{ color: 'var(--text)' }}
                    >
                      Key Features
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.features.map((f, i) => (
                        <div
                          key={i}
                          className="card !rounded-xl p-4 flex items-start gap-3"
                        >
                          <TbCircleCheck
                            size={18}
                            className="mt-0.5 shrink-0"
                            style={{ color: 'var(--accent)' }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: 'var(--text)' }}
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {project.challenges && (
                  <div className="mt-8 sm:mt-10">
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-4"
                      style={{ color: 'var(--text)' }}
                    >
                      Challenges & Solutions
                    </h2>
                    <div
                      className="card p-5 sm:p-6 rounded-2xl"
                      style={{ borderLeft: `3px solid var(--primary)` }}
                    >
                      <p
                        className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {project.challenges}
                      </p>
                    </div>
                  </div>
                )}

                {/* Outcome */}
                {project.outcome && (
                  <div className="mt-8 sm:mt-10">
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-4"
                      style={{ color: 'var(--text)' }}
                    >
                      Outcome & Results
                    </h2>
                    <div
                      className="card p-5 sm:p-6 rounded-2xl"
                      style={{ borderLeft: `3px solid var(--accent)` }}
                    >
                      <p
                        className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                )}

                {/* Demo Video */}
                {project.demoVideo?.url && (
                  <div className="mt-8 sm:mt-10">
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--text)' }}
                    >
                      <TbPlayerPlay
                        size={22}
                        style={{ color: 'var(--secondary)' }}
                      />
                      Demo Video
                    </h2>
                    <div
                      className="overflow-hidden rounded-2xl"
                      style={{
                        border: '1px solid var(--border)',
                        background: '#000',
                      }}
                    >
                      {!videoError ? (
                        <video
                          src={project.demoVideo.url}
                          controls
                          preload="metadata"
                          playsInline
                          poster={project.thumbnail?.url || ''}
                          onError={() => setVideoError(true)}
                          style={{
                            width: '100%',
                            maxHeight: '500px',
                            objectFit: 'contain',
                            display: 'block',
                            background: '#000',
                          }}
                        >
                          <source src={project.demoVideo.url} type="video/mp4" />
                        </video>
                      ) : (
                        <div
                          className="flex flex-col items-center justify-center py-12 px-4 text-center"
                          style={{ background: 'var(--surface)' }}
                        >
                          <TbPlayerPlay
                            size={40}
                            style={{ color: 'var(--text-muted)' }}
                            className="mb-3"
                          />
                          <a
                            href={project.demoVideo.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="btn btn-primary"
                          >
                            <TbExternalLink size={16} />
                            Watch Video
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Screenshots */}
                {project.images?.length > 0 && (
                  <div className="mt-8 sm:mt-10">
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--text)' }}
                    >
                      <TbPhoto size={22} style={{ color: 'var(--primary)' }} />
                      Screenshots ({project.images.length})
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {project.images.map((img, i) => (
                        <div
                          key={img._id || img.url || i}
                          className="cursor-pointer overflow-hidden rounded-xl group"
                          style={{ border: '1px solid var(--border)' }}
                          onClick={() => setActiveImage(img.url)}
                        >
                          <div className="relative overflow-hidden aspect-video">
                            <img
                              src={img.url}
                              alt={img.caption || `${project.title} screenshot ${i + 1}`}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          {img.caption && (
                            <p
                              className="p-3 text-xs text-center font-medium"
                              style={{
                                color: 'var(--text-muted)',
                                background: 'var(--surface)',
                              }}
                            >
                              {img.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ═══ RIGHT: Sidebar ═══ */}
              <aside
                style={{ minWidth: 0, width: '100%' }}
                className="space-y-4 lg:sticky lg:top-28 lg:self-start"
              >
                {/* Tech Stack */}
                {project.tech?.length > 0 && (
                  <div className="card card-gradient-edge p-5 sm:p-6">
                    <h3
                      className="text-lg font-bold mb-4 flex items-center gap-2"
                      style={{ color: 'var(--text)' }}
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ background: 'var(--primary)' }}
                      />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Info */}
                <div className="card p-5 sm:p-6">
                  <h3
                    className="text-lg font-bold mb-4"
                    style={{ color: 'var(--text)' }}
                  >
                    Project Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Category
                      </span>
                      <span
                        className="text-sm font-semibold capitalize"
                        style={{ color: 'var(--text)' }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <div className="h-px" style={{ background: 'var(--border)' }} />
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Year
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--text)' }}
                      >
                        {project.year}
                      </span>
                    </div>
                    <div className="h-px" style={{ background: 'var(--border)' }} />
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Status
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase"
                        style={{
                          background: project.live
                            ? 'rgba(67,233,123,0.15)'
                            : 'rgba(108,99,255,0.15)',
                          color: project.live ? '#43e97b' : 'var(--primary)',
                        }}
                      >
                        {project.live ? 'Live' : 'Completed'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="card p-5 sm:p-6">
                  <h3
                    className="text-lg font-bold mb-4"
                    style={{ color: 'var(--text)' }}
                  >
                    Links
                  </h3>
                  <div className="space-y-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn btn-primary w-full"
                      >
                        <TbExternalLink size={16} />
                        Visit Live Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="btn btn-ghost w-full"
                      >
                        <TbBrandGithub size={16} />
                        View Source Code
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <p
                        className="text-sm text-center py-2"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        No links available
                      </p>
                    )}
                  </div>
                </div>

                {/* Hire Me CTA */}
                <div className="card card-neon p-5 sm:p-6 text-center">
                  <div
                    className="mx-auto mb-3 grid size-10 place-items-center rounded-xl text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--primary), var(--secondary))',
                    }}
                  >
                    ✨
                  </div>
                  <p
                    className="text-sm font-bold mb-1"
                    style={{ color: 'var(--text)' }}
                  >
                    Like what you see?
                  </p>
                  <p
                    className="text-xs mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Let me build something similar for you.
                  </p>
                  <Link
                    to="/#order"
                    className="btn btn-primary w-full"
                  >
                    Start Your Project
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* Image Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          onClick={() => setActiveImage(null)}
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Full size screenshot"
              className="max-h-[85vh] max-w-[95vw] rounded-2xl object-contain"
              style={{
                boxShadow: '0 0 60px rgba(108,99,255,0.4)',
              }}
            />
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -right-3 -top-3 grid size-9 place-items-center rounded-full text-white"
              style={{
                background:
                  'linear-gradient(135deg, var(--primary), var(--secondary))',
              }}
            >
              <TbX size={18} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}