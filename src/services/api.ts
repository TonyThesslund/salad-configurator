const API_BASE_URL = "https://fresse-api.onrender.com/api";

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function getBowls<T = unknown>(): Promise<T> {
  return fetchJson<T>("bowls");
}

export async function getBaseIngredients<T = unknown>(): Promise<T> {
  return fetchJson<T>("baseingredients");
}

export async function getCategories<T = unknown>(typeId: number): Promise<T> {
  return fetchJson<T>(`categories?type_id=${typeId}`);
}

export async function getIngredients<T = unknown>(): Promise<T> {
  return fetchJson<T>("ingredients");
}
