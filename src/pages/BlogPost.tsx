import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  fetchPostBySlug,
  WpPost,
  featuredImageFromEmbedded,
  postCategories,
} from "../lib/wp";

function stripHtml(html?: string) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = React.useState<WpPost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const p = await fetchPostBySlug(slug || "");
        setPost(p);
      } catch (e: any) {
        setError(e?.message || "Error cargando el artículo");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const dateFmt = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  const img = post ? featuredImageFromEmbedded(post) : null;
  const cats = post ? postCategories(post) : [];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Navegación simple */}
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-primary hover:underline"
            type="button"
          >
            ← Volver
          </button>
        </div>

        {/* Hero */}
        <section className="bg-white">
          <div className="container mx-auto px-4">
            {loading && (
              <p className="text-center text-text-muted py-16">
                Cargando artículo…
              </p>
            )}

            {!loading && !post && !error && (
              <div className="text-center py-16">
                <h1 className="text-2xl font-semibold mb-2">Artículo no encontrado</h1>
                <p className="text-text-secondary">
                  Puede que el enlace haya cambiado o el artículo ya no exista.
                </p>
              </div>
            )}

            {error && (
              <p className="text-center text-red-600 py-16">
                {error}
              </p>
            )}

            {post && (
              <article className="max-w-4xl mx-auto">
                {/* Categorías */}
                {cats.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cats.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/blog?category=${encodeURIComponent(c.slug)}&page=1`}
                        className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-sm hover:bg-primary hover:text-white transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Título */}
                <h1 className="text-h1 text-text-primary mb-3">
                  {stripHtml(post.title?.rendered) || "Sin título"}
                </h1>

                {/* Fecha */}
                <p className="text-text-muted mb-6">{dateFmt(post.date)}</p>

                {/* Imagen destacada */}
                {img && (
                  <div className="w-full h-80 bg-section-light rounded-2xl overflow-hidden mb-8">
                    <img
                      src={img}
                      alt={stripHtml(post.title?.rendered)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}

                {/* Contenido WP */}
                <div
                  className="prose max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl prose-img:mx-auto prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:text-text-secondary text-text-primary"
                  // Confiamos en el HTML que tú publicas en tu WP
                  dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }}
                />

                {/* CTA inferior opcional */}
                <div className="mt-12 border-t border-border pt-6 flex items-center justify-between">
                  <Link to="/blog" className="text-primary hover:underline">
                    ← Ver más artículos
                  </Link>
                  {cats[0] && (
                    <Link
                      to={`/blog?category=${encodeURIComponent(cats[0].slug)}&page=1`}
                      className="text-primary hover:underline"
                    >
                      Más en {cats[0].name} →
                    </Link>
                  )}
                </div>
              </article>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;