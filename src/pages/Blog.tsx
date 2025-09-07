// 1) Importa React y el helper
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchLatestPosts, WpPost } from "../lib/wp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Checkbox } from "../components/ui/checkbox";

const Blog = () => {
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  
  // 2) (Opcional) estado interno para tener los datos disponibles
  const [wpPosts, setWpPosts] = React.useState<WpPost[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // 3) Efecto que trae los posts al montar el componente
  React.useEffect(() => {
    (async () => {
      try {
        const { data, total, totalPages } = await fetchLatestPosts(5, 1, true);
        setWpPosts(data);
        console.log("[WP] posts:", data);
        console.log("[WP] total:", total, "totalPages:", totalPages);
      } catch (e: any) {
        console.error("[WP] error:", e?.message || e);
        setError(e?.message || "Error cargando posts");
      }
    })();
  }, []);

  // ⬇️ A partir de aquí DEJA TU DISEÑO EXACTO como lo tenías.
  // No añado ni quito nada de tu JSX existente. Si quieres, puedes
  // usar 'wpPosts' más adelante sin romper el layout.

  const posts = [
    {
      id: 1,
      title: "5 KPIs que toda pyme tecnológica debe seguir",
      excerpt: "Los indicadores clave que te ayudarán a tomar mejores decisiones financieras y acelerar el crecimiento de tu startup.",
      category: "SaaS/Tech",
      readTime: "5 min",
      image: "📊",
      date: "15 Ene 2025"
    },
    {
      id: 2,
      title: "Cómo optimizar el flujo de caja en empresas en crecimiento",
      excerpt: "Estrategias prácticas para mejorar tu cash flow y evitar problemas de liquidez durante la expansión.",
      category: "Cashflow",
      readTime: "7 min",
      image: "💰",
      date: "10 Ene 2025"
    },
    {
      id: 3,
      title: "Errores fiscales que debes evitar al escalar tu empresa",
      excerpt: "Los fallos más comunes en fiscalidad cuando tu empresa crece rápido y cómo prevenirlos.",
      category: "Fiscalidad",
      readTime: "6 min",
      image: "⚠️",
      date: "5 Ene 2025"
    },
    {
      id: 4,
      title: "Finanzas para pymes tradicionales: digitalización paso a paso",
      excerpt: "Guía práctica para modernizar la gestión financiera de empresas no-tech sin complicaciones.",
      category: "Finanzas Pyme",
      readTime: "8 min",
      image: "🔄",
      date: "28 Dic 2024"
    },
    {
      id: 5,
      title: "Preparar tu empresa para una ronda de inversión",
      excerpt: "Todo lo que necesitas tener listo en el área financiera antes de buscar inversores.",
      category: "SaaS/Tech",
      readTime: "10 min",
      image: "🚀",
      date: "20 Dic 2024"
    },
    {
      id: 6,
      title: "Automatización contable: herramientas que realmente funcionan",
      excerpt: "Las mejores soluciones para automatizar tu contabilidad sin perder control ni precisión.",
      category: "Finanzas Pyme",
      readTime: "6 min",
      image: "⚡",
      date: "15 Dic 2024"
    }
  ];

  const categories = ["Todos", "Estrategia & Crecimiento", "Métricas & Modelos Tech", "Flujo de Caja", "Impuestos y Optimización"];

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
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    category === "Todos"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="card-hover border border-border/30 group">
                  <div className="space-y-4">
                    {/* Imagen placeholder */}
                    <div className="w-full h-48 bg-section-light rounded-lg flex items-center justify-center text-4xl">
                      {post.image}
                    </div>
                    
                    {/* Categoría y tiempo de lectura */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-sm text-text-muted">{post.readTime}</span>
                    </div>
                    
                    {/* Título */}
                    <h2 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-200 leading-tight">
                      <Link to={`/blog/${post.id}`} className="link-underline">
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

      {/* Espacio para el Footer CTA */}
      <div className="bg-white py-16"></div>

      <Footer />
    </div>
  );
};

export default Blog;