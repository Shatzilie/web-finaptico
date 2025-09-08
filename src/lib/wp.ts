// src/lib/wp.ts
const BASE = "https://ujbnqyeqrkheflvbrwat.functions.supabase.co/smart-worker/wp";
const WP_ASSETS_ORIGIN = "https://sienna-grouse-877900.hostingersite.com";

export type WpRendered = { rendered: string };
export type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  title: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  _embedded?: any;
};
export type WpCategory = { id: number; name: string; slug: string; count: number };

export async function fetchLatestPosts(
  perPage = 6,
  page = 1,
  embed = true,
  categoryId?: number
) {
  const params = new URLSearchParams();
  params.set("per_page", String(perPage));
  params.set("page", String(page));
  params.set("orderby", "date");
  params.set("order", "desc");
  if (embed) params.set("_embed", "1");
  if (categoryId) params.set("categories", String(categoryId));

  const url = `${BASE}/posts?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  const total = Number(res.headers?.get?.("X-WP-Total") ?? 0);
  const totalPages = Number(res.headers?.get?.("X-WP-TotalPages") ?? 0);
  return { data: data as WpPost[], total, totalPages };
}

// --- Obtener un post por slug ---
export async function fetchPostBySlug(slug: string, embed = true) {
  const params = new URLSearchParams();
  params.set("slug", slug);
  if (embed) params.set("_embed", "1");
  const url = `${BASE}/posts?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return (Array.isArray(data) && data.length > 0) ? (data[0] as WpPost) : null;
}

// --- Categorías y helpers ---
export async function fetchCategories(perPage = 100, page = 1) {
  const params = new URLSearchParams();
  params.set("per_page", String(perPage));
  params.set("page", String(page));
  params.set("orderby", "name");
  params.set("order", "asc");
  params.set("hide_empty", "true");
  const url = `${BASE}/categories?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

  const BAD_SLUGS = new Set(["uncategorized","sin-categoria","sin-categoría"]);
  return (data as WpCategory[])
    .filter((c) => (c?.count ?? 0) > 0)
    .filter((c) => {
      const slug = (c?.slug || "").toLowerCase();
      const name = (c?.name || "").toLowerCase().trim();
      if (BAD_SLUGS.has(slug)) return false;
      if (name === "uncategorized" || name === "sin categoría" || name === "sin categoria") return false;
      return true;
    });
}

export function primaryCategoryName(post: WpPost): string {
  const cats = postCategoryObjects(post);
  return cats[0]?.name || "Blog";
}
export function postCategories(post: WpPost): { name: string; slug: string; id?: number }[] {
  return postCategoryObjects(post);
}
export function postCategoryIds(post: WpPost): number[] {
  return postCategoryObjects(post).map((c) => c.id!).filter(Boolean);
}
function postCategoryObjects(post: WpPost): { name: string; slug: string; id?: number }[] {
  const out: { name: string; slug: string; id?: number }[] = [];
  const groups = post?._embedded?.["wp:term"];
  if (Array.isArray(groups)) {
    for (const g of groups) {
      if (Array.isArray(g)) {
        for (const t of g) {
          if (t?.taxonomy === "category") {
            out.push({ name: String(t.name), slug: String(t.slug), id: Number(t.id) });
          }
        }
      }
    }
  }
  return out;
}

// --- Imagen destacada ---
function toAbsoluteUrl(u?: string | null): string | null {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
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

// --- Excerpt corto ---
function stripHtml(html?: string) {
  if (!html) return "";
  const div = typeof document !== "undefined" ? document.createElement("div") : null;
  if (div) { div.innerHTML = html; return (div.textContent || div.innerText || "").trim(); }
  return html.replace(/<[^>]*>/g, "").trim();
}
export function shortExcerpt(post: WpPost, maxWords = 28): string {
  const base = stripHtml(post?.excerpt?.rendered) || stripHtml(post?.content?.rendered) || "";
  const words = base.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return base;
  return words.slice(0, maxWords).join(" ") + "…";
}

// --- Autor (para E-E-A-T) ---
export function authorFromEmbedded(post: WpPost): { name?: string; url?: string; avatar?: string } {
  const a = post?._embedded?.author?.[0];
  return {
    name: a?.name,
    url: a?.link,
    avatar: a?.avatar_urls?.["96"] || a?.avatar_urls?.["48"] || a?.avatar_urls?.["24"],
  };
}

// --- Posts relacionados por categoría ---
export async function fetchRelatedPosts(post: WpPost, limit = 6) {
  const cats = postCategoryIds(post);
  if (cats.length === 0) return [];
  const params = new URLSearchParams();
  params.set("per_page", String(limit));
  params.set("page", "1");
  params.set("orderby", "date");
  params.set("order", "desc");
  params.set("_embed", "1");
  params.set("categories", String(cats[0])); // 1ª categoría como pivote
  params.set("exclude", String(post.id));    // excluir el actual
  const url = `${BASE}/posts?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data as WpPost[];
}

// --- Post anterior / siguiente (por fecha GLOBAL, sin filtrar por categoría) ---
export async function fetchAdjacentPost(post: WpPost, direction: "prev" | "next") {
  const params = new URLSearchParams();
  params.set("per_page", "1");
  params.set("_embed", "1");
  params.set("orderby", "date");

  if (direction === "prev") {
    // post anterior = el inmediatamente ANTERIOR en fecha (más antiguo)
    params.set("order", "desc");
    params.set("before", post.date);
  } else {
    // post siguiente = el inmediatamente POSTERIOR en fecha (más nuevo)
    params.set("order", "asc");
    params.set("after", post.date);
  }

  params.set("exclude", String(post.id));

  const url = `${BASE}/posts?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return (Array.isArray(data) && data.length > 0) ? (data[0] as WpPost) : null;
}

// --- SEO helpers ---
export function pageTitleFromPost(p?: WpPost | null) {
  return p ? `${stripHtml(p.title?.rendered)} | Blog` : "Blog";
}
export function metaDescriptionFromPost(p?: WpPost | null) {
  return p ? shortExcerpt(p, 32) : "Artículos sobre finanzas para pymes.";
}