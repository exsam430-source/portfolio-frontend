import useCountUp from '../../hooks/useCountUp';

/** Single animated statistic card — counts up when scrolled into view. */
export default function Counter({ value, label, suffix = '' }) {
  const [count, ref] = useCountUp(value);

  return (
    <div
      ref={ref}
      className="card !rounded-xl px-3 py-4 text-center"
      role="group"
      aria-label={`${value}${suffix} ${label}`}
    >
      <p className="font-display text-2xl font-extrabold tabular-nums sm:text-3xl">
        <span className="gradient-text">{count}</span>
        <span className="text-primary/80">{suffix}</span>
      </p>
      <p className="mt-1 text-[0.6875rem] font-medium leading-tight text-muted">{label}</p>
    </div>
  );
}
