import axios from 'axios';

/**
 * Shared Axios instance.
 * Base URL comes from VITE_API_URL; falling back to the relative "/api"
 * lets the Vite dev proxy handle local development with zero CORS setup.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

/* Attach the admin JWT when one is stored (used by the dashboard routes). */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Normalises every failure into a predictable shape so UI code can rely on
 * `error.message` and `error.fieldErrors` without defensive checks.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;

    let message = 'Something went wrong. Please try again.';
    let fieldErrors = {};

    if (error.code === 'ECONNABORTED') {
      message = 'The request timed out. Please check your connection and retry.';
    } else if (!res) {
      message = 'Cannot reach the server. Please make sure the API is running.';
    } else {
      message = res.data?.message || message;
      if (Array.isArray(res.data?.errors)) {
        fieldErrors = res.data.errors.reduce(
          (acc, e) => ({ ...acc, [e.field]: acc[e.field] || e.message }),
          {},
        );
      }
      if (res.status === 401) localStorage.removeItem('portfolio_admin_token');
    }

    return Promise.reject(Object.assign(new Error(message), {
      status: res?.status ?? 0,
      fieldErrors,
      isNetworkError: !res,
    }));
  },
);

export default api;
