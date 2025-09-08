// src/pages/Blog.tsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchLatestPosts,
  fetchCategories,
  WpPost,
  WpCategory,
  featuredImageFromEmbedded,
  primaryCategoryName,
  shortExcerpt,
} from "../lib/wp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Checkbox } from "../components/ui/checkbox";

function stripHtml(html?: string) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

// Query params helpers
function useQuery() {
  const loc = useLocation();
  return new URLSearchParams(loc.search);
}
function usePageParam() {
  const q = useQuery();
  const p = Number(q.get("page") || "1");
  return Number.isFinite(p) && p > 0 ? p : 1;
}
function useCategorySlugParam() {
  const q = useQuery();
  const slug = q.get("category");
  return slug || null;
}

const PER_PAGE = 6;

const Blog = () => {
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const navigate = useNavigate();
  const currentPage = usePageParam();
  const categorySlug = useCategorySlugParam();

  // Estado WP
  const [wpPosts, setWpPosts] = React.useState<WpPost[] | null>(null);
  const [categories, setCategories] = React.useState<WpCategory[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [total, setTotal] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(1);

  // Cargar categorías (solo con posts) y luego posts iniciales
  React.useEffect(() => {
    (async () => {
      try {
        const cats = await fetchCategories(); // ya viene hide_empty=true
        setCategories(cats);
      } catch (e) {
        console.error("[WP] categories error:", e);
      }
    })();
  }, []);

  // Cargar posts cuando cambien página o categoría (espera a tener categorías si hay slug)
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        let categoryId: number | undefined = undefined;
        if (categorySlug) {
          // buscamos el id de esa categoría entre las cargadas
          const c = categories.find((x) => x.slug === categorySlug);
          if (!c) {
            // si aún no están cargadas, espera al próximo render (cuando lleguen)
            setLoading(false);
            return;
          }
          categoryId = c.id;
        }

        const { data, total, totalPages } = await fetchLatestPosts(
          PER_PAGE,
          currentPage,
          true,
          categoryId
        );
        setWpPosts(data);
        setTotal(total);
        setTotalPages(Math.max(totalPages, 1));
      } catch (e: any) {
        setError(e?.message || "Error cargando posts");
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, categorySlug, categories]); // 👈 cuando llegan categorías, reintenta

  // Navegación preservando el otro parámetro
  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages || 1);
    const qs = new URLSearchParams();
    if (categorySlug) qs.set("category", categorySlug);
    qs.set("page", String(next));
    navigate(`/blog?${qs.toString()}`);
  };

  const selectCategory = (slug: string | null) => {
    const qs = new URLSearchParams();
    if (slug) qs.set("category", slug);
    qs.set("page", "1"); // al cambiar categoría, empezamos en página 1
    navigate(`/blog?${qs.toString()}`);
  };

  // Fallback estático si no hay datos aún
  const staticPosts = [
    { id: 1, title: "5 KPIs que toda pyme tecnológica debe seguir", excerpt: "Los indicadores clave que te ayudarán a tomar mejores decisiones financieras y acelerar el crecimiento de tu startup.", category: "SaaS/Tech", readTime: "5 min", image: "📊", date: "15 Ene 2025" },
    { id: 2, title: "Cómo optimizar el flujo de caja en empresas en crecimiento", excerpt: "Estrategias prácticas para mejorar tu cash flow y evitar problemas de liquidez durante la expansión.", category: "Cashflow", readTime: "7 min", image: "💰", date: "10 Ene 2025" },
    { id: 3, title: "Errores fiscales que debes evitar al escalar tu empresa", excerpt: "Los fallos más comunes en fiscalidad cuando tu empresa crece rápido y cómo prevenirlos.", category: "Fiscalidad", readTime: "6 min", image: "⚠️", date: "5 Ene 2025" },
    { id: 4, title: "Finanzas para pymes tradicionales: digitalización paso a paso", excerpt: "Guía práctica para modernizar la gestión financiera de empresas no-tech sin complicaciones.", category: "Finanzas Pyme", readTime: "8 min", image: "🔄", date: "28 Dic 2024" },
    { id: 5, title: "Preparar tu empresa para una ronda de inversión", excerpt: "Todo lo que necesitas tener listo en el área financiera antes de buscar inversores.", category: "SaaS/Tech", readTime: "10 min", image: "🚀", date: "20 Dic 2024" },
    { id: 6, title: "Automatización contable: herramientas que realmente funcionan", excerpt: "Las mejores soluciones para automatizar tu contabilidad sin perder control ni precisión.", category: "Finanzas Pyme", readTime: "6 min", image: "⚡", date: "15 Dic 2024" }
  ];

  // Adaptador WP -> tu shape visual
  const renderedPosts =
    wpPosts && wpPosts.length > 0
      ? wpPosts.map((p) => {
          const img = featuredImageFromEmbedded(p);
          return {
            id: p.id,
            slug: p.slug,
            title: stripHtml(p.title?.rendered) || "Sin título",
            excerpt: shortExcerpt(p, 26),
            category: primaryCategoryName(p),
            readTime: "—",
            imageUrl: img,
            date: new Date(p.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          };
        })
      : staticPosts.map((s) => ({
          ...s,
          slug: String(s.id),
          imageUrl: null as string | null,
        }));

  // UI de categorías: "Todos" + categorías de WP (ya vienen sin vacías)
  const categoryButtons: { label: string; slug: string | null }[] = [
    { label: "Todos", slug: null },
    ...categories.map((c) => ({ label: c.name, slug: c.slug })),
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-h1 text-text-primary mb-6">Blog de finanzas para pymes</h1>
            <p className="text-body text-text-secondary">
              Consejos prácticos, casos reales y estrategias que funcionan para hacer crecer tu empresa con finanzas sanas.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros por categoría */}
      <section className="section-light py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categoryButtons.map(({ label, slug }) => {
                const active = (slug || null) === (categorySlug || null);
                return (
                  <button
                    key={slug ?? "all"}
                    type="button"
                    onClick={() => selectCategory(slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                      active
                        ? "border-transparent bg-[#6C5CE7] text-white"
                        : "bg-white text-text-secondary border-border hover:bg-[#00BFA5] hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de posts */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {error && <p className="text-center text-sm text-red-600 mb-4">{error}</p>}
            {loading && <p className="text-center text-sm text-text-muted mb-4">Cargando artículos…</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderedPosts.map((post) => (
                <article key={post.id} className="card-hover border border-border/30 group">
                  <div className="space-y-4">
                    {/* Media en cards del blog (mantener imagen entera 704x384 adaptada) */}
                    <div
                      className="w-full rounded-lg flex items-center justify-center overflow-hidden bg-section-light"
                      style={{ aspectRatio: "704 / 384" }}
                    >
                      {("imageUrl" in post && post.imageUrl) ? (
                        <img
                          src={post.imageUrl as string}
                          alt={post.title}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      ) : (
                        <span className="text-4xl">{(post as any).image ?? "📝"}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {"category" in post ? (post as any).category : "Blog"}
                      </span>
                      <span className="text-sm text-text-muted">
                        {"readTime" in post ? (post as any).readTime : "—"}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 leading-tight">
                      <Link to={`/blog/${(post as any).slug}`} className="link-underline">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-base text-text-secondary leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="pt-2 border-t border-border">
                      <span className="text-sm text-text-muted">{post.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-50"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1 || loading}
                aria-label="Página anterior"
              >
                ← Anterior
              </button>

              <span className="px-3 py-2 text-sm text-text-secondary">
                Página {currentPage} de {totalPages}
              </span>

              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-50"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages || loading}
                aria-label="Página siguiente"
              >
                Siguiente →
              </button>
            </div>

            {total > 0 && (
              <p className="text-center text-xs text-text-muted mt-2">
                {total} artículos {categorySlug ? "en la categoría seleccionada" : ""}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter y resto igual */}
      <section className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/30">
              <h2 className="text-h2 text-text-primary mb-4">¿Te ha resultado útil?</h2>
              <p className="text-body text-text-secondary mb-6">
                Recibe consejos financieros prácticos directamente en tu email. Una vez por semana, sin spam.
              </p>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="btn-primary whitespace-nowrap disabled:opacity-50" disabled={!email || !privacy}>
                    Suscribirme
                  </button>
                </div>

                <div className="flex items-start space-x-3 text-left">
                  <Checkbox
                    id="privacy-newsletter"
                    checked={privacy}
                    onCheckedChange={(checked) => setPrivacy(checked as boolean)}
                    className="mt-0.5"
                  />
                  <label htmlFor="privacy-newsletter" className="text-sm text-text-secondary leading-5 cursor-pointer">
                    He leído y acepto la{" "}
                    <Link to="/privacidad" className="text-primary hover:underline font-medium">Política de Privacidad</Link>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;