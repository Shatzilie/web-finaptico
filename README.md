# Finaptico

Sitio web de [finaptico.com](https://finaptico.com) — dirección financiera externa para pymes tech y negocios digitales en España.

## Stack técnico

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Edge Functions)
- WordPress headless (blog backend)
- Vercel (hosting, auto-deploy desde GitHub)

## Desarrollo

Los cambios se realizan editando archivos directamente en GitHub. El deploy a producción es automático vía Vercel.

## Estructura

- `src/pages/` — Páginas del sitio
- `src/components/` — Componentes reutilizables
- `src/lib/` — Utilidades y acceso a APIs
- `api/` — API routes de Vercel (OG tags, sitemap dinámico)
- `public/` — Assets estáticos
- `supabase/` — Edge Functions de Supabase
