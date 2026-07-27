import { motion } from 'framer-motion';
import { TbSearchOff } from 'react-icons/tb';

/** Friendly placeholder for filtered lists that return nothing. */
export default function EmptyState({
  icon: Icon = TbSearchOff,
  title = 'Nothing here yet',
  description = 'There is no content to display for the current selection.',
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-line/80 bg-surface/30 px-6 py-16 text-center"
    >
      <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Icon size={26} aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
