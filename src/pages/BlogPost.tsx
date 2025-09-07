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

      // Adjacent
      try {
        const [prev, next] = await Promise.all([
          fetchAdjacentPost(post, "prev"),
          fetchAdjacentPost(post, "next"),
        ]);
        setPrevPost(prev);
        setNextPost(next);
      } catch (_) {}

      // Related
      try {
        const rel = await fetchRelatedPosts(post, 6);
        setRelated(rel);
      } catch (_) {}

      // SEO
      const title = pageTitleFromPost(post);
      const desc = metaDescriptionFromPost(post);
      document.title = title;

      // meta description
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

      // canonical
      const canonicalHref = window.location.origin + window.location.pathname;
      let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonicalHref);

      // JSON-LD (Article + Breadcrumb)
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

      // Limpia antiguos <script data-seo>
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
      ? new Date(iso).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  const img = post ? featuredImageFromEmbedded(post) : null;
  const cats = post ? postCategories(post) : [];
  const author = post ? authorFromEmbedded(post) : {};

  return (
    <div className="min-h-screen">
      <Header />

      <main className="bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb minimal y volver */}
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

        {/* Hero */}
        <section className="bg-white">
          <div className="container mx-auto px-4">
            {loading && (
              <p className="text-center text-text-muted py-16">Cargando artículo…</p>
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
              <p className="text-center text-red-600 py-16">{error}</p>
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

                {/* Contenido */}
                <div
                  className="prose max-w-none prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl prose-img:mx-auto prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:text-text-secondary text-text-primary"
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
                      <h3 className="text-lg font-semibold text-text-primary">
                        {author?.name || "Autor"}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {/*
                          Muchos WP no devuelven 'description' del autor en _embed.
                          Si quieres forzar bio, ponla en el perfil de WP y la recogeremos.
                        */}
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

                {/* Relacionados (link building interno) */}
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

      <Footer />
    </div>
  );
};

export default BlogPost;