import { motion, AnimatePresence } from 'framer-motion';
import { TbAlertCircle } from 'react-icons/tb';
import { cn } from '../../utils/helpers';

/**
 * Accessible form control wrapper.
 * Renders label, control (input | textarea | select), character counter
 * and an animated error message wired up with aria-describedby.
 */
export default function FormField({
  label,
  name,
  type = 'text',
  as = 'input',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  disabled = false,
  options = [],
  rows = 5,
  maxLength,
  autoComplete,
  hint,
  className,
}) {
  const showError = Boolean(error && touched);
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  const shared = {
    id: name,
    name,
    value,
    onChange,
    onBlur,
    disabled,
    required,
    maxLength,
    autoComplete,
    'aria-invalid': showError || undefined,
    'aria-describedby': cn(showError ? errorId : null, hint ? hintId : null) || undefined,
    className: cn('field', showError && 'field-error'),
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={name} className="field-label">
          {label}
          {required && <span className="ml-1 text-danger" aria-hidden="true">*</span>}
          {!required && <span className="ml-1.5 text-[0.6875rem] font-normal opacity-60">(optional)</span>}
        </label>

        {maxLength && as === 'textarea' && (
          <span className={cn('text-[0.6875rem] tabular-nums', value?.length > maxLength * 0.9 ? 'text-warning' : 'text-muted/70')}>
            {value?.length || 0}/{maxLength}
          </span>
        )}
      </div>

      {as === 'textarea' && <textarea {...shared} rows={rows} placeholder={placeholder} />}

      {as === 'select' && (
        <select {...shared}>
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const text = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
      )}

      {as === 'input' && <input {...shared} type={type} placeholder={placeholder} />}

      {hint && !showError && (
        <p id={hintId} className="mt-1.5 text-[0.6875rem] text-muted/70">
          {hint}
        </p>
      )}

      <AnimatePresence>
        {showError && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="error-text overflow-hidden"
          >
            <TbAlertCircle className="shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
