import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "¿Qué diferencia hay entre un CFO externo y una gestoría?",
    answer:
      "Una gestoría registra lo que ya ha pasado: contabilidad, impuestos, nóminas. Un CFO externo trabaja con lo que va a pasar: proyecciones de tesorería, análisis de rentabilidad, planificación financiera y apoyo en decisiones estratégicas. No sustituye a tu gestoría, la complementa con una capa de dirección financiera que la mayoría de pymes no tiene.",
  },
  {
    question: "¿En qué momento mi empresa necesita dirección financiera externa?",
    answer:
      "Cuando tomas decisiones financieras importantes basándote en intuición en vez de datos. Cuando no tienes claro tu margen real por producto o servicio. Cuando el cash flow te da sustos a final de mes. O cuando estás creciendo y necesitas estructura financiera antes de que el crecimiento te pase por encima. No hace falta estar en crisis para necesitarlo.",
  },
  {
    question: "¿Es un servicio solo para startups que buscan inversión?",
    answer:
      "No. Trabajo con pymes tech, negocios digitales y empresas de servicios que quieren profesionalizar su gestión financiera sin contratar un director financiero a jornada completa. No necesitas estar levantando una ronda para necesitar alguien que te ayude a entender tus números y tomar decisiones con ellos.",
  },
  {
    question: "¿Cómo funciona el servicio en el día a día?",
    answer:
      "Me integro como parte de tu equipo. Tenemos reuniones periódicas (mensuales o quincenales según el pack), trabajo con tus datos reales, preparo informes de tesorería, rentabilidad y KPIs, y estoy disponible para consultas operativas entre reuniones. No es un informe que recibes y guardas en un cajón. Es un acompañamiento activo.",
  },
  {
    question: "¿Necesito cambiar de gestoría para trabajar contigo?",
    answer:
      "No. Trabajo con la gestoría o asesoría que ya tengas. Me coordino con ellos para recibir la información contable y fiscal que necesito. En muchos casos, además, detecto errores o ineficiencias en la contabilidad que se pueden corregir sin cambiar de proveedor.",
  },
  {
    question: "¿Qué herramientas utilizas para el reporting financiero?",
    answer:
      "Estoy especializada en Odoo como ERP, Notion para documentación y gestión de proyectos financieros, y herramientas de automatización como n8n y Make para conectar datos y eliminar trabajo manual. No trabajo con cualquier herramienta, elijo las que mejor se adaptan a cada negocio digital. Lo importante es que tu información financiera fluya limpia, esté centralizada y te permita tomar decisiones sin depender de un Excel que nadie actualiza.",
  },
  {
    question: "¿Cuánto cuesta un servicio de dirección financiera externa?",
    answer:
      "Depende del tamaño de la empresa, la complejidad de sus operaciones y el nivel de acompañamiento que necesite. Ofrezco diferentes niveles de servicio adaptados a cada situación. Si quieres explorar opciones, puedes contactarme y hablamos de tu caso concreto sin compromiso.",
  },
  {
    question: "¿Puedo contratar el servicio solo un mes o dos?",
    answer:
      "No. El compromiso mínimo es de 6 meses, y hay una razón clara. En menos tiempo no puedo hacer un análisis real de tus finanzas, aunque haya histórico. Necesito entender tu negocio, construir un diagnóstico sólido, proponer cambios y, sobre todo, hacer seguimiento de las decisiones que tomamos juntos para corregir lo que haga falta. La dirección financiera no es una foto fija, es un proceso. Un mes es jugar a ciegas.",
  },
  {
    question: "¿Qué tipo de empresas suelen trabajar contigo?",
    answer:
      "Pymes tecnológicas, negocios digitales, empresas de servicios en crecimiento y startups que ya facturan. En general, empresas de entre 2 y 30 personas que necesitan estructura financiera pero no justifican un CFO interno a tiempo completo.",
  },
  {
    question: "¿Trabajas de forma presencial o remota?",
    answer:
      "100% remoto. Uso herramientas digitales para el reporting, las reuniones y la comunicación del día a día. Esto me permite trabajar con clientes en cualquier punto de España (y fuera) sin que la ubicación sea una barrera.",
  },
];

const FAQs: React.FC = () => {
  // Inyectar schema FAQPage + meta SEO
  React.useEffect(() => {
    document.title = "Preguntas frecuentes sobre dirección financiera externa | Finaptico";

    const ensureMeta = (name: string, content: string) => {
      let m = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", name);
        document.head.appendChild(m);
      }
      m.setAttribute("content", content);
    };

    ensureMeta(
      "description",
      "Resuelve tus dudas sobre dirección financiera externa, CFO externo para pymes tech y negocios digitales. Cómo funciona, herramientas, precios y más."
    );

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", "https://finaptico.com/preguntas-frecuentes");

    // Schema FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    };

    // Schema BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://finaptico.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Preguntas frecuentes",
          item: "https://finaptico.com/preguntas-frecuentes",
        },
      ],
    };

    document.querySelectorAll('script[data-seo="jsonld"]').forEach((n) => n.remove());

    const addLd = (obj: unknown) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo", "jsonld");
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
    };

    addLd(faqSchema);
    addLd(breadcrumbSchema);

    return () => {
      document.querySelectorAll('script[data-seo="jsonld"]').forEach((n) => n.remove());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="text-sm text-text-muted mb-6">
              <Link to="/" className="hover:underline">
                Inicio
              </Link>{" "}
              <span>/</span>{" "}
              <span className="text-text-secondary">Preguntas frecuentes</span>
            </nav>
            <h1 className="text-h1 text-text-primary mb-6">Preguntas frecuentes</h1>
            <p className="text-body text-text-secondary">
              Lo que suelen preguntarme antes de trabajar juntos. Si no encuentras tu respuesta,{" "}
              <Link to="/contacto" className="text-primary hover:underline font-medium">
                escríbeme
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-border/30 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left">
                  <h2 className="text-lg font-semibold text-text-primary pr-4">{faq.question}</h2>
                  <span className="shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-base text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h2 text-text-primary mb-4">¿Tienes otra pregunta?</h2>
            <p className="text-body text-text-secondary mb-8">
              Cuéntame tu situación y vemos si tiene sentido trabajar juntos.
            </p>
            <Link to="/contacto" className="btn-primary inline-block">
              Contactar
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;
