import type { VercelRequest, VercelResponse } from "@vercel/node";

const WP_BASE = "https://sienna-grouse-877900.hostingersite.com/wp-json/wp/v2";
const SITE_URL = "https://finaptico.com";
const FALLBACK_IMAGE = `${SITE_URL}/og-image.png`;

interface WpPost {
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  slug: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      media_details?: { sizes?: { full?: { source_url?: string } } };
    }>;
    author?: Array<{ name?: string }>;
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&#8217;/g, "'").replace(/&#8220;|&#8221;/g, '"').replace(/&amp;/g, "&").trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = req.query.slug as string;
  if (!slug) {
    res.status(400).send("Missing slug");
    return;
  }

  try {
    const wpRes = await fetch(
      `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,author&per_page=1`,
      { headers: { Accept: "application/json" } }
    );

    if (!wpRes.ok) throw new Error(`WP API ${wpRes.status}`);

    const posts: WpPost[] = await wpRes.json();
    if (!posts.length) {
      res.status(404).send("Post not found");
      return;
    }

    const post = posts[0];
    const title = stripHtml(post.title.rendered);
    const description = truncate(stripHtml(post.excerpt.rendered), 160);
    const url = `${SITE_URL}/blog/${post.slug}`;
    const author = post._embedded?.author?.[0]?.name || "Finaptico";

    // Imagen destacada
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    const image =
      media?.media_details?.sizes?.full?.source_url ||
      media?.source_url ||
      FALLBACK_IMAGE;

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)} | Finaptico</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${url}" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:width" content="1536" />
  <meta property="og:image:height" content="1024" />
  <meta property="og:site_name" content="Finaptico" />
  <meta property="og:locale" content="es_ES" />
  <meta property="article:published_time" content="${post.date}" />
  <meta property="article:modified_time" content="${post.modified}" />
  <meta property="article:author" content="${escapeHtml(author)}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />

  <!-- Redirect real users to the SPA -->
  <meta http-equiv="refresh" content="0;url=${url}" />
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <a href="${url}">Leer artículo</a>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(html);
  } catch (err: any) {
    // En caso de error, redirigir al SPA
    res.redirect(302, `${SITE_URL}/blog/${slug}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
