const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

console.log('[API] Environment variables:', {
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID ? 'SET' : 'MISSING',
  VITE_AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE,
  API_BASE_URL,
});

// This will be set by the Auth0Provider
let getAccessToken: (() => Promise<string>) | null = null;

export function setGetAccessToken(fn: () => Promise<string>) {
  console.log('[API] setGetAccessToken called - Auth0 token getter is now available');
  getAccessToken = fn;
}

async function authenticatedFetch(url: string, options: RequestInit = {}) {
  console.log('[API] authenticatedFetch called for:', url);
  
  if (!getAccessToken) {
    const error = 'Auth0 not initialized. Please login first.';
    console.error('[API]', error);
    console.error('[API] This usually means the Auth0Wrapper has not set the token getter yet.');
    throw new Error(error);
  }

  let token: string;
  try {
    console.log('[API] Retrieving access token...');
    token = await getAccessToken();
    console.log('[API] Token retrieved:', token ? `${token.substring(0, 20)}...` : 'EMPTY');
  } catch (err) {
    console.error('[API] Failed to retrieve token:', err);
    throw new Error(`Failed to get authentication token: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
  
  if (!token || typeof token !== 'string') {
    const error = 'Failed to get authentication token. Please try logging in again.';
    console.error('[API]', error, 'Token type:', typeof token);
    throw new Error(error);
  }
  
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  
  console.log('[API] Making request to:', url);
  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log('[API] Response status:', response.status, response.statusText);

  if (!response.ok) {
    let errorDetails = '';
    try {
      const errorBody = await response.text();
      errorDetails = errorBody;
      console.error('[API] Error response body:', errorBody);
    } catch (e) {
      console.error('[API] Could not read error response body');
    }
    
    const error = `API error: ${response.status} ${response.statusText}${errorDetails ? ` - ${errorDetails}` : ''}`;
    console.error('[API]', error);
    throw new Error(error);
  }

  return response;
}

export async function fetchUsers() {
  const response = await authenticatedFetch(`${API_BASE_URL}/users`);
  return response.json();
}

export async function fetchUser(id: string) {
  const response = await authenticatedFetch(`${API_BASE_URL}/users/${id}`);
  return response.json();
}

export async function fetchCourses() {
  const response = await authenticatedFetch(`${API_BASE_URL}/courses`);
  return response.json();
}

export async function fetchLinks() {
  const response = await authenticatedFetch(`${API_BASE_URL}/links`);
  return response.json();
}

export async function fetchCurrentUser() {
  const response = await authenticatedFetch(`${API_BASE_URL}/users/me`);
  return response.json();
}

export async function createUser(data: { name: string; email: string; emailVerified?: boolean }) {
  const response = await authenticatedFetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateUser(id: string, data: { name?: string; email?: string; emailVerified?: boolean }) {
  const response = await authenticatedFetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUser(id: string) {
  const response = await authenticatedFetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  return response;
}
