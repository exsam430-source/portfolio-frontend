/**
 * Pure-CSS browser mockup used as the project thumbnail.
 * Keeping it code-generated means zero image weight (great for Lighthouse)
 * and a consistent look. Swap in a real screenshot any time by giving the
 * project an `image` property — it takes priority automatically.
 */
export default function ProjectMockup({ project }) {
  const [from, to] = project.accent;

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

  return (
    <div
      className="relative size-full overflow-hidden transition-transform duration-700 group-hover:scale-105"
      style={{ background: `linear-gradient(135deg, ${from}26, ${to}1a), #0b1220` }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-bg opacity-55" />
      <div
        className="absolute -right-10 -top-10 size-40 rounded-full blur-3xl"
        style={{ background: `${from}40` }}
      />

      {/* Browser chrome */}
      <div className="absolute inset-x-4 top-4 bottom-0 overflow-hidden rounded-t-xl border border-white/10 bg-background/72 backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
          <span className="size-2 rounded-full bg-danger/70" />
          <span className="size-2 rounded-full bg-warning/70" />
          <span className="size-2 rounded-full bg-success/70" />
          <span className="ml-2 h-3.5 flex-1 rounded-full bg-white/6" />
        </div>

        {/* Fake app layout */}
        <div className="flex h-full gap-2 p-3">
          {/* Sidebar */}
          <div className="hidden w-1/5 flex-col gap-1.5 sm:flex">
            {[70, 100, 85, 60].map((w, i) => (
              <span
                key={i}
                className="h-2 rounded-full"
                style={{ width: `${w}%`, background: i === 1 ? `${from}99` : 'rgba(148,163,184,0.18)' }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-9 flex-1 rounded-lg border border-white/8"
                  style={{ background: `linear-gradient(135deg, ${i % 2 ? to : from}22, transparent)` }}
                />
              ))}
            </div>
            <div className="flex-1 rounded-lg border border-white/8 bg-white/[0.03] p-2.5">
              <span className="mb-2 block h-2 w-1/3 rounded-full" style={{ background: `${to}88` }} />
              {[95, 80, 88, 62].map((w, i) => (
                <span
                  key={i}
                  className="mb-1.5 block h-1.5 rounded-full bg-white/10"
                  style={{ width: `${w}%` }}
                />
              ))}
              <div className="mt-2.5 flex gap-1.5">
                <span className="h-4 w-12 rounded" style={{ background: `${from}66` }} />
                <span className="h-4 w-9 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monogram watermark */}
      <span
        className="absolute bottom-3 right-4 font-display text-[0.625rem] font-bold uppercase tracking-[0.2em] opacity-40"
        style={{ color: to }}
      >
        {project.category}
      </span>
    </div>
  );
}
