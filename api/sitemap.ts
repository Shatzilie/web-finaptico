const WP_BASE = "https://sienna-grouse-877900.hostingersite.com/wp-json/wp/v2";
const SITE_URL = "https://finaptico.com";

interface WpPost {
  slug: string;
  modified: string;
}

export const config = {
  runtime: "edge",
};

// Páginas estáticas con sus prioridades y frecuencias
const STATIC_PAGES = [
  { path: "/", lastmod: "2026-02-19", changefreq: "weekly", priority: "1.0" },
  { path: "/servicios", lastmod: "2026-02-19", changefreq: "monthly", priority: "0.9" },
  { path: "/sobre-mi", lastmod: "2026-02-19", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", lastmod: "2026-02-19", changefreq: "daily", priority: "0.9" },
  { path: "/preguntas-frecuentes", lastmod: "2026-02-16", changefreq: "monthly", priority: "0.8" },
  { path: "/contacto", lastmod: "2026-02-19", changefreq: "monthly", priority: "0.7" },
  { path: "/aviso-legal", lastmod: "2025-01-22", changefreq: "yearly", priority: "0.3" },
  { path: "/politica-de-privacidad", lastmod: "2025-01-22", changefreq: "yearly", priority: "0.3" },
  { path: "/politica-de-cookies", lastmod: "2025-01-22", changefreq: "yearly", priority: "0.3" },
];

export default async function handler() {
  try {
    // Obtener todos los posts publicados de WordPress (paginado)
    const posts: WpPost[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(
        `${WP_BASE}/posts?status=publish&per_page=100&page=${page}&_fields=slug,modified`,
        { headers: { Accept: "application/json" } }
      );

      if (!res.ok) break;

      const batch: WpPost[] = await res.json();
      posts.push(...batch);

      const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1");
      hasMore = page < totalPages;
      page++;
    }

    // Generar XML
    const staticUrls = STATIC_PAGES.map(
      (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ).join("\n");

    const postUrls = posts
      .map((post) => {
        const lastmod = post.modified ? post.modified.split("T")[0] : "2025-07-06";
        return `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    // Fallback: devolver un sitemap mínimo con las páginas estáticas
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES.map(
  (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
).join("\n")}
</urlset>`;

    return new Response(fallbackXml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=300",
      },
    });
  }
}
