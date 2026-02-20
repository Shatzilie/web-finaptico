import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Dirección financiera externa para pymes tech | Finaptico"
        description="CFO externo especializado en empresas tecnológicas y negocios digitales en España. Control de tesorería, KPIs, supervisión fiscal y previsión de caja real."
        canonical="/"
      />
      <Header />
      
      <main>
        {/* Hero */}
        <section className="section-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-h1 text-balance">
                  Dirección financiera externa para pymes tech y negocios digitales
                </h1>
                <p className="text-body text-white/90 leading-relaxed">
                  Si cada mes miras la cuenta del banco para saber cómo vas, eso no es control financiero. Es ir a ciegas. Soy CFO externa para empresas tecnológicas que quieren tomar decisiones con números reales, no con intuición.
                </p>
                <p className="text-sm text-white/70 italic">
                  No soy tu gestoría. Soy la dirección financiera que tu empresa aún no tiene.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contacto" className="btn-primary-contrast">
                    Reserva una llamada de 30 min
                  </Link>
                  <Link to="/servicios" className="btn-outline">
                    Ver cómo trabajo
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/images/dashboard-hero.png"
                  alt="Dashboard financiero con métricas en tiempo real para pymes tech"
                  width="448"
                  height="408"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Para quién es */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-text-primary mb-4">¿Es para ti?</h2>
              <p className="text-body text-text-secondary max-w-2xl mx-auto">
                Trabajo con empresas tecnológicas y negocios digitales en España que comparten algo: han crecido más rápido que su estructura financiera.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">SaaS y startups que ya facturan</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Tienes MRR, tienes clientes, pero no tienes claro tu margen real ni cuántos meses de caja te quedan. Las métricas de vanidad no pagan nóminas.
                </p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Pymes digitales de 2 a 30 personas</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Agencias, consultoras tech o negocios de servicios digitales que facturan entre 200K y 3M. Has crecido, pero la parte financiera sigue en un Excel que nadie actualiza.
                </p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">CEOs que toman decisiones financieras solos</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Tu gestoría te presenta impuestos, pero nadie te dice si puedes contratar, si ese proyecto es rentable o cuándo vas a tener un problema de caja. Tomas decisiones importantes sin datos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciación: gestoría vs CFO externo */}
        <section className="section-light py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-h2 text-text-primary mb-4">Gestoría y CFO externo no son lo mismo</h2>
                <p className="text-body text-text-secondary max-w-2xl mx-auto">
                  Tu gestoría registra lo que ya ha pasado. La dirección financiera externa trabaja con lo que va a pasar. No la sustituyo, la complemento con una capa que la mayoría de pymes no tiene.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-border/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-subtitle font-semibold text-text-primary">Lo que hace tu gestoría</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-text-muted mt-1 flex-shrink-0">•</span>
                      <span className="text-base text-text-secondary">Contabilidad y presentación de impuestos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-text-muted mt-1 flex-shrink-0">•</span>
                      <span className="text-base text-text-secondary">Nóminas y obligaciones fiscales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-text-muted mt-1 flex-shrink-0">•</span>
                      <span className="text-base text-text-secondary">Registro de lo que ya ha ocurrido</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 border-2 border-primary/30 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-subtitle font-semibold text-text-primary">Lo que hago como CFO externa</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base text-text-secondary">Previsión de tesorería y control de caja real</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base text-text-secondary">KPIs, rentabilidad y análisis de márgenes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base text-text-secondary">Supervisión fiscal y coordinación con tu gestoría</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base text-text-secondary">Apoyo en decisiones de contratación, inversión y crecimiento</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-base text-text-secondary text-center mt-8 italic">
                No necesitas cambiar de gestoría. Necesitas a alguien que lea los números con mirada estratégica y te diga lo que significan para tu negocio.
              </p>
            </div>
          </div>
        </section>

        {/* Lo que incluye */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-text-primary mb-4">Lo que incluye la dirección financiera externa de Finaptico</h2>
              <p className="text-body text-text-secondary">Has montado algo que funciona. Ahora toca que los números lo confirmen.</p>
            </div>

            <div className="flex justify-center">
              <div className="card-hover border border-border/30 max-w-2xl w-full">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-text-secondary">Control mensual de KPIs y tesorería</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-text-secondary">Supervisión fiscal y coordinación con tu gestoría</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-text-secondary">Automatización de procesos financieros con Odoo, Notion y n8n</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-text-secondary">Informes claros que puedes entender sin ser financiero</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-text-secondary">Acompañamiento financiero operativo en el día a día</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base text-text-secondary">Revisión periódica del sistema financiero completo</span>
                  </li>
                </ul>
                <p className="text-base text-text-secondary mb-6">
                  Si tu empresa no está dispuesta a trabajar con orden y criterio, este servicio no encaja. Pero si estás aquí, probablemente sí lo estés.
                </p>
                <Link to="/servicios" className="btn-primary w-full text-center block">
                  Ver los packs en detalle
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="section-alt py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-h2 text-text-primary mb-4">Cómo funciona el servicio de dirección financiera externa</h2>
                <p className="text-body text-text-secondary max-w-2xl mx-auto">
                  Sin procesos eternos ni semanas de espera. En tres pasos pasamos de una conversación a tener tu sistema financiero funcionando.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Llamada de 30 minutos</h3>
                  <p className="text-base text-text-secondary">Hablamos de tu empresa, tu situación real y si tiene sentido trabajar juntos. Sin compromiso ni discurso de venta.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Onboarding y configuración</h3>
                  <p className="text-base text-text-secondary">Definimos herramientas, accesos y flujos de trabajo. Todo queda claro antes de empezar. Si tu sistema actual genera fricción, lo ajustamos.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Ejecución y reporting mensual</h3>
                  <p className="text-base text-text-secondary">Empiezo a dirigir y supervisar tu parte financiera con entregas regulares, informes que entiendes y soporte directo cuando lo necesitas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prueba social */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 text-text-primary text-center mb-12">Lo que dicen quienes ya trabajan conmigo</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-section-light rounded-2xl p-6">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-base text-text-secondary leading-relaxed mb-4">
                    Antes tomaba decisiones financieras mirando la cuenta del banco. Ahora tengo un informe mensual que me dice exactamente dónde estamos y qué viene. La diferencia es enorme.
                  </p>
                  <p className="text-sm font-medium text-text-primary">CEO de SaaS B2B</p>
                  <p className="text-sm text-text-muted">12 empleados, Madrid</p>
                </div>

                <div className="bg-section-light rounded-2xl p-6">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-base text-text-secondary leading-relaxed mb-4">
                    Pensaba que con la gestoría era suficiente. Fátima me hizo ver en la primera llamada tres cosas que estaban mal y que me estaban costando dinero cada trimestre.
                  </p>
                  <p className="text-sm font-medium text-text-primary">Fundadora de agencia digital</p>
                  <p className="text-sm text-text-muted">8 empleados, Barcelona</p>
                </div>

                <div className="bg-section-light rounded-2xl p-6">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-base text-text-secondary leading-relaxed mb-4">
                    Lo que más valoro es que me habla claro. Sin rodeos, sin jerga. Me dice lo que necesito oír, no lo que quiero oír. Y eso, cuando hablamos de dinero, vale mucho.
                  </p>
                  <p className="text-sm font-medium text-text-primary">CTO y cofundador de startup</p>
                  <p className="text-sm text-text-muted">18 empleados, Valencia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="section-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="cta-gradient">
                <h2 className="text-h2 mb-4">¿Quieres saber qué está pasando de verdad con tus finanzas?</h2>
                <p className="text-body mb-6 opacity-90">
                  Hablamos 30 minutos. Te digo si puedo ayudarte o no. Sin compromiso, sin discurso de venta.
                </p>
                <Link
                  to="/contacto"
                  className="inline-block bg-white text-darker-bg hover:bg-section-light transition-colors duration-200 rounded-[var(--radius-pill)] px-8 py-4 font-semibold text-body"
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

export default Home;
