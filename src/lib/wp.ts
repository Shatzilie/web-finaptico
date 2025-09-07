// src/lib/wp.ts
// URL base de tu función en Supabase (smart-worker con ruta normalizada)
const BASE =
  "https://ujbnqyeqrkheflvbrwat.functions.supabase.co/smart-worker/wp";

/**
 * Dominio público donde vive TU WordPress.
 * Se usa para convertir rutas relativas (/wp-content/...) a URLs absolutas.
 */
const WP_ASSETS_ORIGIN =
  "https://sienna-grouse-877900.hostingersite.com"; // <- cambia si mueves WP a otro dominio

export type WpRendered = { rendered: string };

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  title: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  _embedded?: any; // necesario para imagen destacada y categorías
};

export async function fetchLatestPosts(
  perPage = 6,
  page = 1,
  embed = true
) {
  const params = new URLSearchParams();
  params.set("per_page", String(perPage));
  params.set("page", String(page));
  // 🔒 Orden explícito por fecha descendente (más nuevos primero)
  params.set("orderby", "date");
  params.set("order", "desc");
  if (embed) params.set("_embed", "1"); // trae featured media y términos

  const url = `${BASE}/posts?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  const total = Number(res.headers?.get?.("X-WP-Total") ?? 0);
  const totalPages = Number(res.headers?.get?.("X-WP-TotalPages") ?? 0);
  return { data: data as WpPost[], total, totalPages };
}

// ---------- Helpers de media ----------
function toAbsoluteUrl(u?: string | null): string | null {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;      // ya absoluta
  if (u.startsWith("/")) return `${WP_ASSETS_ORIGIN}${u}`;
  return `${WP_ASSETS_ORIGIN}/${u}`;
}

export function featuredImageFromEmbedded(post: WpPost): string | null {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;

  const sizes = media?.media_details?.sizes;
  if (sizes && typeof sizes === "object") {
    const order = ["large", "medium_large", "medium", "full", "thumbnail"];
    for (const key of order) {
      const candidate = toAbsoluteUrl(sizes[key]?.source_url);
      if (candidate) return candidate;
    }
    for (const k of Object.keys(sizes)) {
      const candidate = toAbsoluteUrl(sizes[k]?.source_url);
      if (candidate) return candidate;
    }
  }
  return toAbsoluteUrl(media?.source_url) || toAbsoluteUrl(media?.guid?.rendered);
}

// ---------- Helpers de categorías ----------
export function primaryCategoryName(post: WpPost): string {
  const groups = post?._embedded?.["wp:term"];
  if (Array.isArray(groups)) {
    const cats: any[] = [];
    for (const g of groups) {
      if (Array.isArray(g)) {
        for (const t of g) {
          if (t?.taxonomy === "category") cats.push(t);
        }
      }
    }
    const first = cats[0];
    if (first?.name) return String(first.name);
  }
  return "Blog";
}

// ---------- Helpers de excerpt ----------
function stripHtml(html?: string) {
  if (!html) return "";
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (div) {
    div.innerHTML = html;
    return (div.textContent || div.innerText || "").trim();
  }
  return html.replace(/<[^>]*>/g, "").trim();
}

export function shortExcerpt(post: WpPost, maxWords = 28): string {
  const base =
    stripHtml(post?.excerpt?.rendered) ||
    stripHtml(post?.content?.rendered) ||
    "";
  const words = base.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return base;
  return words.slice(0, maxWords).join(" ") + "…";
}