// src/lib/wp.ts
// URL base de tu función en Supabase (smart-worker con ruta normalizada)
const BASE =
  "https://ujbnqyeqrkheflvbrwat.functions.supabase.co/smart-worker/wp";

/**
 * Dominio público donde vive TU WordPress.
 * Lo usamos para convertir rutas relativas (/wp-content/...) a URLs absolutas.
 */
const WP_ASSETS_ORIGIN =
  "https://sienna-grouse-877900.hostingersite.com"; // ← si cambias el dominio de WP, actualiza esto

export type WpRendered = { rendered: string };

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  title: WpRendered;
  excerpt?: WpRendered;
  _embedded?: any; // necesario para leer imagen destacada
};

export async function fetchLatestPosts(
  perPage = 6,
  page = 1,
  embed = true
) {
  const params = new URLSearchParams();
  params.set("per_page", String(perPage));
  params.set("page", String(page));
  if (embed) params.set("_embed", "1");

  const url = `${BASE}/posts?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  const total = Number(res.headers?.get?.("X-WP-Total") ?? 0);
  const totalPages = Number(res.headers?.get?.("X-WP-TotalPages") ?? 0);
  return { data: data as WpPost[], total, totalPages };
}

// --- helpers de normalización de URL de imagen ---
function toAbsoluteUrl(u?: string | null): string | null {
  if (!u) return null;
  // ya absoluta
  if (/^https?:\/\//i.test(u)) return u;
  // ruta relativa que empieza por "/"
  if (u.startsWith("/")) return `${WP_ASSETS_ORIGIN}${u}`;
  // lo que sea (p.ej. sin slash inicial) -> añadimos "/" entre medias
  return `${WP_ASSETS_ORIGIN}/${u}`;
}

/**
 * Intenta obtener la URL de la imagen destacada de varias formas y la normaliza a absoluta.
 */
export function featuredImageFromEmbedded(post: WpPost): string | null {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;

  // 1) tamaños optimizados
  const sizes = media?.media_details?.sizes;
  if (sizes && typeof sizes === "object") {
    const preferredOrder = ["large", "medium_large", "medium", "full", "thumbnail"];
    for (const key of preferredOrder) {
      const candidate = toAbsoluteUrl(sizes[key]?.source_url);
      if (candidate) return candidate;
    }
    for (const k of Object.keys(sizes)) {
      const candidate = toAbsoluteUrl(sizes[k]?.source_url);
      if (candidate) return candidate;
    }
  }

  // 2) campos directos
  const direct = toAbsoluteUrl(media?.source_url) || toAbsoluteUrl(media?.guid?.rendered);
  if (direct) return direct;

  return null;
}