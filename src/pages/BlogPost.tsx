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

// ---------- TOC utils ----------
type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildTocAndAnchors(html: string): { html: string; toc: TocItem[] } {
  const container = document.createElement("div");
  container.innerHTML = html;

  const seen = new Set<string>();
  const toc: TocItem[] = [];

  const headings = Array.from(
    container.querySelectorAll("h2, h3")
  ) as HTMLHeadingElement[];

  for (const h of headings) {
    const level: 2 | 3 = h.tagName.toLowerCase() === "h2" ? 2 : 3;
    const text = (h.textContent || "").trim();
    if (!text) continue;

    let base = slugify(text);
    if (!base) base = (level === 2 ? "h2" : "h3") + "-" + Math.random().toString(36).slice(2, 7);

    let id = base;
    let inc = 2;
    while (seen.has(id)) {
      id = `${base}-${inc++}`;
    }
    seen.add(id);
    h.id = id;

    // añade un enlace de ancla pequeño al lado del título (opcional, UX)
    const anchor = document.createElement("a");
    anchor.href = `#${id}`;
    anchor.setAttribute("aria-label", "Enlace a este apartado");
    anchor.className = "wp-anchor";
    anchor.textContent = "¶";
    h.appendChild(anchor);

    toc.push({ id, text, level });
  }

  return { html: container.innerHTML, toc };
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

  // TOC + HTML con anchors
  const [toc, setToc] = React.useState<TocItem[]>([]);
  const [htmlWithAnchors, setHtmlWithAnchors] = React.useState<string>("");

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

  // Procesa contenido para TOC (H2/H3) en cuanto llega el post
  React.useEffect(() => {
    if (!post?.content?.rendered) {
      setHtmlWithAnchors("");
      setToc([]);
      return;
    }
    const { html, toc } = buildTocAndAnchors(post.content.rendered);
    setHtmlWithAnchors(html);
    setToc(toc);
  }, [post?.content?.rendered]);

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
              <article className="max-w-5xl mx-auto">
                {/* Encabezado */}
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

                {/* Imagen destacada (704x384 visibles, sin recorte) */}
                {img && (
                  <div
                    className="w-full rounded-2xl overflow-hidden mb-8 bg-section-light flex items-center justify-center"
                    style={{ aspectRatio: "704 / 384" }} // mantiene proporción exacta
                  >
                    <img
                      src={img}
                      alt={stripHtml(post.title?.rendered)}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}

                {/* Layout 2 columnas: TOC sticky a la derecha en desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                  {/* CONTENIDO WP con wrapper 'wp-article' para estilos de headings y anclas */}
                  <div
                    className="wp-article text-text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: htmlWithAnchors || post.content?.rendered || "" }}
                  />

                  {/* TOC */}
                  {toc.length > 0 && (
                    <aside className="lg:sticky lg:top-24 h-max border border-border/40 rounded-xl p-4 bg-white/60">
                      <h2 className="text-sm font-semibold text-text-primary mb-2">Contenido</h2>
                      <nav className="text-sm">
                        <ul className="space-y-1">
                          {toc.map((item) => (
                            <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                              <a
                                href={`#${item.id}`}
                                className="block text-text-secondary hover:text-primary hover:underline"
                              >
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </aside>
                  )}
                </div>

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

      {/* ====== ESTILOS (headings + anclas + TOC + scroll offset) ====== */}
      <style>{`
        /* Wrapper del contenido del post */
        .wp-article { font-size: 1.0625rem; line-height: 1.75; }
        .wp-article p { margin: 1rem 0; }

        /* Offsets para que al saltar con #id no queden los títulos ocultos bajo el header */
        .wp-article h2[id], .wp-article h3[id], .wp-article h4[id], .wp-article h5[id], .wp-article h6[id] {
          scroll-margin-top: 96px;
        }

        /* Jerarquía H2–H6 */
        .wp-article h2, .wp-article h3, .wp-article h4, .wp-article h5, .wp-article h6 {
          color: var(--color-text-primary, #101828);
          font-weight: 700; line-height: 1.25; margin: 2.25rem 0 0.75rem;
          position: relative;
        }
        .wp-article h2 {
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          padding-left: 0.75rem; border-left: 4px solid #6C5CE7;
        }
        .wp-article h3 {
          font-size: clamp(1.25rem, 1.8vw, 1.5rem);
          padding-left: 0.6rem; border-left: 3px solid #00BFA5;
        }
        .wp-article h4 { font-size: clamp(1.125rem, 1.4vw, 1.25rem); border-bottom: 1px solid rgba(16,24,40,0.08); padding-bottom: 0.25rem; }
        .wp-article h5 { font-size: 1.0625rem; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(16,24,40,0.82); }
        .wp-article h6 { font-size: 0.95rem; letter-spacing: 0.03em; text-transform: uppercase; color: rgba(16,24,40,0.72); }

        /* Anchor ¶ al lado del heading (aparece al hover) */
        .wp-article .wp-anchor {
          margin-left: 0.5rem; text-decoration: none; opacity: 0; transition: opacity .2s ease;
          color: #98A2B3; font-weight: 400;
        }
        .wp-article h2:hover .wp-anchor,
        .wp-article h3:hover .wp-anchor,
        .wp-article h4:hover .wp-anchor { opacity: 1; }

        /* Listas, citas, imágenes, tablas, código */
        .wp-article ul, .wp-article ol { margin: 1rem 0 1rem 1.25rem; }
        .wp-article li { margin: 0.25rem 0; }
        .wp-article blockquote {
          margin: 1.25rem 0; padding: 0.75rem 1rem; border-left: 4px solid #6C5CE7;
          background: #F8F7FF; color: #475467;
        }
        .wp-article img { max-width: 100%; height: auto; border-radius: 0.75rem; display: block; margin: 1rem auto; }
        .wp-article table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.95rem; }
        .wp-article th, .wp-article td { border: 1px solid rgba(16,24,40,0.12); padding: 0.5rem 0.75rem; }
        .wp-article th { background: #F9FAFB; text-align: left; }
        .wp-article a { color: #6C5CE7; text-decoration: underline; text-underline-offset: 2px; }
        .wp-article a:hover { color: #00BFA5; }

        .wp-article code {
          background: #F2F4F7; padding: 0.15rem 0.35rem; border-radius: 0.375rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.9em;
        }
        .wp-article pre {
          background: #0B1220; color: #F8FAFC; padding: 1rem 1.25rem; border-radius: 0.75rem; overflow: auto; margin: 1rem 0;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default BlogPost;