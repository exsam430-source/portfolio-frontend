import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TbLayoutDashboard, TbFolderPlus, TbList,
  TbLogout, TbLoader2, TbChevronLeft, TbMenu2,
  TbBrandReact, TbUser, TbX,
} from 'react-icons/tb';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';

const AdminLogin = lazy(() => import('../components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../components/admin/AdminDashboard'));
const AdminProjectList = lazy(() => import('../components/admin/AdminProjectList'));
const AdminProjectForm = lazy(() => import('../components/admin/AdminProjectForm'));

function AdminFallback() {
  return (
    <div
      className="grid min-h-screen place-items-center"
      style={{ background: 'var(--bg)' }}
    >
      <TbLoader2
        size={32}
        className="animate-spin"
        style={{ color: 'var(--primary)' }}
      />
    </div>
  );
}

function AdminLayout({ children, onLogout, adminName }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: TbLayoutDashboard, exact: true },
    { path: '/admin/projects', label: 'All Projects', icon: TbList },
    { path: '/admin/projects/new', label: 'Add Project', icon: TbFolderPlus },
  ];

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.7)' }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar panel */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-64 lg:static lg:translate-x-0 lg:flex lg:flex-col"
          style={{
            background: 'var(--surface)',
            borderRight: '1px solid var(--border)',
          }}
        >
          {/* Logo */}
          <div
            className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="grid size-9 place-items-center rounded-xl text-white font-extrabold text-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  boxShadow: '0 0 15px rgba(108,99,255,0.5)',
                }}
              >
                MA
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                  Admin Panel
                </p>
                <p className="text-[0.625rem]" style={{ color: 'var(--text-muted)' }}>
                  Portfolio CMS
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
              style={{ color: 'var(--text-muted)' }}
            >
              <TbX size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4">
            <p
              className="mb-2 px-3 text-[0.625rem] font-bold uppercase tracking-[0.18em]"
              style={{ color: 'var(--text-muted)' }}
            >
              Navigation
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.path, item.exact);
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, '', item.path);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                        setSidebarOpen(false);
                      }}
                      className="admin-nav-item"
                      style={{
                        background: active
                          ? 'color-mix(in oklab, var(--primary) 15%, transparent)'
                          : 'transparent',
                        color: active ? 'var(--primary-soft)' : 'var(--text-muted)',
                        border: active
                          ? '1px solid color-mix(in oklab, var(--primary) 25%, transparent)'
                          : '1px solid transparent',
                      }}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {item.label}
                      {active && (
                        <span
                          className="ml-auto size-1.5 rounded-full"
                          style={{ background: 'var(--primary)' }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom: User + Logout */}
          <div
            className="px-3 py-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div
              className="mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5"
              style={{ background: 'var(--surface-2)' }}
            >
              <div
                className="grid size-8 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                }}
              >
                <TbUser size={16} />
              </div>
              <div className="min-w-0">
                <p
                  className="truncate text-xs font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {adminName || 'Admin'}
                </p>
                <p
                  className="text-[0.625rem]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Administrator
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="admin-nav-item w-full"
              style={{ color: 'var(--secondary)' }}
            >
              <TbLogout size={18} />
              Sign Out
            </button>
          </div>
        </motion.aside>
      </>

      {/* ── Main Content ── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex h-16 items-center justify-between px-4 sm:px-6 sticky top-0 z-30"
          style={{
            background: 'color-mix(in oklab, var(--surface) 90%, transparent)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
              style={{ color: 'var(--text-muted)' }}
            >
              <TbMenu2 size={22} />
            </button>
            <a
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <TbChevronLeft size={16} />
              Back to Site
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="grid size-9 place-items-center rounded-lg border transition-all"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <TbBrandReact size={14} style={{ color: 'var(--primary)' }} />
              View Portfolio
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Suspense fallback={<AdminFallback />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token'));
  const [adminName, setAdminName] = useState('');
  const [verifying, setVerifying] = useState(true);

  /* Verify token on mount */
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setVerifying(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/me');
        setAdminName(data.data?.name || 'Admin');
      } catch {
        localStorage.removeItem('portfolio_admin_token');
        setToken(null);
      } finally {
        setVerifying(false);
      }
    };
    verify();
  }, [token]);

  const handleLogin = (newToken, name) => {
    localStorage.setItem('portfolio_admin_token', newToken);
    setToken(newToken);
    setAdminName(name || 'Admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
    setAdminName('');
    navigate('/admin');
  };

  if (verifying) return <AdminFallback />;

  if (!token) {
    return (
      <Suspense fallback={<AdminFallback />}>
        <AdminLogin onLogin={handleLogin} />
      </Suspense>
    );
  }

  return (
    <AdminLayout onLogout={handleLogout} adminName={adminName}>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<AdminProjectList />} />
        <Route path="projects/new" element={<AdminProjectForm />} />
        <Route path="projects/edit/:id" element={<AdminProjectForm />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
}