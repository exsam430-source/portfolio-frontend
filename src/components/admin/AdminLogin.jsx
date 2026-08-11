import { useState } from 'react';
import { motion } from 'framer-motion';
import { TbLock, TbMail, TbEye, TbEyeOff, TbLoader2, TbShieldCheck } from 'react-icons/tb';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { useTheme } from '../../context/ThemeContext';

export default function AdminLogin({ onLogin }) {
  const { isDark } = useTheme();
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!values.email.trim()) e.email = 'Email is required.';
    if (!values.password) e.password = 'Password is required.';
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const toastId = toast.loading('Signing in...');
    try {
      const { data } = await api.post('/auth/login', values);
      toast.success(data.message || 'Welcome back!', { id: toastId });
      onLogin(data.data.token, data.data.user?.name);
    } catch (err) {
      toast.error(err.message, { id: toastId });
      setErrors({ password: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="grid min-h-screen place-items-center px-4"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(108,99,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(108,99,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="card card-gradient-edge relative w-full max-w-md p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.2 }}
            className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              boxShadow: '0 0 30px rgba(108,99,255,0.6)',
            }}
          >
            <TbShieldCheck size={30} color="white" />
          </motion.div>

          <h1
            className="text-2xl font-extrabold"
            style={{ color: 'var(--text)' }}
          >
            Admin Access
          </h1>
          <p
            className="mt-1.5 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="admin-email" className="field-label">
              Email Address
            </label>
            <div className="relative">
              <TbMail
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
                value={values.email}
                onChange={(e) => {
                  setValues((v) => ({ ...v, email: e.target.value }));
                  setErrors((er) => ({ ...er, email: undefined }));
                }}
                disabled={loading}
                className={`field !pl-10 ${errors.email ? 'field-error' : ''}`}
              />
            </div>
            {errors.email && (
              <p className="error-text mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="admin-password" className="field-label">
              Password
            </label>
            <div className="relative">
              <TbLock
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={values.password}
                onChange={(e) => {
                  setValues((v) => ({ ...v, password: e.target.value }));
                  setErrors((er) => ({ ...er, password: undefined }));
                }}
                disabled={loading}
                className={`field !pl-10 !pr-10 ${errors.password ? 'field-error' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <TbEyeOff size={17} /> : <TbEye size={17} />}
              </button>
            </div>
            {errors.password && (
              <p className="error-text mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full !py-3.5 mt-2"
          >
            {loading ? (
              <>
                <TbLoader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <TbLock size={18} />
                Sign In to Admin
              </>
            )}
          </button>
        </form>

        <p
          className="mt-6 text-center text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          This area is restricted to administrators only.{' '}
          <a href="/" style={{ color: 'var(--primary-soft)' }}>
            ← Back to portfolio
          </a>
        </p>
      </motion.div>
    </div>
  );
}