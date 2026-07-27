import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { TbMail, TbCircleCheck, TbSparkles, TbUsers, TbSend } from 'react-icons/tb';

import Spinner from '../ui/Spinner';
import useForm from '../../hooks/useForm';
import { useUI } from '../../context';
import { subscribeEmail, fetchSubscriberCount } from '../../api/services';
import { validateSubscribe } from '../../utils/validators';
import { fadeUp, stagger, viewportOnce } from '../../utils/motion';
import { cn } from '../../utils/helpers';

const PERKS = [
  'New project launches & case studies',
  'Practical MERN and JavaScript tips',
  'Availability & service announcements',
];

export default function Subscribe() {
  const { hasSubscribed, markSubscribed } = useUI();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(null);

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setErrors, reset } =
    useForm({ email: '', website: '' }, validateSubscribe);

  /* Optional social proof — silently skipped when the API is unreachable. */
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
      toast.success(res.message || "You're subscribed!", { id: toastId, duration: 5000 });
      markSubscribed();
      setDone(true);
      setCount((c) => (typeof c === 'number' && !res?.data?.alreadySubscribed ? c + 1 : c));
      reset();
    } catch (err) {
      toast.error(err.message, { id: toastId });
      if (err.fieldErrors?.email) setErrors({ email: err.fieldErrors.email });
    }
  });

  const showError = Boolean(errors.email && touched.email);

  return (
    <section id="subscribe" className="section !py-16 md:!py-20" aria-labelledby="subscribe-heading">
      <div className="container-x">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="card card-gradient-edge relative overflow-hidden p-7 sm:p-10 lg:p-12"
        >
          {/* Decorative background */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-20 -top-24 size-72 rounded-full bg-primary/16 blur-[90px]" />
            <div className="absolute -bottom-28 -right-16 size-72 rounded-full bg-secondary/16 blur-[90px]" />
            <div className="absolute inset-0 grid-bg opacity-45" />
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
              >
                Stay <span className="gradient-text">Updated</span>
              </motion.h2>

              <motion.p variants={fadeUp} className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                Subscribe to get updates on new projects, services and tech insights. No spam, no
                filler — unsubscribe in one click whenever you like.
              </motion.p>

              <motion.ul variants={stagger(0.07)} className="mt-6 space-y-2.5">
                {PERKS.map((perk) => (
                  <motion.li key={perk} variants={fadeUp} className="flex items-center gap-2.5 text-[0.875rem] text-content/85">
                    <TbCircleCheck size={16} className="shrink-0 text-success" aria-hidden="true" />
                    {perk}
                  </motion.li>
                ))}
              </motion.ul>

              {typeof count === 'number' && count > 0 && (
                <motion.p variants={fadeUp} className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-muted">
                  <TbUsers size={14} className="text-primary" aria-hidden="true" />
                  <strong className="tabular-nums text-content">{count.toLocaleString()}</strong>
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
                    className="rounded-2xl border border-success/25 bg-success/8 p-7 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 15, delay: 0.1 }}
                      className="mx-auto grid size-14 place-items-center rounded-2xl bg-success/15 text-success"
                    >
                      <TbCircleCheck size={30} aria-hidden="true" />
                    </motion.span>
                    <h3 className="mt-5 text-lg font-bold">You're on the list! 🎯</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Check your inbox for a welcome email. If it isn't there in a minute, take a
                      look in your spam folder.
                    </p>
                    {done && (
                      <button
                        type="button"
                        onClick={() => setDone(false)}
                        className="mt-5 text-xs font-semibold text-primary-soft underline-offset-4 hover:underline"
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
                    className="rounded-2xl border border-line bg-background/45 p-6 backdrop-blur"
                    aria-label="Newsletter subscription form"
                  >
                    <label htmlFor="subscribe-email" className="field-label">
                      Your email address
                    </label>

                    {/* Honeypot */}
                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <input
                        name="website" tabIndex={-1} autoComplete="off"
                        value={values.website} onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col gap-2.5 sm:flex-row">
                      <div className="relative flex-1">
                        <TbMail
                          size={17}
                          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
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
                          aria-describedby={showError ? 'subscribe-error' : undefined}
                          className={cn('field !pl-10', showError && 'field-error')}
                        />
                      </div>

                      <button type="submit" disabled={isSubmitting} className="btn btn-primary shrink-0 !px-6">
                        {isSubmitting ? (
                          <><Spinner size={16} label="Subscribing" /> Sending…</>
                        ) : (
                          <><TbSend size={16} aria-hidden="true" /> Subscribe</>
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

                    <p className="mt-3.5 text-[0.6875rem] leading-relaxed text-muted">
                      By subscribing you agree to receive occasional emails. Your address is never
                      sold or shared, and every email includes a one-click unsubscribe link.
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
