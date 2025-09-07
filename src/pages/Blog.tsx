// src/pages/Blog.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchLatestPosts, WpPost, featuredImageFromEmbedded } from "../lib/wp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Checkbox } from "../components/ui/checkbox";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../components/ui/pagination";

function stripHtml(html?: string) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

const Blog = () => {
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);

  // Estado para WordPress y paginación
  const [wpPosts, setWpPosts] = React.useState<WpPost[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  // Función para cargar posts
  const loadPosts = React.useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data, totalPages: total } = await fetchLatestPosts(6, page, true);
      console.log(`[WP] Página ${page}:`, { posts: data.length, totalPages: total });
      setWpPosts(data);
      setTotalPages(total);
    } catch (e: any) {
      console.error("[WP] error:", e?.message || e);
      setError(e?.message || "Error cargando posts");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadPosts(currentPage);
  }, [loadPosts, currentPage]);

  // Fallback estático (si no hay datos aún)
  const staticPosts = [
    { id: 1, title: "5 KPIs que toda pyme tecnológica debe seguir", excerpt: "Los indicadores clave que te ayudarán a tomar mejores decisiones financieras y acelerar el crecimiento de tu startup.", category: "Métricas & Modelos Tech", readTime: "5 min", image: "📊", date: "15 Ene 2025" },
    { id: 2, title: "Cómo optimizar el flujo de caja en empresas en crecimiento", excerpt: "Estrategias prácticas para mejorar tu cash flow y evitar problemas de liquidez durante la expansión.", category: "Flujo de Caja", readTime: "7 min", image: "💰", date: "10 Ene 2025" },
    { id: 3, title: "Errores fiscales que debes evitar al escalar tu empresa", excerpt: "Los fallos más comunes en fiscalidad cuando tu empresa crece rápido y cómo prevenirlos.", category: "Impuestos y Optimización", readTime: "6 min", image: "⚠️", date: "5 Ene 2025" },
    { id: 4, title: "Finanzas para pymes tradicionales: digitalización paso a paso", excerpt: "Guía práctica para modernizar la gestión financiera de empresas no-tech sin complicaciones.", category: "Estrategia & Crecimiento", readTime: "8 min", image: "🔄", date: "28 Dic 2024" },
    { id: 5, title: "Preparar tu empresa para una ronda de inversión", excerpt: "Todo lo que necesitas tener listo en el área financiera antes de buscar inversores.", category: "Métricas & Modelos Tech", readTime: "10 min", image: "🚀", date: "20 Dic 2024" },
    { id: 6, title: "Automatización contable: herramientas que realmente funcionan", excerpt: "Las mejores soluciones para automatizar tu contabilidad sin perder control ni precisión.", category: "Estrategia & Crecimiento", readTime: "6 min", image: "⚡", date: "15 Dic 2024" }
  ];

  // Adaptador WP -> tu shape visual (con imagen y slug)
  const allPosts = wpPosts && wpPosts.length > 0
    ? wpPosts.map((p) => {
        const img = featuredImageFromEmbedded(p);
        return {
          id: p.id,
          slug: p.slug, // enlace por slug
          title: stripHtml(p.title?.rendered) || "Sin título",
          excerpt: stripHtml(p.excerpt?.rendered) || "",
          category: "Blog", // Por ahora todos los posts de WP son "Blog"
          readTime: "—",
          imageUrl: img, // si existe, la mostramos; si no, emoji fallback
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

  // Filtrar posts por categoría
  const filteredPosts = selectedCategory === "Todos" 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  const categories = [
    "Todos",
    "Estrategia & Crecimiento",
    "Métricas & Modelos Tech",
    "Flujo de Caja",
    "Impuestos y Optimización",
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

      {/* Filtros */}
      <section className="section-light py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1); // Reset página al cambiar categoría
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    category === selectedCategory
                      ? "bg-primary text-white"
                      : "bg-white text-text-secondary hover:bg-primary hover:text-white border border-border"
                  }`}
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
              <p className="text-center text-sm text-text-muted mb-4">Cargando posts...</p>
            )}

            {/* Mostrar total de posts encontrados */}
            <div className="mb-6 text-center">
              <p className="text-sm text-text-muted">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post encontrado' : 'posts encontrados'}
                {selectedCategory !== "Todos" && ` en "${selectedCategory}"`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="card-hover border border-border/30 group">
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

                    {/* Extracto */}
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

            {/* Paginación - solo mostrar para posts de WordPress */}
            {wpPosts && wpPosts.length > 0 && totalPages > 1 && selectedCategory === "Todos" && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    {/* Páginas */}
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Mostrar cuando no hay posts */}
            {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-text-muted text-lg">
                  No se encontraron posts en esta categoría.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
                    <strong>Responsable:</strong> Finaptico. <strong>Finalidad:</strong> responder tu solicitud. 
                    <strong> Legitimación:</strong> consentimiento. <strong>Destinatarios:</strong> no se cederán datos. 
                    <strong> Derechos:</strong> acceso, rectificación, supresión, etc. Más info en la Política de Privacidad.
                  </p>
                </div>
                
                <p className="text-xs text-text-muted">
                  No spam. Cancela cuando quieras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA para consulta */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h2 text-text-primary mb-6">¿Necesitas ayuda específica?</h2>
            <p className="text-body text-text-secondary mb-8">
              Si tienes dudas concretas sobre las finanzas de tu empresa, hablemos. La primera consulta es gratuita.
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