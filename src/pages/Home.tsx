import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Oscuro */}
      <section className="section-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-h1 text-balance">
                Asistente virtual en finanzas para pymes tecnológicas y empresas en crecimiento.
              </h1>
              <p className="text-body text-white/90 leading-relaxed">
                Contabilidad y fiscalidad sin sorpresas. KPIs y tesorería claros. Tú te enfocas en producto y crecimiento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contacto" className="btn-primary">
                  Reserva tu llamada
                </Link>
                <Link to="/servicios" className="btn-secondary">
                  Ver servicios
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md">
                <div className="space-y-4">
                  <div className="h-4 bg-secondary rounded w-3/4"></div>
                  <div className="h-3 bg-white/30 rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="h-2 bg-secondary rounded w-full mb-2"></div>
                      <div className="h-2 bg-white/40 rounded w-2/3"></div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="h-2 bg-secondary rounded w-full mb-2"></div>
                      <div className="h-2 bg-white/40 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-20 bg-white/20 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section - Fondo blanco */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-hover border border-border/30">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Decisiones con datos al día</h3>
              <p className="text-base text-text-secondary leading-relaxed">Reporting claro y KPIs accionables.</p>
            </div>

            <div className="card-hover border border-border/30">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Menos riesgo fiscal</h3>
              <p className="text-base text-text-secondary leading-relaxed">Cumplimiento sin sorpresas y alertas preventivas.</p>
            </div>

            <div className="card-hover border border-border/30">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Tiempo directivo recuperado</h3>
              <p className="text-base text-text-secondary leading-relaxed">Delegas la operativa y te enfocas en crecer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packs Section - Fondo alternativo */}
      <section className="section-light py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-text-primary mb-4">Servicios por packs</h2>
            <p className="text-body text-text-secondary">Encuentra el nivel de servicio que mejor se adapte a tu empresa</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pack Esencial */}
            <div className="card-hover border border-border/30">
              <div className="text-center mb-6">
                <h3 className="text-subtitle font-semibold text-text-primary mb-2">Pack Esencial</h3>
                <p className="text-sm text-text-muted">Empezar con base sólida</p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Alta SL/autónomo</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Contabilidad básica</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Soporte puntual</span>
                </li>
              </ul>
              <Link to="/servicios#pack-esencial" className="btn-secondary w-full text-center block">
                Ver detalles
              </Link>
            </div>

            {/* Pack Crecimiento */}
            <div className="card-hover border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Más popular</span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-subtitle font-semibold text-text-primary mb-2">Pack Crecimiento</h3>
                <p className="text-sm text-text-muted">Escalar con control</p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">KPIs mensuales</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Optimización fiscal/tesorería</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Automatización</span>
                </li>
              </ul>
              <Link to="/servicios#pack-crecimiento" className="btn-primary w-full text-center block">
                Ver detalles
              </Link>
            </div>

            {/* Pack Pro */}
            <div className="card-hover border border-border/30">
              <div className="text-center mb-6">
                <h3 className="text-subtitle font-semibold text-text-primary mb-2">Pack Pro</h3>
                <p className="text-sm text-text-muted">Visión estratégica</p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">CFO as a service</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Modelos inversión</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Informes para inversores</span>
                </li>
              </ul>
              <Link to="/servicios#pack-pro" className="btn-secondary w-full text-center block">
                Ver detalles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios Section - Oscuro */}
      <section className="section-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">Lo que dicen nuestros clientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white/90 mb-4 italic">
                "Desde que trabajo con Finaptico tengo claridad total sobre mis números. Puedo tomar decisiones sin miedo."
              </p>
              <p className="text-secondary font-medium">— María González, CEO TechStart</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white/90 mb-4 italic">
                "El reporting mensual me ha ahorrado horas de trabajo. Ahora me enfoco en lo que realmente importa."
              </p>
              <p className="text-secondary font-medium">— Carlos Ruiz, Founder GrowthApp</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white/90 mb-4 italic">
                "Profesional, clara y siempre disponible. Mi contabilidad nunca había estado tan organizada."
              </p>
              <p className="text-secondary font-medium">— Ana López, Directora ComerciaPlus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Espacio para el Footer CTA */}
      <div className="bg-white py-16"></div>

      <Footer />
    </div>
  );
};

export default Home;