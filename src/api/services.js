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
