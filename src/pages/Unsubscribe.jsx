import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { TbMailOff, TbCircleCheck, TbArrowLeft, TbAlertCircle } from 'react-icons/tb';

import Spinner from '../components/ui/Spinner';
import { unsubscribeEmail } from '../api/services';
import { EMAIL_RE } from '../utils/validators';
import { useProfile } from '../context';
import { cn } from '../utils/helpers';

/**
 * One-click unsubscribe landing page.
 * If a ?token= is present it unsubscribes automatically; otherwise it shows
 * a manual email form.
 */
export default function Unsubscribe() {
  const profile = useProfile();
  const [params] = useSearchParams();
  const token = params.get('token');

  const [status, setStatus] = useState(token ? 'loading' : 'idle');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  /* Auto-unsubscribe when arriving from an email link. */
  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    unsubscribeEmail({ token })
      .then((res) => {
        if (cancelled) return;
        setStatus('done');
        setMessage(res.message || 'You have been unsubscribed.');
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus('error');
        setMessage(err.message);
      });

    return () => { cancelled = true; };
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setStatus('loading');
    const toastId = toast.loading('Processing…');

    try {
      const res = await unsubscribeEmail({ email: email.trim() });
      toast.success(res.message, { id: toastId });
      setStatus('done');
      setMessage(res.message);
    } catch (err) {
      toast.error(err.message, { id: toastId });
      setStatus('idle');
      setError(err.message);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-5 py-16">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-1/4 size-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="card card-gradient-edge w-full max-w-md p-8 text-center"
      >
        {status === 'done' ? (
          <>
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-success/15 text-success">
              <TbCircleCheck size={28} aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-xl font-bold">Unsubscribed</h1>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{message}</p>
            <p className="mt-4 text-[0.8125rem] text-muted">
              Changed your mind? You can resubscribe from the newsletter section any time.
            </p>
          </>
        ) : status === 'error' ? (
          <>
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-danger/15 text-danger">
              <TbAlertCircle size={28} aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-xl font-bold">Link not valid</h1>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{message}</p>
            <button
              type="button"
              onClick={() => { setStatus('idle'); setMessage(''); }}
              className="btn btn-ghost mt-6 w-full"
            >
              Unsubscribe manually instead
            </button>
          </>
        ) : (
          <>
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/12 text-primary">
              <TbMailOff size={28} aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-xl font-bold">Unsubscribe</h1>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              Enter the email address you subscribed with and you'll be removed from the list
              immediately.
            </p>

            <form onSubmit={onSubmit} className="mt-6 text-left" noValidate>
              <label htmlFor="unsub-email" className="field-label">Email address</label>
              <input
                id="unsub-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                disabled={status === 'loading'}
                aria-invalid={Boolean(error) || undefined}
                className={cn('field', error && 'field-error')}
              />
              {error && <p role="alert" className="error-text">{error}</p>}

              <button type="submit" disabled={status === 'loading'} className="btn btn-primary mt-4 w-full">
                {status === 'loading' ? (
                  <><Spinner size={16} label="Processing" /> Processing…</>
                ) : (
                  'Confirm unsubscribe'
                )}
              </button>
            </form>
          </>
        )}

        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-soft hover:underline">
          <TbArrowLeft size={14} aria-hidden="true" />
          Back to {profile.name.split(' ')[0]}'s portfolio
        </Link>
      </motion.div>
    </main>
  );
}
