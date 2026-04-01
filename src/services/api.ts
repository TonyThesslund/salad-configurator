const API_BASE_URL = "https://fresse-api.onrender.com/api";

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function getBowls() {
  return fetchJson("bowls");
}

export async function getCategories() {
  return fetchJson("categories");
}

export async function getIngredients() {
  return fetchJson("ingredients");
}
