import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

const SobreMi = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Fátima, CFO externa para pymes tech y negocios digitales | Finaptico"
        description="Directora financiera externa especializada en empresas tecnológicas. Trabajo con Odoo, Notion, n8n y Make para que tengas control real de tu caja y fiscalidad."
        canonical="/sobre-mi"
      />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] text-text-primary mb-6 text-balance">
                  Dirección financiera externa, operativa y clara para empresas tech
                </h1>
                <p className="text-body text-text-secondary leading-relaxed">
                  Soy Fátima. Trabajo como CFO externa con empresas tecnológicas y negocios digitales que quieren crecer sin improvisar sus finanzas.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/foto-fatima.png"
                  alt="Fátima, directora financiera operativa en Finaptico"
                  width="280"
                  height="280"
                  className="rounded-full shadow-lg w-64 h-64 object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* En qué te ayudo */}
        <section className="section-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-body text-text-secondary text-center mb-4">Esto es lo que hago. Y también lo que no hago.</p>
              <h2 className="text-h2 text-text-primary text-center mb-12">Dirección financiera que se nota en tu día a día</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card-hover border border-border/30 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Control contable y fiscal sin sorpresas</h3>
                  <p className="text-base text-text-secondary">Superviso que tu contabilidad esté bien y que la gestoría ejecute correctamente. Si algo no cuadra, lo vemos antes de que sea un problema.</p>
                </div>

                <div className="card-hover border border-border/30 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Tesorería y métricas que entiendes</h3>
                  <p className="text-base text-text-secondary">Indicadores claros y adaptados a tu negocio digital. Sin jerga, para que sepas si la empresa va bien.</p>
                </div>

                <div className="card-hover border border-border/30 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Comunicación directa y sin jerga</h3>
                  <p className="text-base text-text-secondary">Te cuento lo que importa para que decidas con criterio. Sin informes eternos ni reuniones vacías.</p>
                </div>
              </div>
              <p className="text-body text-text-secondary text-center mt-8 italic">No vendo tranquilidad. Trabajo con datos, criterio y límites claros.</p>
            </div>
          </div>
        </section>

        {/* Mi enfoque */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 text-text-primary text-center mb-12">Cómo entiendo la dirección financiera externa</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">01</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-4">Primero entiendo tu negocio</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Antes de tocar un número, necesito saber cómo funciona tu empresa, qué vendes, cómo cobras y qué te quita el sueño.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">02</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-4">Ordeno y automatizo lo que puedo</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Pongo orden en lo que ya tienes y conecto herramientas para que la información fluya sin trabajo manual innecesario.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">03</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-4">Te doy claridad para decidir</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Informes que entiendes, métricas que importan y opciones claras para decidir. Sin adornos.
                  </p>
                </div>
              </div>
              <p className="text-body text-text-secondary text-center mt-8 italic">Si buscas que alguien te dé la razón, no soy esa persona. Si buscas claridad, probablemente nos entendamos.</p>
            </div>
          </div>
        </section>

        {/* Herramientas */}
        <section className="section-alt py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 text-text-primary mb-6">Las herramientas con las que trabajo</h2>
              <p className="text-body text-text-secondary mb-10">
                Trabajo con Odoo, Notion y automatización con n8n y Make. Ajusto el sistema a tu operativa y a tu forma de vender y cobrar.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <p className="text-lg font-semibold text-primary mb-1">Odoo</p>
                  <p className="text-sm text-text-muted">ERP y contabilidad</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <p className="text-lg font-semibold text-primary mb-1">Notion</p>
                  <p className="text-sm text-text-muted">Documentación y seguimiento</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <p className="text-lg font-semibold text-primary mb-1">n8n</p>
                  <p className="text-sm text-text-muted">Automatización de flujos</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <p className="text-lg font-semibold text-primary mb-1">Make</p>
                  <p className="text-sm text-text-muted">Integraciones y procesos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 text-text-primary text-center mb-12">Lo que puedes esperar de mí</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-4">Claridad y transparencia</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Te digo costes, plazos y expectativas reales. Sin letra pequeña ni promesas vagas.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-4">Confidencialidad</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Tus datos financieros son sensibles. Los trato con la discreción que merecen.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-4">Decisiones con números</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    No se trata de informes bonitos. Se trata de entender la situación y tomar mejores decisiones con datos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-light pt-8 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="cta-gradient">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Quieres saber si encajamos?</h2>
                <p className="text-lg mb-8 opacity-90">
                  Revisamos tu situación financiera y vemos si tiene sentido trabajar juntos. Si no encaja, te lo diré claro.
                </p>
                <Link
                  to="/contacto"
                  className="inline-block bg-white text-[hsl(222,47%,11%)] hover:bg-gray-100 transition-colors duration-200 rounded-[var(--radius-pill)] px-10 py-4 font-bold text-lg shadow-lg"
                >
                  Reserva tu llamada
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SobreMi;
