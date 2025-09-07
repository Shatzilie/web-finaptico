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
  _embedded?: any; // necesario para leer imagen destacada
};

// Obtiene los últimos posts
export async function fetchLatestPosts(perPage = 6, page = 1, embed = true) {
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

/**
 * Intenta obtener la URL de la imagen destacada de varias formas.
 * WP a veces no rellena source_url pero sí media_details.sizes.* o guid.rendered.
 */
export function featuredImageFromEmbedded(post: WpPost): string | null {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;

  // 1) Tamaños comunes (prioriza medios optimizados)
  const sizes = media?.media_details?.sizes;
  if (sizes && typeof sizes === "object") {
    // preferimos 'large' > 'medium_large' > 'medium' > 'full'
    const preferredOrder = ["large", "medium_large", "medium", "full", "thumbnail"];
    for (const key of preferredOrder) {
      const candidate = sizes[key]?.source_url;
      if (candidate) return candidate;
    }
    // si no encaja el orden, prueba el primero que tenga source_url
    for (const k of Object.keys(sizes)) {
      const candidate = sizes[k]?.source_url;
      if (candidate) return candidate;
    }
  }

  // 2) Campo directo
  if (media?.source_url) return media.source_url;

  // 3) GUID (muchos WP lo traen aquí)
  if (media?.guid?.rendered) return media.guid.rendered;

  return null;
}