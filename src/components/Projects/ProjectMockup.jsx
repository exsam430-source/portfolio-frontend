export default function ProjectMockup({ project }) {
  const accentFrom = project.accentFrom || project.accent?.[0] || '#6c63ff';
  const accentTo = project.accentTo || project.accent?.[1] || '#ff6584';

  /* If the project has a thumbnail from Cloudinary, show it */
  if (project.thumbnail?.url) {
    return (
      <img
        src={project.thumbnail.url}
        alt={`${project.title} interface preview`}
        loading="lazy"
        decoding="async"
        width={640}
        height={400}
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }

  /* If legacy image prop exists */
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} interface preview`}
        loading="lazy"
        decoding="async"
        width={640}
        height={400}
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }

  /* Generated mockup */
  return (
    <div
      className="relative size-full overflow-hidden transition-transform duration-700 group-hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${accentFrom}26, ${accentTo}1a), var(--surface)`,
      }}
      aria-hidden="true"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(108,99,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(108,99,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      <div
        className="absolute -right-10 -top-10 size-40 rounded-full blur-3xl"
        style={{ background: `${accentFrom}40` }}
      />

      {/* Browser chrome */}
      <div
        className="absolute inset-x-4 top-4 bottom-0 overflow-hidden rounded-t-xl"
        style={{
          background: 'color-mix(in oklab, var(--bg) 72%, transparent)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Browser bar */}
        <div
          className="flex items-center gap-1.5 border-b px-3 py-2"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <span className="size-2 rounded-full" style={{ background: 'rgba(239,68,68,0.7)' }} />
          <span className="size-2 rounded-full" style={{ background: 'rgba(245,158,11,0.7)' }} />
          <span className="size-2 rounded-full" style={{ background: 'rgba(16,185,129,0.7)' }} />
          <span
            className="ml-2 h-3.5 flex-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />
        </div>

        {/* Fake layout */}
        <div className="flex h-full gap-2 p-3">
          <div className="hidden w-1/5 flex-col gap-1.5 sm:flex">
            {[70, 100, 85, 60].map((w, i) => (
              <span
                key={i}
                className="h-2 rounded-full"
                style={{
                  width: `${w}%`,
                  background: i === 1 ? `${accentFrom}99` : 'rgba(148,163,184,0.18)',
                }}
              />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-9 flex-1 rounded-lg"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: `linear-gradient(135deg, ${i % 2 ? accentTo : accentFrom}22, transparent)`,
                  }}
                />
              ))}
            </div>
            <div
              className="flex-1 rounded-lg p-2.5"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span
                className="mb-2 block h-2 w-1/3 rounded-full"
                style={{ background: `${accentTo}88` }}
              />
              {[95, 80, 88, 62].map((w, i) => (
                <span
                  key={i}
                  className="mb-1.5 block h-1.5 rounded-full"
                  style={{ width: `${w}%`, background: 'rgba(255,255,255,0.1)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category watermark */}
      <span
        className="absolute bottom-3 right-4 font-display text-[0.625rem] font-bold uppercase tracking-[0.2em] opacity-40"
        style={{ color: accentTo }}
      >
        {project.category}
      </span>
    </div>
  );
}