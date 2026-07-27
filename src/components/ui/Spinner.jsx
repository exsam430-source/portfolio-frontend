import { cn } from '../../utils/helpers';

/** Inline loading spinner for buttons and async states. */
export default function Spinner({ size = 18, className, label = 'Loading' }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent', className)}
      style={{ width: size, height: size }}
    />
  );
}
