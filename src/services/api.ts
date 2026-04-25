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

export async function getPrices<T = unknown>(token: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/prices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

   if (!response.ok) {
      throw new Error(`Failed to fetch prices: ${response.status}`);
    }
  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Väärä sähköposti tai salasana");
  }

  return response.json();
}

export async function saveRecipe(token: string, recipeData: {
  name: string;
  bowlId: number;
  ingredientsIds: number[];
}) {
  const response = await fetch(`${API_BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to save recipe: ${response.status}`);
  }
  return response.json();
}