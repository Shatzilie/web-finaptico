import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SobreMi = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero simple */}
        <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-h1 text-text-primary mb-6">
              Soy Fátima, y ayudo a empresas a no perder dinero por desorden financiero.
            </h1>
            <p className="text-body text-text-secondary leading-relaxed">
              Trabajo con empresas tecnológicas y pymes digitales que quieren crecer sin improvisar.
            </p>
          </div>
        </div>
      </section>

      {/* En qué te ayudo */}
      <section className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-body text-text-secondary text-center mb-4">Esto es lo que hago. Y también lo que no hago.</p>
            <h2 className="text-h2 text-text-primary text-center mb-12">En qué te ayudo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-hover border border-border/30 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-3">Rigor contable y fiscal</h3>
                <p className="text-base text-text-secondary">Revisión clara, precisa y continua para evitar errores y sorpresas.</p>
              </div>

              <div className="card-hover border border-border/30 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-3">KPIs y tesorería claros</h3>
                <p className="text-base text-text-secondary">Métricas sencillas de entender que te ayudan a decidir con seguridad.</p>
              </div>

              <div className="card-hover border border-border/30 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-3">Comunicación directa</h3>
                <p className="text-base text-text-secondary">Explicación simple, sin tecnicismos. Te cuento lo importante para que actúes con confianza.</p>
              </div>
            </div>
            <p className="text-body text-text-secondary text-center mt-8 italic">No vendo tranquilidad vacía. Trabajo con datos, criterio y límites claros.</p>
          </div>
        </div>
      </section>

      {/* Mi enfoque / Método */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 text-text-primary text-center mb-12">Mi enfoque</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-secondary">1</span>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-4">Entiendo tu negocio</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Antes de tocar números necesito conocer cómo funciona tu empresa y qué quieres conseguir.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-4">Ordeno y automatizo</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Pongo orden en lo que ya tienes y automatizo tareas para evitar errores y ahorrar tiempo.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-secondary">3</span>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-4">Te doy claridad</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Informes que entiendes, métricas que importan y mejoras concretas para que decidas bien.
                </p>
              </div>
            </div>
            <p className="text-body text-text-secondary text-center mt-8 italic">Si buscas que alguien te diga lo que quieres oír, no soy esa persona.</p>
          </div>
        </div>
      </section>

      {/* Cómo lo hago */}
      <section className="section-alt py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-text-primary mb-8">Cómo lo hago</h2>
            <p className="text-body text-text-secondary">
              Trabajo con sistemas flexibles y adaptables a tu empresa. Durante el onboarding definimos la configuración que garantiza orden y claridad.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 text-text-primary text-center mb-12">Mis valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-4">Claridad y transparencia</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Hablo claro sobre costes, plazos y expectativas. Sin letra pequeña.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-4">Confidencialidad</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Tus datos financieros están protegidos y trato la información con máxima discreción.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-4">Orientación a resultados</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  No se trata de informes bonitos, sino de decisiones mejores y sostenibles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h2 text-text-primary mb-6">Hablemos</h2>
            <p className="text-body text-text-secondary mb-8">
              Si quieres revisar tu situación financiera y saber cómo puedo ayudarte, agenda una llamada sin compromiso.
            </p>
            <Link to="/contacto" className="btn-primary text-lg px-8 py-4">
              Reserva tu llamada
            </Link>
          </div>
        </div>
      </section>

        {/* Espacio para el Footer CTA */}
        <div className="bg-white py-16"></div>
      </main>

      <Footer />
    </div>
  );
};

export default SobreMi;
