// API helper: wraps fetch with project defaults (base path + cookies).
export async function apiFetch(path, opts = {}) {
  const response = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }
  return response.status === 204 ? null : response.json();
}
