export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const getProducts = () => api('/products');
export const createProduct = (product) => api('/products', { method: 'POST', body: JSON.stringify(product) });
export const updateProduct = (id, product) => api(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) });
export const deleteProduct = (id) => api(`/products/${id}`, { method: 'DELETE' });

export const getOrders = () => api('/orders');
export const createOrder = (order) => api('/orders', { method: 'POST', body: JSON.stringify(order) });
export const updateOrderStatus = (id, status) => api(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
export const deleteOrder = (id) => api(`/orders/${id}`, { method: 'DELETE' });

export const getCategories = () => api('/categories');
export const createCategory = (category) => api('/categories', { method: 'POST', body: JSON.stringify(category) });
export const deleteCategory = (id) => api(`/categories/${id}`, { method: 'DELETE' });
