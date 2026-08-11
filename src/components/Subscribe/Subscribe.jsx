import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  TbMail, TbCircleCheck, TbSparkles, TbUsers, TbSend,
} from 'react-icons/tb';

import Spinner from '../ui/Spinner';
import useForm from '../../hooks/useForm';
import { useUI } from '../../context';
import { subscribeEmail, fetchSubscriberCount } from '../../api/services';
import { validateSubscribe } from '../../utils/validators';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';

const PERKS = [
  'New project launches & case studies',
  'Practical MERN and JavaScript tips',
  'Availability & service announcements',
];

export default function Subscribe() {
  const { hasSubscribed, markSubscribed } = useUI();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(null);

  const {
    values, errors, touched, isSubmitting,
    handleChange, handleBlur, handleSubmit, setErrors, reset,
  } = useForm({ email: '', website: '' }, validateSubscribe);

  useEffect(() => {
    let cancelled = false;
    fetchSubscriberCount()
      .then((n) => { if (!cancelled && typeof n === 'number') setCount(n); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const toastId = toast.loading('Subscribing…');
    try {
      const res = await subscribeEmail(data.email, 'portfolio-newsletter');
      toast.success(res.message || "You're subscribed!", {
        id: toastId,
        duration: 5000,
      });
      markSubscribed();
      setDone(true);
      setCount((c) =>
        typeof c === 'number' && !res?.data?.alreadySubscribed ? c + 1 : c
      );
      reset();
    } catch (err) {
      toast.error(err.message, { id: toastId });
      if (err.fieldErrors?.email) setErrors({ email: err.fieldErrors.email });
    }
  });

  const showError = Boolean(errors.email && touched.email);

  return (
    <section
      id="subscribe"
      className="section !py-16 md:!py-20"
      aria-labelledby="subscribe-heading"
    >
      <div className="container-x">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="card card-gradient-edge relative overflow-hidden p-7 sm:p-10 lg:p-12"
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div
              className="absolute -left-20 -top-24 rounded-full"
              style={{
                width: '18rem',
                height: '18rem',
                background:
                  'radial-gradient(circle, rgba(108,99,255,0.16) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute -bottom-28 -right-16 rounded-full"
              style={{
                width: '18rem',
                height: '18rem',
                background:
                  'radial-gradient(circle, rgba(255,101,132,0.16) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(108,99,255,0.06) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(108,99,255,0.06) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            {/* Copy */}
            <div>
              <motion.span variants={fadeUp} className="eyebrow mb-5">
                <TbSparkles size={13} aria-hidden="true" />
                Newsletter
              </motion.span>

              <motion.h2
                id="subscribe-heading"
                variants={fadeUp}
                className="text-3xl font-extrabold leading-tight sm:text-4xl"
                style={{ color: 'var(--text)' }}
              >
                Stay{' '}
                <span className="gradient-text">Updated</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-md text-[0.9375rem] leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Subscribe to get updates on new projects, services and tech
                insights. No spam — unsubscribe in one click.
              </motion.p>

              <motion.ul
                variants={stagger(0.07)}
                className="mt-6 space-y-2.5"
              >
                {PERKS.map((perk) => (
                  <motion.li
                    key={perk}
                    variants={fadeUp}
                    className="flex items-center gap-2.5 text-[0.875rem]"
                    style={{ color: 'var(--text)', opacity: 0.85 }}
                  >
                    <TbCircleCheck
                      size={16}
                      className="shrink-0"
                      style={{ color: 'var(--accent)' }}
                      aria-hidden="true"
                    />
                    {perk}
                  </motion.li>
                ))}
              </motion.ul>

              {typeof count === 'number' && count > 0 && (
                <motion.p
                  variants={fadeUp}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs"
                  style={{
                    background:
                      'color-mix(in oklab, var(--surface) 60%, transparent)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <TbUsers
                    size={14}
                    style={{ color: 'var(--primary)' }}
                    aria-hidden="true"
                  />
                  <strong
                    className="tabular-nums"
                    style={{ color: 'var(--text)' }}
                  >
                    {count.toLocaleString()}
                  </strong>
                  {count === 1 ? 'developer subscribed' : 'developers subscribed'}
                </motion.p>
              )}
            </div>

            {/* Form */}
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                {done || hasSubscribed ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="rounded-2xl border p-7 text-center"
                    style={{
                      background: 'rgba(67,233,123,0.08)',
                      borderColor: 'rgba(67,233,123,0.25)',
                    }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="mx-auto grid size-14 place-items-center rounded-2xl"
                      style={{
                        background: 'rgba(67,233,123,0.15)',
                        color: 'var(--accent)',
                      }}
                    >
                      <TbCircleCheck size={30} aria-hidden="true" />
                    </motion.span>
                    <h3
                      className="mt-5 text-lg font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      You're on the list! 🎯
                    </h3>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Check your inbox for a welcome email.
                    </p>
                    {done && (
                      <button
                        type="button"
                        onClick={() => setDone(false)}
                        className="mt-5 text-xs font-semibold underline-offset-4 hover:underline"
                        style={{ color: 'var(--primary-soft)' }}
                      >
                        Subscribe another email
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="rounded-2xl border p-6 backdrop-blur"
                    style={{
                      background:
                        'color-mix(in oklab, var(--bg) 45%, transparent)',
                      borderColor: 'var(--border)',
                    }}
                    aria-label="Newsletter subscription form"
                  >
                    <label
                      htmlFor="subscribe-email"
                      className="field-label"
                    >
                      Your email address
                    </label>

                    {/* Honeypot */}
                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <input
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.website}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col gap-2.5 sm:flex-row">
                      <div className="relative flex-1">
                        <TbMail
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                          style={{ color: 'var(--text-muted)' }}
                          aria-hidden="true"
                        />
                        <input
                          id="subscribe-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          aria-invalid={showError || undefined}
                          aria-describedby={
                            showError ? 'subscribe-error' : undefined
                          }
                          className={`field !pl-10 ${showError ? 'field-error' : ''}`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary shrink-0 !px-6"
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner size={16} label="Subscribing" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <TbSend size={16} aria-hidden="true" />
                            Subscribe
                          </>
                        )}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showError && (
                        <motion.p
                          id="subscribe-error"
                          role="alert"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="error-text overflow-hidden"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <p
                      className="mt-3.5 text-[0.6875rem] leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      No spam. Unsubscribe anytime with one click.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}