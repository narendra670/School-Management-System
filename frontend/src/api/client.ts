const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${url}`, { headers, ...options });
  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API Error: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  auth: {
    signup: (data: { name: string; email: string; password: string }) =>
      request<{ token: string; user: any }>('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      request<{ token: string; user: any }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    me: () => request<{ user: any }>('/auth/me'),
  },
  dashboard: {
    get: () => request<any>('/dashboard'),
  },
  students: {
    getAll: () => request<any[]>('/students'),
    getById: (id: string) => request<any>(`/students/${id}`),
    create: (data: any) => request<any>('/students', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<any>(`/students/${id}`, { method: 'DELETE' }),
  },
  teachers: {
    getAll: () => request<any[]>('/teachers'),
    getById: (id: string) => request<any>(`/teachers/${id}`),
    create: (data: any) => request<any>('/teachers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/teachers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<any>(`/teachers/${id}`, { method: 'DELETE' }),
  },
  classes: {
    getAll: () => request<any[]>('/classes'),
    getById: (id: string) => request<any>(`/classes/${id}`),
    create: (data: any) => request<any>('/classes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/classes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<any>(`/classes/${id}`, { method: 'DELETE' }),
  },
  attendance: {
    getAll: () => request<any[]>('/attendance'),
    create: (data: any) => request<any>('/attendance', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/attendance/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    getStats: (classId: string) => request<any>(`/attendance/stats/${classId}`),
  },
  grades: {
    getAll: () => request<any[]>('/grades'),
    create: (data: any) => request<any>('/grades', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => request<any>(`/grades/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<any>(`/grades/${id}`, { method: 'DELETE' }),
    getStats: (classId: string) => request<any>(`/grades/stats/${classId}`),
  },
};
