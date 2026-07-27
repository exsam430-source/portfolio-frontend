import { useCallback, useState } from 'react';

/**
 * Minimal, dependency-free form hook with validate-on-blur + validate-on-submit.
 *
 * @param {object}   initialValues
 * @param {function} validateFn  (values) => ({ field: 'message' })
 */
export default function useForm(initialValues, validateFn) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const next = type === 'checkbox' ? checked : value;
      setValues((prev) => ({ ...prev, [name]: next }));

      // Clear the error as soon as the user starts fixing the field.
      setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
    },
    [],
  );

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validateFn) {
        setValues((current) => {
          const fieldError = validateFn(current)[name];
          setErrors((prev) => ({ ...prev, [name]: fieldError }));
          return current;
        });
      }
    },
    [validateFn],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  /**
   * @param {function} onValid async (values) => void
   */
  const handleSubmit = useCallback(
    (onValid) => async (e) => {
      e?.preventDefault?.();

      const validationErrors = validateFn ? validateFn(values) : {};
      const cleaned = Object.fromEntries(
        Object.entries(validationErrors).filter(([, v]) => Boolean(v)),
      );

      if (Object.keys(cleaned).length) {
        setErrors(cleaned);
        setTouched(Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

        // Move focus to the first invalid field for accessibility.
        const firstField = Object.keys(cleaned)[0];
        document.querySelector(`[name="${firstField}"]`)?.focus();
        return;
      }

      setSubmitting(true);
      try {
        await onValid(values, { reset, setErrors });
      } finally {
        setSubmitting(false);
      }
    },
    [values, validateFn, reset],
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setErrors,
    reset,
  };
}
