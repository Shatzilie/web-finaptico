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
  shortExcerpt,
  primaryCategoryName,
} from "../lib/wp";

function stripHtml(html?: string) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

function readingTime(html?: string): number {
  if (!html) return 1;
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
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
    while (seen.has(id)) id = `${base}-${inc++}`;
    seen.add(id);
    h.id = id;

    const anchor = document.createElement("a");
    anchor.href = `#${id}`;
    anchor.setAttribute("aria-label", "Enlace a este apartado");
    anchor.className = "wp-anchor";
    anchor.textContent = "\u00B6";
    h.appendChild(anchor);

    toc.push({ id, text, level });
  }

  return { html: container.innerHTML, toc };
}

const TOC_LS_KEY = "finaptico_toc_collapsed";

function TocBox({
  toc,
  activeId,
  tocOpen,
  setTocOpen,
  id = "toc-list",
  className = "",
}: {
  toc: TocItem[];
  activeId: string;
  tocOpen: boolean;
  setTocOpen: (v: boolean) => void;
  id?: string;
  className?: string;
}) {
  return (
    <aside className={`border border-border/40 rounded-xl bg-white/60 ${className}`}>
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 border-b border-border/30"
        onClick={() => setTocOpen(!tocOpen)}
        aria-expanded={tocOpen}
        aria-controls={id}
      >
        <span className="text-sm font-semibold text-text-primary">Contenido</span>
        <span
          className={`i-chevron transition-transform ${tocOpen ? "rotate-0" : "-rotate-90"}`}
          aria-hidden="true"
        >
          {"\u25B8"}
        </span>
      </button>

      {tocOpen && (
        <nav id={id} className="text-sm p-4">
          <ul className="space-y-1">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                  <a
                  href={`#${item.id}`}
                  className={`block rounded px-2 py-1 transition-colors ${
                    activeId === item.id
                      ? "bg-[#F1F0FF] text-[#6C5CE7] font-semibold"
                      : "text-text-secondary hover:text-primary hover:bg-[#F2FFFB]"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
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

  const [toc, setToc] = React.useState<TocItem[]>([]);
  const [htmlWithAnchors, setHtmlWithAnchors] = React.useState<string>("");

  const [activeId, setActiveId] = React.useState<string>("");

  const [readProgress, setReadProgress] = React.useState(0);

  const [tocOpen, setTocOpen] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const raw = localStorage.getItem(TOC_LS_KEY);
    const defaultOpen = window.innerWidth < 1024 ? false : true;
    return raw ? raw !== "1" : defaultOpen;
  });
  React.useEffect(() => {
    localStorage.setItem(TOC_LS_KEY, tocOpen ? "0" : "1");
  }, [tocOpen]);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const p = await fetchPostBySlug(slug || "");
        setPost(p);
      } catch (e: any) {
        setError(e?.message || "Error cargando el art\u00EDculo");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

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

      const wordCount = stripHtml(post.content?.rendered).split(/\s+/).filter(Boolean).length;

      const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: stripHtml(post.title?.rendered),
        url: canonicalHref,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: author.name
          ? { "@type": "Person", name: author.name }
          : { "@type": "Organization", name: "Finaptico" },
        publisher: {
          "@type": "Organization",
          name: "Finaptico",
          url: "https://finaptico.com",
          logo: {
            "@type": "ImageObject",
            url: "https://finaptico.com/og-image.png",
          },
        },
        image: img ? [img] : undefined,
        articleSection: cats[0] || undefined,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalHref },
        description: desc,
        wordCount: wordCount,
        inLanguage: "es",
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

  React.useEffect(() => {
    const root = document.querySelector(".wp-article");
    if (!root) return;
    const headings: Element[] = Array.from(root.querySelectorAll("h2[id], h3[id]"));
    if (headings.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target instanceof HTMLElement) {
          setActiveId(visible[0].target.id);
        } else {
          const tops = headings
            .map((h) => ({ id: (h as HTMLElement).id, top: (h as HTMLElement).getBoundingClientRect().top }))
            .filter((x) => x.top <= 120)
            .sort((a, b) => b.top - a.top);
          if (tops[0]?.id) setActiveId(tops[0].id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [htmlWithAnchors]);

  // Reading progress bar
  React.useEffect(() => {
    if (!post) return;
    const onScroll = () => {
      const article = document.querySelector(".wp-article");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = rect.height;
      const scrolled = window.scrollY - articleTop;
      const progress = Math.min(100, Math.max(0, (scrolled / (articleHeight - window.innerHeight * 0.3)) * 100));
      setReadProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [post, htmlWithAnchors]);

  const dateFmt = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })
      : "";

  const img = post ? featuredImageFromEmbedded(post) : null;
  const cats = post ? postCategories(post) : [];
  const author = post ? authorFromEmbedded(post) : {};
  const minutes = post ? readingTime(post.content?.rendered) : 0;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Reading progress bar */}
      {post && (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-150 ease-out"
            style={{ width: `${readProgress}%` }}
          />
        </div>
      )}
      <main className="bg-white">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <nav className="text-sm text-text-muted" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span className="mx-1.5 text-border">/</span>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              {cats.length > 0 && (
                <>
                  <span className="mx-1.5 text-border">/</span>
                  <Link
                    to={`/blog?category=${encodeURIComponent(cats[0].slug)}&page=1`}
                    className="hover:text-primary transition-colors"
                  >
                    {cats[0].name}
                  </Link>
                </>
              )}
            </nav>
            <button onClick={() => navigate(-1)} className="text-sm text-text-muted hover:text-primary transition-colors" type="button">
              {"\u2190"} Volver
            </button>
          </div>
        </div>

        <section className="bg-white">
          <div className="container mx-auto px-4">
            {loading && <p className="text-center text-text-muted py-16">Cargando art{"\u00ED"}culo{"\u2026"}</p>}

            {!loading && !post && !error && (
              <div className="text-center py-16">
                <h1 className="text-2xl font-semibold mb-2">Art{"\u00ED"}culo no encontrado</h1>
                <p className="text-text-secondary">Puede que el enlace haya cambiado o el art{"\u00ED"}culo ya no exista.</p>
              </div>
            )}

            {error && <p className="text-center text-red-600 py-16">{error}</p>}

            {post && (
              <article className="max-w-5xl mx-auto">
                {/* Hero del articulo */}
                <header className="mb-8">
                  {/* Categorias */}
                  {cats.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cats.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/blog?category=${encodeURIComponent(c.slug)}&page=1`}
                          className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Titulo */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-4">
                    {stripHtml(post.title?.rendered) || "Sin t\u00EDtulo"}
                  </h1>

                  {/* Meta-line: fecha, tiempo de lectura, autor */}
                  <div className="flex flex-wrap items-center justify-between gap-y-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
                      <time dateTime={post.date}>{dateFmt(post.date)}</time>
                      <span className="text-border">|</span>
                      <span>{minutes} min de lectura</span>
                      {author?.name && (
                        <>
                          <span className="text-border">|</span>
                          <span>Por <span className="text-text-secondary font-medium">{author.name}</span></span>
                        </>
                      )}
                    </div>

                    {/* Compartir */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-text-muted mr-1 hidden sm:inline">Compartir</span>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 text-text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors"
                        aria-label="Compartir en LinkedIn"
                        title="Compartir en LinkedIn"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                      <a
                        href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(stripHtml(post.title?.rendered))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/40 text-text-muted hover:text-text-primary hover:border-text-primary/30 transition-colors"
                        aria-label="Compartir en X"
                        title="Compartir en X"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          const btn = document.querySelector('[data-copy-feedback]');
                          if (btn) { btn.textContent = 'Copiado'; setTimeout(() => { btn.textContent = ''; }, 2000); }
                        }}
                        className="inline-flex items-center justify-center gap-1 h-8 px-2 rounded-lg border border-border/40 text-text-muted hover:text-primary hover:border-primary/30 transition-colors"
                        aria-label="Copiar enlace"
                        title="Copiar enlace"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                        <span data-copy-feedback className="text-xs font-medium"></span>
                      </button>
                    </div>
                  </div>
                </header>

                {/* Imagen destacada */}
                {img && (
                  <div
                    className="w-full rounded-2xl overflow-hidden mb-10 bg-[#1a1040]"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <img
                      src={img}
                      alt={stripHtml(post.title?.rendered)}
                      className="w-full h-full object-cover"
                      loading="eager"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}

                {/* TOC mobile */}
                {toc.length > 0 && (
                  <TocBox
                    toc={toc}
                    activeId={activeId}
                    tocOpen={tocOpen}
                    setTocOpen={setTocOpen}
                    id="toc-list-mobile"
                    className="mb-8 lg:hidden"
                  />
                )}

                {/* Cuerpo del articulo + TOC desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
                  <div
                    className="wp-article text-text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: htmlWithAnchors || post.content?.rendered || "" }}
                  />

                  {toc.length > 0 && (
                    <TocBox
                      toc={toc}
                      activeId={activeId}
                      tocOpen={tocOpen}
                      setTocOpen={setTocOpen}
                      id="toc-list-desktop"
                      className="hidden lg:block lg:sticky lg:top-24 h-max"
                    />
                  )}
                </div>

                {/* Seccion autor */}
                <section className="mt-12 p-6 rounded-2xl border border-border/50 bg-section-light">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center border border-border/30">
                      {author?.avatar ? (
                        <img src={author.avatar} alt={author?.name || "Autor"} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">{"\uD83D\uDC64"}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <Link to="/sobre-mi" className="text-lg font-semibold text-text-primary hover:text-primary transition-colors">
                          {author?.name || "F\u00E1tima"}
                        </Link>
                        <Link
                          to="/contacto"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-colors"
                        >
                          Contactar
                        </Link>
                      </div>
                      <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                        F{"\u00E1"}tima es asesora financiera especializada en empresas tecnol{"\u00F3"}gicas y fundadora de Finaptico. Trabaja como direcci{"\u00F3"}n financiera externa, ayudando a negocios digitales a tener control real sobre su caja, su fiscalidad y su rentabilidad.
                      </p>
                    </div>
                  </div>
                </section>

                {/* CTA banner */}
                <section className="mt-12 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1040] via-[#2d1b69] to-[#1a1040] p-8 md:p-10 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {"\u00BF"}Quieres saber exactamente qu{"\u00E9"} est{"\u00E1"} pasando con tu caja y tus impuestos?
                  </h3>
                  <p className="text-white/70 text-sm mb-6">Habl{"\u00E9"}moslo en 30 minutos. Sin compromiso.</p>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 bg-secondary text-[#111827] font-semibold px-6 py-3 rounded-xl hover:bg-white transition-colors"
                  >
                    Agendar conversaci{"\u00F3"}n
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </section>

                {/* Navegacion anterior / siguiente */}
                <section className="mt-10 border-t border-border/50 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      {prevPost && (() => {
                        const prevImg = featuredImageFromEmbedded(prevPost);
                        return (
                          <Link
                            to={`/blog/${prevPost.slug}`}
                            className="group flex items-stretch rounded-xl border border-border/40 overflow-hidden hover:border-primary/50 hover:bg-section-light transition-all h-full"
                          >
                            {prevImg && (
                              <div className="hidden sm:block w-24 flex-shrink-0 bg-[#1a1040]">
                                <img src={prevImg} alt="" className="w-full h-full object-cover" loading="lazy" />
                              </div>
                            )}
                            <div className="flex-1 p-4">
                              <span className="text-xs font-medium text-text-muted uppercase tracking-wide">{"\u2190"} Anterior</span>
                              <p className="text-sm font-semibold text-text-primary mt-1 group-hover:text-primary transition-colors line-clamp-2">
                                {stripHtml(prevPost.title?.rendered)}
                              </p>
                              <span className="text-xs text-text-muted mt-0.5 block">{primaryCategoryName(prevPost)}</span>
                            </div>
                          </Link>
                        );
                      })()}
                    </div>
                    <div>
                      {nextPost && (() => {
                        const nextImg = featuredImageFromEmbedded(nextPost);
                        return (
                          <Link
                            to={`/blog/${nextPost.slug}`}
                            className="group flex items-stretch rounded-xl border border-border/40 overflow-hidden hover:border-primary/50 hover:bg-section-light transition-all h-full flex-row-reverse"
                          >
                            {nextImg && (
                              <div className="hidden sm:block w-24 flex-shrink-0 bg-[#1a1040]">
                                <img src={nextImg} alt="" className="w-full h-full object-cover" loading="lazy" />
                              </div>
                            )}
                            <div className="flex-1 p-4 text-right">
                              <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Siguiente {"\u2192"}</span>
                              <p className="text-sm font-semibold text-text-primary mt-1 group-hover:text-primary transition-colors line-clamp-2">
                                {stripHtml(nextPost.title?.rendered)}
                              </p>
                              <span className="text-xs text-text-muted mt-0.5 block">{primaryCategoryName(nextPost)}</span>
                            </div>
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                </section>

                {/* Posts relacionados */}
                {related && related.length > 0 && (
                  <section className="mt-14">
                    <h3 className="text-2xl font-bold text-text-primary mb-6">Tambi{"\u00E9"}n te puede interesar</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {related.map((r) => {
                        const rImg = featuredImageFromEmbedded(r);
                        const rCat = primaryCategoryName(r);
                        return (
                          <Link
                            key={r.id}
                            to={`/blog/${r.slug}`}
                            className="group border border-border/40 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all"
                          >
                            <div className="w-full bg-[#1a1040] overflow-hidden" style={{ aspectRatio: "16/9" }}>
                              {rImg ? (
                                <img
                                  src={rImg}
                                  alt={stripHtml(r.title?.rendered)}
                                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl text-white/30">{"\uD83D\uDCDD"}</div>
                              )}
                            </div>
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{rCat}</span>
                                <span className="text-xs text-text-muted">{dateFmt(r.date)}</span>
                              </div>
                              <h4 className="text-base font-semibold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                                {stripHtml(r.title?.rendered)}
                              </h4>
                              <p className="text-sm text-text-muted mt-1.5 line-clamp-2">
                                {shortExcerpt(r, 18)}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}

                <div className="pb-20" />
              </article>
            )}
          </div>
        </section>
      </main>

      <style>{`
        .wp-article { font-size: 1.0625rem; line-height: 1.75; }
        .wp-article p { margin: 1rem 0; }
        .wp-article h2[id], .wp-article h3[id], .wp-article h4[id], .wp-article h5[id], .wp-article h6[id] { scroll-margin-top: 96px; }
        .wp-article h2, .wp-article h3, .wp-article h4, .wp-article h5, .wp-article h6 { color: var(--color-text-primary, #101828); font-weight: 700; line-height: 1.25; margin: 2.25rem 0 0.75rem; position: relative; }
        .wp-article h2 { font-size: clamp(1.5rem, 2.2vw, 2rem); padding-left: 0.75rem; border-left: 4px solid #6C5CE7; }
        .wp-article h3 { font-size: clamp(1.25rem, 1.8vw, 1.5rem); padding-left: 0.6rem; border-left: 3px solid #00BFA5; }
        .wp-article h4 { font-size: clamp(1.125rem, 1.4vw, 1.25rem); border-bottom: 1px solid rgba(16,24,40,0.08); padding-bottom: 0.25rem; }
        .wp-article h5 { font-size: 1.0625rem; letter-spacing: 0.02em; text-transform: uppercase; color: rgba(16,24,40,0.82); }
        .wp-article h6 { font-size: 0.95rem; letter-spacing: 0.03em; text-transform: uppercase; color: rgba(16,24,40,0.72); }
        .wp-article .wp-anchor { margin-left: 0.5rem; text-decoration: none; opacity: 0; transition: opacity .2s ease; color: #98A2B3; font-weight: 400; }
        .wp-article h2:hover .wp-anchor, .wp-article h3:hover .wp-anchor, .wp-article h4:hover .wp-anchor { opacity: 1; }
        .wp-article ul, .wp-article ol { margin: 1rem 0 1rem 1.25rem; }
        .wp-article li { margin: 0.25rem 0; }
        .wp-article blockquote { margin: 1.25rem 0; padding: 0.75rem 1rem; border-left: 4px solid #6C5CE7; background: #F8F7FF; color: #475467; }
        .wp-article img { max-width: 100%; height: auto; border-radius: 0.75rem; display: block; margin: 1rem auto; }
        .wp-article table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.95rem; }
        .wp-article th, .wp-article td { border: 1px solid rgba(16,24,40,0.12); padding: 0.5rem 0.75rem; }
        .wp-article th { background: #F9FAFB; text-align: left; }
        .wp-article a { color: #6C5CE7; text-decoration: underline; text-underline-offset: 2px; }
        .wp-article a:hover { color: #00BFA5; }
        .wp-article code { background: #F2F4F7; padding: 0.15rem 0.35rem; border-radius: 0.375rem; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.9em; }
        .wp-article pre { background: #0B1220; color: #F8FAFC; padding: 1rem 1.25rem; border-radius: 0.75rem; overflow: auto; margin: 1rem 0; }
        .i-chevron { display: inline-block; transform-origin: center; }
      `}</style>

      <Footer />
    </div>
  );
};

export default BlogPost;
