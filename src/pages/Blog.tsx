// src/pages/Blog.tsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  fetchLatestPosts,
  WpPost,
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

// Lee ?page=N del querystring
function usePageParam() {
  const loc = useLocation();
  const sp = new URLSearchParams(loc.search);
  const p = Number(sp.get("page") || "1");
  return Number.isFinite(p) && p > 0 ? p : 1;
}

const PER_PAGE = 6;

const Blog = () => {
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const navigate = useNavigate();
  const currentPage = usePageParam();

  // Estado WP
  const [wpPosts, setWpPosts] = React.useState<WpPost[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, total, totalPages } = await fetchLatestPosts(PER_PAGE, currentPage, true);
        setWpPosts(data);
        setTotal(total);
        setTotalPages(Math.max(totalPages, 1));
      } catch (e: any) {
        setError(e?.message || "Error cargando posts");
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage]);

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

  // Filtrado por categoría
  const filteredPosts = selectedCategory === "Todos" 
    ? renderedPosts 
    : renderedPosts.filter(post => post.category === selectedCategory);

  const categories = [
    "Todos",
    "SaaS/Tech", 
    "Cashflow",
    "Fiscalidad",
    "Finanzas Pyme"
  ];

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages || 1);
    navigate(`/blog?page=${next}`);
    // el efecto useEffect volverá a dispararse por el cambio en currentPage
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-h1 text-text-primary mb-6">
              Blog de finanzas para pymes
            </h1>
            <p className="text-body text-text-secondary">
              Consejos prácticos, casos reales y estrategias que funcionan para
              hacer crecer tu empresa con finanzas sanas.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="section-light py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    category === selectedCategory
                      ? "bg-primary text-white hover:bg-secondary hover:text-secondary-foreground"
                      : "bg-white text-text-secondary hover:bg-secondary hover:text-secondary-foreground border border-border"
                  }`}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de posts */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {error && (
              <p className="text-center text-sm text-red-600 mb-4">{error}</p>
            )}
            {loading && (
              <p className="text-center text-sm text-text-muted mb-4">
                Cargando artículos…
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="card-hover border border-border/30 group"
                >
                  <div className="space-y-4">
                    {/* Media */}
                    <div className="w-full h-48 bg-section-light rounded-lg flex items-center justify-center text-4xl overflow-hidden">
                      {("imageUrl" in post && post.imageUrl) ? (
                        <img
                          src={post.imageUrl as string}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      ) : (
                        <span>{(post as any).image ?? "📝"}</span>
                      )}
                    </div>

                    {/* Categoría y tiempo de lectura */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {"category" in post ? (post as any).category : "Blog"}
                      </span>
                      <span className="text-sm text-text-muted">
                        {"readTime" in post ? (post as any).readTime : "—"}
                      </span>
                    </div>

                    {/* Título (link por slug) */}
                    <h2 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 leading-tight">
                      <Link to={`/blog/${(post as any).slug}`} className="link-underline">
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-base text-text-secondary leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Fecha */}
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

              {/* Indicador de página */}
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

            {/* (Opcional) también muestra total artículos */}
            {total > 0 && (
              <p className="text-center text-xs text-text-muted mt-2">
                {total} artículos
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/30">
              <h2 className="text-h2 text-text-primary mb-4">
                ¿Te ha resultado útil?
              </h2>
              <p className="text-body text-text-secondary mb-6">
                Recibe consejos financieros prácticos directamente en tu email. Una
                vez por semana, sin spam.
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
                  <button
                    className="btn-primary whitespace-nowrap disabled:opacity-50"
                    disabled={!email || !privacy}
                  >
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
                  <label
                    htmlFor="privacy-newsletter"
                    className="text-sm text-text-secondary leading-5 cursor-pointer"
                  >
                    He leído y acepto la{" "}
                    <Link
                      to="/privacidad"
                      className="text-primary hover:underline font-medium"
                    >
                      Política de Privacidad
                    </Link>
                  </label>
                </div>

                <div className="bg-section-light p-4 rounded-lg">
                  <p className="text-xs text-text-muted leading-relaxed">
                    <strong>Responsable:</strong> Finaptico.{" "}
                    <strong>Finalidad:</strong> responder tu solicitud.{" "}
                    <strong>Legitimación:</strong> consentimiento.{" "}
                    <strong>Destinatarios:</strong> no se cederán datos.{" "}
                    <strong>Derechos:</strong> acceso, rectificación, supresión,
                    etc. Más info en la Política de Privacidad.
                  </p>
                </div>

                <p className="text-xs text-text-muted">No spam. Cancela cuando quieras.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA para consulta */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h2 text-text-primary mb-6">
              ¿Necesitas ayuda específica?
            </h2>
            <p className="text-body text-text-secondary mb-8">
              Si tienes dudas concretas sobre las finanzas de tu empresa, hablemos. La
              primera consulta es gratuita.
            </p>
            <Link to="/contacto" className="btn-primary text-lg px-8 py-4">
              Reserva tu consulta gratuita
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-white py-16"></div>
      <Footer />
    </div>
  );
};

export default Blog;