const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Base API fetch helper.
 * Automatically attaches Authorization header when token is provided.
 * Gracefully catches network errors and non-200 responses, returning null
 * so that callers can fall back to local mock data.
 */
export const apiFetch = async (path, options = {}) => {
  const { token, ...fetchOptions } = options;
  const url = `${BASE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!res.ok) {
      console.warn(`API request to ${path} returned status ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`Network error fetching ${path}:`, err.message);
    return null;
  }
};
