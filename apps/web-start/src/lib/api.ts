const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export async function fetchCourses() {
  const response = await fetch(`${API_BASE_URL}/courses`);
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return response.json();
}

export async function fetchLinks() {
  const response = await fetch(`${API_BASE_URL}/links`);
  if (!response.ok) {
    throw new Error('Failed to fetch links');
  }
  return response.json();
}
