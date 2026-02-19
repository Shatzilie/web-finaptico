import { next } from "@vercel/edge";

const CRAWLER_UAS = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot|Discordbot|Embedly|Quora Link Preview|Showyoubot|outbrain|pinterest|vkShare|W3C_Validator|Googlebot|bingbot/i;

export default function middleware(request: Request) {
  const ua = request.headers.get("user-agent") || "";
  const url = new URL(request.url);

  // Solo interceptar rutas /blog/:slug (no /blog ni /blog/)
  const match = url.pathname.match(/^\/blog\/([^/]+)$/);
  if (!match) return next();

  // Solo interceptar crawlers
  if (!CRAWLER_UAS.test(ua)) return next();

  // Reescribir a la API function que genera HTML con OG tags
  const slug = match[1];
  const ogUrl = new URL(`/api/og`, url.origin);
  ogUrl.searchParams.set("slug", slug);

  return fetch(ogUrl.toString());
}

export const config = {
  matcher: "/blog/:path*",
};
