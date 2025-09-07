// src/lib/wp.ts
const BASE = "https://ujbnqyeqrkheflvbrwat.functions.supabase.co/smart-worker/wp";
const WP_ASSETS_ORIGIN = "https://sienna-grouse-877900.hostingersite.com";

export type WpRendered = { rendered: string };

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  title: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  _embedded?: any;
};

export type WpCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

// Posts (con categoría opcional)
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

// Categorías
export async function fetchCategories(perPage = 100, page = 1) {
  const params = new URLSearchParams();
  params.set("per_page", String(perPage));
  params.set("page", String(page));
  params.set("orderby", "name");
  params.set("order", "asc");

  const url = `${BASE}/categories?${params.toString()}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data as WpCategory[];
}

// ---------- helpers de media/excerpt/categoría ----------
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
      const candidate = toAbsoluteUrl((sizes as any)[k]?.source_url);
      if (candidate) return candidate;
    }
  }
  return toAbsoluteUrl(media?.source_url) || toAbsoluteUrl(media?.guid?.rendered);
}

export function primaryCategoryName(post: WpPost): string {
  const groups = post?._embedded?.["wp:term"];
  if (Array.isArray(groups)) {
    const cats: any[] = [];
    for (const g of groups) {
      if (Array.isArray(g)) for (const t of g) if (t?.taxonomy === "category") cats.push(t);
    }
    const first = cats[0];
    if (first?.name) return String(first.name);
  }
  return "Blog";
}

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