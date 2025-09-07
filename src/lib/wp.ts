// src/lib/wp.ts
// URL base de tu función en Supabase (smart-worker con ruta normalizada)
const BASE = "https://ujbnqyeqrkheflvbrwat.functions.supabase.co/smart-worker/wp";

export type WpRendered = { rendered: string };
export type WpPost = {
  id: number;
  slug: string;
  date: string;
  title: WpRendered;
  excerpt?: WpRendered;
  // puedes añadir más campos si luego los necesitas
};

// Obtiene los últimos posts (no cambia tu UI; solo trae datos)
export async function fetchLatestPosts(perPage = 5, page = 1, embed = true) {
  const params = new URLSearchParams();
  params.set("per_page", String(perPage));
  params.set("page", String(page));
  if (embed) params.set("_embed", "1");

  const url = `${BASE}/posts?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  // te devuelvo también headers por si luego quieres paginar
  const total = Number(res.headers?.get?.("X-WP-Total") ?? 0);
  const totalPages = Number(res.headers?.get?.("X-WP-TotalPages") ?? 0);
  return { data: data as WpPost[], total, totalPages };
}