const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(BACKEND_URL + endpoint).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      return res.json();
    });
}

export async function mutateBackend<TData = unknown, TResult = unknown>(
  endpoint: string,
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  data?: TData,
): Promise<TResult> {
  const res = await fetch(BACKEND_URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText || res.statusText}`);
  }

  if (res.status === 204 || method === 'DELETE') {
    return undefined as TResult;
  }

  return res.json();
}
