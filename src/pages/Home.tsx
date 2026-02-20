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
        <section className="section-dark text-white pt-24 pb-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] text-balance">
                  Dirección financiera externa para pymes tech y negocios digitales
                </h1>
                <p className="text-lg text-white/85 leading-relaxed max-w-lg">
                  Si cada mes miras la cuenta del banco para saber cómo vas, eso no es control financiero. Es ir a ciegas.
                </p>
                <p className="text-lg text-white/85 leading-relaxed max-w-lg">
                  CFO externa para empresas tech que quieren decidir con datos, no con intuición.
                </p>

                {/* Statement — peso visual propio */}
                <div className="bg-white/[0.07] border-l-4 border-secondary rounded-r-lg px-6 py-4">
                  <p className="text-lg font-semibold text-secondary">
                    No soy tu gestoría. Soy la dirección financiera que tu empresa aún no tiene.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link to="/contacto" className="btn-primary-contrast">
                    Reserva una llamada de 30 min
                  </Link>
                  <Link to="/servicios" className="text-white/70 hover:text-white border border-white/30 hover:border-white/60 transition-all duration-200 rounded-[var(--radius-pill)] px-7 py-3 font-medium text-body text-center">
                    Ver cómo trabajo
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/images/dashboard-hero.png"
                  alt="Dashboard para ver caja, margen y previsión sin Excel"
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
            <div className="text-center mb-14">
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
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Startups y SaaS que ya facturan</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Tienes MRR y clientes, pero no tienes claro tu margen real ni cuántos meses de caja te quedan.
                </p>
                <p className="text-sm font-medium text-primary mt-3">Las métricas de vanidad no pagan nóminas.</p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Pymes digitales que han crecido sin estructura</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Agencias, consultoras tech o negocios de servicios digitales. Has crecido, pero la parte financiera sigue en un Excel que nadie actualiza.
                </p>
                <p className="text-sm font-medium text-primary mt-3">Facturar más no es ganar más.</p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">CEOs que toman decisiones financieras solos</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Tu gestoría te presenta impuestos, pero nadie te dice si puedes contratar, si ese proyecto es rentable o cuándo vas a tener un problema de caja.
                </p>
                <p className="text-sm font-medium text-primary mt-3">Decidir sin datos es apostar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparativa Gestoría vs CFO — tabla clara */}
        <section className="section-light py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-h2 text-text-primary mb-4">Gestoría y CFO externo no son lo mismo</h2>
              </div>
              <div className="flex justify-center gap-8 mb-14">
                <div className="text-center">
                  <p className="text-base text-text-muted">Tu gestoría</p>
                  <p className="text-sm font-medium text-text-secondary">Registra el pasado</p>
                </div>
                <div className="w-px bg-border/60"></div>
                <div className="text-center">
                  <p className="text-base text-primary font-medium">Finaptico (CFO externa)</p>
                  <p className="text-sm font-medium text-secondary">Trabaja con lo que viene</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-5 text-sm font-semibold text-text-primary w-1/2">Tu gestoría</th>
                      <th className="text-left p-5 text-sm font-semibold text-primary w-1/2">Finaptico (CFO externa)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/20">
                      <td className="p-5 text-base text-text-secondary">Contabilidad y presentación de impuestos</td>
                      <td className="p-5 text-base text-text-secondary">Previsión de tesorería y control de caja real</td>
                    </tr>
                    <tr className="border-b border-border/20 bg-section-light">
                      <td className="p-5 text-base text-text-secondary">Nóminas y obligaciones fiscales</td>
                      <td className="p-5 text-base text-text-secondary">KPIs, rentabilidad y análisis de márgenes</td>
                    </tr>
                    <tr className="border-b border-border/20">
                      <td className="p-5 text-base text-text-secondary">Registro de lo que ya ha ocurrido</td>
                      <td className="p-5 text-base text-text-secondary">Supervisión fiscal y coordinación con tu gestoría</td>
                    </tr>
                    <tr className="bg-section-light">
                      <td className="p-5 text-base text-text-muted italic">—</td>
                      <td className="p-5 text-base text-text-secondary">Apoyo en decisiones de contratación, inversión y crecimiento</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary/5 rounded-xl p-5 mt-6 text-center">
                <p className="text-base text-text-primary font-medium">
                  Te digo qué significan los números para que puedas decidir.
                </p>
              </div>

              <p className="text-base text-text-secondary text-center mt-8 italic">
                No necesitas cambiar de gestoría. Necesitas a alguien que lea los números con mirada estratégica.
              </p>
            </div>
          </div>
        </section>

        {/* Lo que incluye */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-h2 text-text-primary mb-4">Lo que incluye la dirección financiera externa de Finaptico</h2>
              <p className="text-body text-text-secondary">Has montado algo que funciona. Ahora toca que los números lo confirmen.</p>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-section-light">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-text-primary">Control mensual de KPIs y tesorería</p>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-section-light">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-text-primary">Supervisión fiscal y coordinación con tu gestoría</p>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-section-light">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className="text-base font-medium text-text-primary">Automatización financiera con Odoo, Notion y n8n</p>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-section-light">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-text-primary">Informes claros, sin jerga</p>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-section-light">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-text-primary">Acompañamiento financiero operativo en el día a día</p>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-section-light">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-text-primary">Revisión periódica de tu sistema financiero</p>
              </div>
            </div>

            <p className="text-base text-text-secondary text-center mt-10 max-w-xl mx-auto">
              Si buscas atajos o improvisación, no encaja. Si quieres orden y criterio, sí.
            </p>
            <div className="text-center mt-8">
              <Link to="/servicios" className="btn-primary">
                Ver los packs en detalle
              </Link>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="section-alt py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-h2 text-text-primary mb-4">Cómo funciona el servicio de dirección financiera externa</h2>
                <p className="text-body text-text-secondary max-w-2xl mx-auto">
                  En tres pasos pasamos de conversación a sistema en marcha.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">01</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Llamada de 30 minutos</h3>
                  <p className="text-base text-text-secondary">Hablamos de tu empresa, tu situación real y si tiene sentido trabajar juntos. Sin compromiso.</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">02</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Onboarding y configuración</h3>
                  <p className="text-base text-text-secondary">Definimos herramientas, accesos y flujos de trabajo. Todo queda claro antes de empezar. Si tu sistema genera fricción, lo ajustamos.</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">03</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Ejecución y reporting mensual</h3>
                  <p className="text-base text-text-secondary">Empiezo a dirigir y supervisar tu parte financiera con entregas regulares, informes que entiendes y soporte cuando lo necesitas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prueba social */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h2 text-text-primary text-center mb-14">Lo que dicen quienes ya trabajan conmigo</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-section-light rounded-2xl p-6 flex flex-col">
                  <svg className="w-7 h-7 text-primary/25 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base text-text-secondary leading-relaxed flex-1">
                    Antes tomaba decisiones financieras mirando la cuenta del banco. Ahora tengo un informe mensual que me dice exactamente dónde estamos y qué viene.
                  </p>
                  <div className="mt-5 pt-4 border-t border-border/30">
                    <p className="text-sm font-medium text-text-primary">CEO · SaaS B2B · 12 empleados</p>
                    <p className="text-xs text-text-muted mt-0.5">Madrid</p>
                  </div>
                </div>

                <div className="bg-section-light rounded-2xl p-6 flex flex-col">
                  <svg className="w-7 h-7 text-primary/25 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base text-text-secondary leading-relaxed flex-1">
                    Pensaba que con la gestoría era suficiente. En la primera llamada me hizo ver tres cosas que estaban mal y que me costaban dinero cada trimestre.
                  </p>
                  <div className="mt-5 pt-4 border-t border-border/30">
                    <p className="text-sm font-medium text-text-primary">Fundadora · Agencia digital · 8 empleados</p>
                    <p className="text-xs text-text-muted mt-0.5">Barcelona</p>
                  </div>
                </div>

                <div className="bg-section-light rounded-2xl p-6 flex flex-col">
                  <svg className="w-7 h-7 text-primary/25 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base text-text-secondary leading-relaxed flex-1">
                    Lo que más valoro es que me habla claro. Sin rodeos, sin jerga. Me dice lo que necesito oír, no lo que quiero oír. Cuando hablamos de dinero, eso vale mucho.
                  </p>
                  <div className="mt-5 pt-4 border-t border-border/30">
                    <p className="text-sm font-medium text-text-primary">CTO · Startup SaaS · 18 empleados</p>
                    <p className="text-xs text-text-muted mt-0.5">Valencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-white pt-8 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="cta-gradient">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Quieres saber qué está pasando de verdad con tus finanzas?</h2>
                <p className="text-lg mb-8 opacity-90">
                  Hablamos 30 minutos. Te digo si puedo ayudarte o no. Sin compromiso.
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

export default Home;
