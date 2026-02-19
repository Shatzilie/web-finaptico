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

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  try {
    const wpRes = await fetch(
      `${WP_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia,author&per_page=1`,
      { headers: { Accept: "application/json" } }
    );

    if (!wpRes.ok) throw new Error(`WP API ${wpRes.status}`);

    const posts: WpPost[] = await wpRes.json();
    if (!posts.length) {
      return new Response("Post not found", { status: 404 });
    }

    const post = posts[0];
    const title = stripHtml(post.title.rendered);
    const description = truncate(stripHtml(post.excerpt.rendered), 160);
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
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
  <link rel="canonical" href="${postUrl}" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${postUrl}" />
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
  <meta http-equiv="refresh" content="0;url=${postUrl}" />
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <a href="${postUrl}">Leer artículo</a>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    // En caso de error, redirigir al SPA
    return Response.redirect(`${SITE_URL}/blog/${slug}`, 302);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
