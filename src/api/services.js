import api from './axios';

/** Contact form → POST /api/contact */
export const submitContact = async (payload) => {
  const { data } = await api.post('/contact', payload);
  return data;
};

/** Project order → POST /api/orders */
export const submitOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data;
};

/** Dropdown options → GET /api/orders/options (falls back to local data) */
export const fetchOrderOptions = async () => {
  const { data } = await api.get('/orders/options');
  return data.data;
};

/** Newsletter → POST /api/subscribe */
export const subscribeEmail = async (email, source = 'website') => {
  const { data } = await api.post('/subscribe', { email, source });
  return data;
};

/** Newsletter → DELETE /api/subscribe */
export const unsubscribeEmail = async ({ email, token }) => {
  const { data } = await api.delete('/subscribe', { data: { email, token } });
  return data;
};

/** Public subscriber count → GET /api/subscribe/count */
export const fetchSubscriberCount = async () => {
  const { data } = await api.get('/subscribe/count');
  return data.data.count;
};

/** Server health → GET /api/health */
export const fetchHealth = async () => {
  const { data } = await api.get('/health');
  return data.data;
};

export const fetchProjects = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'all') query.set('category', params.category);
  if (params.featured) query.set('featured', 'true');
  if (params.limit) query.set('limit', params.limit);

  const { data } = await api.get(`/projects?${query.toString()}`);
  return data;
};

/** Fetch single project by slug → GET /api/projects/:slug */
export const fetchProjectBySlug = async (slug) => {
  const { data } = await api.get(`/projects/${slug}`);
  return data;
};

/** Admin: fetch all projects → GET /api/projects/admin/all */
export const fetchAllProjectsAdmin = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await api.get(`/projects/admin/all?${query}`);
  return data;
};

/** Admin: create project → POST /api/projects */
export const createProject = async (formData) => {
  const { data } = await api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

/** Admin: update project → PUT /api/projects/:id */
export const updateProject = async (id, formData) => {
  const { data } = await api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

/** Admin: delete project → DELETE /api/projects/:id */
export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

/** Admin: toggle featured → PATCH /api/projects/:id/toggle-featured */
export const toggleFeatured = async (id) => {
  const { data } = await api.patch(`/projects/${id}/toggle-featured`);
  return data;
};

/** Admin: update status → PATCH /api/projects/:id/status */
export const updateProjectStatus = async (id, status) => {
  const { data } = await api.patch(`/projects/${id}/status`, { status });
  return data;
};

/** Admin: delete single image → DELETE /api/projects/:id/image/:imageId */
export const deleteProjectImage = async (projectId, imageId) => {
  const { data } = await api.delete(`/projects/${projectId}/image/${imageId}`);
  return data;
};
