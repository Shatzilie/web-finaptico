import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  fetchPostBySlug,
  fetchAdjacentPost,
  fetchRelatedPosts,
  WpPost,
  featuredImageFromEmbedded,
  postCategories,
  authorFromEmbedded,
  pageTitleFromPost,
  metaDescriptionFromPost,
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

  const [prevPost, setPrevPost] = React.useState<WpPost | null>(null);
  const [nextPost, setNextPost] = React.useState<WpPost | null>(null);
  const [related, setRelated] = React.useState<WpPost[]>([]);

  // Carga principal
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

  // Carga dependiente: adyacentes + relacionados + SEO
  React.useEffect(() => {
    (async () => {
      if (!post) return;

      try {
        const [prev, next] = await Promise.all([
          fetchAdjacentPost(post, "prev"),
          fetchAdjacentPost(post, "next"),
        ]);
        setPrevPost(prev);
        setNextPost(next);
      } catch {}

      try {
        const rel = await fetchRelatedPosts(post, 6);
        setRelated(rel);
      } catch {}

      const title = pageTitleFromPost(post);
      const desc = metaDescriptionFromPost(post);
      document.title = title;

      const ensureMeta = (name: string) => {
        let m = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
        if (!m) {
          m = document.createElement("meta");
          m.setAttribute("name", name);
          document.head.appendChild(m);
        }
        return m;
      };
      ensureMeta("description")!.setAttribute("content", desc);

      const canonicalHref = window.location.origin + window.location.pathname;
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonicalHref);

      const img = featuredImageFromEmbedded(post);
      const cats = postCategories(post).map((c) => c.name);
      const author = authorFromEmbedded(post);

      const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: stripHtml(post.title?.rendered),
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: author.name ? { "@type": "Person", name: author.name } : undefined,
        image: img ? [img] : undefined,
        articleSection: cats[0],
        mainEntityOfPage: canonicalHref,
        description: desc,
      };

      const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: window.location.origin + "/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: window.location.origin + "/blog" },
          { "@type": "ListItem", position: 3, name: stripHtml(post.title?.rendered), item: canonicalHref },
        ],
      };

      document.querySelectorAll('script[data-seo="jsonld"]').forEach((n) => n.remove());
      const addLd = (obj: any) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute("data-seo", "jsonld");
        s.text = JSON.stringify(obj);
        document.head.appendChild(s);
      };
      addLd(articleLd);
      addLd(breadcrumbLd);
    })();
  }, [post]);

  const dateFmt = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })
      : "";

  const img = post ? featuredImageFromEmbedded(post) : null;
  const cats = post ? postCategories(post) : [];
  const author = post ? authorFromEmbedded(post) : {};

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <nav className="text-sm text-text-muted">
              <Link to="/" className="hover:underline">Inicio</Link> <span>/</span>{" "}
              <Link to="/blog" className="hover:underline">Blog</Link> <span>/</span>{" "}
              <span className="text-text-secondary">{post ? stripHtml(post.title?.rendered) : "…"}</span>
            </nav>
            <button onClick={() => navigate(-1)} className="text-sm text-primary hover:underline" type="button">
              ← Volver
            </button>
          </div>
        </div>

        <section className="bg-white">
          <div className="container mx-auto px-4">
            {loading && <p className="text-center text-text-muted py-16">Cargando artículo…</p>}

            {!loading && !post && !error && (
              <div className="text-center py-16">
                <h1 className="text-2xl font-semibold mb-2">Artículo no encontrado</h1>
                <p className="text-text-secondary">Puede que el enlace haya cambiado o el artículo ya no exista.</p>
              </div>
            )}

            {error && <p className="text-center text-red-600 py-16">{error}</p>}

            {post && (
              <article className="max-w-4xl mx-auto">
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

                <h1 className="text-h1 text-text-primary mb-3">
                  {stripHtml(post.title?.rendered) || "Sin título"}
                </h1>

                <p className="text-text-muted mb-6">{dateFmt(post.date)}</p>

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

                {/* CONTENIDO WP con wrapper 'wp-article' para estilos de headings */}
                <div
                  className="wp-article text-text-primary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content?.rendered || "" }}
                />

                {/* Author box (E-E-A-T) */}
                <section className="mt-10 p-6 rounded-2xl border border-border/50 bg-section-light">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
                      {author?.avatar ? (
                        <img src={author.avatar} alt={author?.name || "Autor"} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">👤</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary">{author?.name || "Autor"}</h3>
                      <p className="text-sm text-text-secondary">
                        {author?.url ? (
                          <>Perfil del autor en <a href={author.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">WordPress</a>.</>
                        ) : (
                          <>Contenido verificado por el equipo de Finaptico.</>
                        )}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Navegación Anterior / Siguiente */}
                <section className="mt-10 border-t border-border pt-6">
                  <div className="flex flex-col md:flex-row md:items-stretch gap-4">
                    <div className="flex-1">
                      {prevPost && (
                        <Link
                          to={`/blog/${prevPost.slug}`}
                          className="block rounded-xl border border-border/50 p-4 hover:border-primary transition-colors"
                        >
                          <span className="text-xs text-text-muted">← Anterior</span>
                          <p className="text-base font-medium text-text-primary">
                            {stripHtml(prevPost.title?.rendered)}
                          </p>
                        </Link>
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      {nextPost && (
                        <Link
                          to={`/blog/${nextPost.slug}`}
                          className="block rounded-xl border border-border/50 p-4 hover:border-primary transition-colors"
                        >
                          <span className="text-xs text-text-muted">Siguiente →</span>
                          <p className="text-base font-medium text-text-primary">
                            {stripHtml(nextPost.title?.rendered)}
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
                </section>

                {/* Relacionados */}
                {related && related.length > 0 && (
                  <section className="mt-12">
                    <h3 className="text-h3 text-text-primary mb-4">También te puede interesar</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {related.map((r) => {
                        const rImg = featuredImageFromEmbedded(r);
                        return (
                          <Link
                            key={r.id}
                            to={`/blog/${r.slug}`}
                            className="border border-border/40 rounded-xl overflow-hidden hover:border-primary transition-colors"
                          >
                            <div className="w-full h-40 bg-section-light overflow-hidden">
                              {rImg ? (
                                <img src={rImg} alt={stripHtml(r.title?.rendered)} className="w-full h-full object-cover" loading="lazy" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl">📝</div>
                              )}
                            </div>
                            <div className="p-4">
                              <h4 className="text-base font-semibold text-text-primary line-clamp-2">
                                {stripHtml(r.title?.rendered)}
                              </h4>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Más margen antes del footer */}
                <div className="pb-24" />
              </article>
            )}
          </div>
        </section>
      </main>

      {/* ====== ESTILOS SCOPED PARA HEADINGS H2–H6 ====== */}
      <style>{`
        /* Wrapper del contenido del post */
        .wp-article {
          font-size: 1.0625rem; /* ~17px */
          line-height: 1.75;
        }
        .wp-article p { margin: 1rem 0; }

        /* H2–H6 con jerarquía visual clara */
        .wp-article h2,
        .wp-article h3,
        .wp-article h4,
        .wp-article h5,
        .wp-article h6 {
          color: var(--color-text-primary, #101828);
          font-weight: 700;
          line-height: 1.25;
          margin: 2.25rem 0 0.75rem;
        }
        .wp-article h2 {
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          padding-left: 0.75rem;
          border-left: 4px solid #6C5CE7; /* violeta activo */
        }
        .wp-article h3 {
          font-size: clamp(1.25rem, 1.8vw, 1.5rem);
          padding-left: 0.6rem;
          border-left: 3px solid #00BFA5; /* verde menta */
        }
        .wp-article h4 {
          font-size: clamp(1.125rem, 1.4vw, 1.25rem);
          text-transform: none;
          border-bottom: 1px solid rgba(16, 24, 40, 0.08);
          padding-bottom: 0.25rem;
        }
        .wp-article h5 {
          font-size: 1.0625rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: rgba(16, 24, 40, 0.82);
        }
        .wp-article h6 {
          font-size: 0.95rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: rgba(16, 24, 40, 0.72);
        }

        /* Listas y citas para mejor legibilidad */
        .wp-article ul, .wp-article ol { margin: 1rem 0 1rem 1.25rem; }
        .wp-article li { margin: 0.25rem 0; }
        .wp-article blockquote {
          margin: 1.25rem 0;
          padding: 0.75rem 1rem;
          border-left: 4px solid #6C5CE7;
          background: #F8F7FF;
          color: #475467;
        }

        /* Imágenes dentro del contenido */
        .wp-article img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          display: block;
          margin: 1rem auto;
        }

        /* Tablas básicas */
        .wp-article table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.95rem;
        }
        .wp-article th, .wp-article td {
          border: 1px solid rgba(16, 24, 40, 0.12);
          padding: 0.5rem 0.75rem;
        }
        .wp-article th {
          background: #F9FAFB;
          text-align: left;
        }

        /* Enlaces en contenido */
        .wp-article a { color: #6C5CE7; text-decoration: underline; text-underline-offset: 2px; }
        .wp-article a:hover { color: #00BFA5; }

        /* Código inline / bloques */
        .wp-article code {
          background: #F2F4F7;
          padding: 0.15rem 0.35rem;
          border-radius: 0.375rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 0.9em;
        }
        .wp-article pre {
          background: #0B1220;
          color: #F8FAFC;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          overflow: auto;
          margin: 1rem 0;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default BlogPost;