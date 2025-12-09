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
                Sistemas financieros claros y sin fricción para empresas tecnológicas
              </h1>
              <p className="text-body text-white/90 leading-relaxed">
                Un sistema financiero que funciona siempre igual. Sin caos, sin dudas y sin retrasos. Tú diriges la empresa. Yo mantengo tus números en orden con rigor y claridad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contacto" className="btn-primary">
                  Reserva tu llamada
                </Link>
                <Link to="/servicios" className="btn-outline">
                  Ver servicios
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/edfe88c1-c8c4-4f11-83fb-287debc52ecc.png"
                alt="Dashboard financiero con métricas en tiempo real - Balance, ingresos, gastos y beneficios"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2M9 17h6M9 17v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m6 0V9a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Control real con datos al día</h3>
              <p className="text-base text-text-secondary leading-relaxed">Tesorería, KPIs y flujo de caja claros. Sabes dónde estás y qué puedes asumir.</p>
            </div>

            <div className="card-hover border border-border/30">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Menos riesgo fiscal</h3>
              <p className="text-base text-text-secondary leading-relaxed">Supervisión constante y prevención de errores para evitar problemas y retrasos.</p>
            </div>

            <div className="card-hover border border-border/30">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Dirección financiera operativa</h3>
              <p className="text-base text-text-secondary leading-relaxed">Delegas tareas, eliminas fricción y recuperas tiempo para crecer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packs Section - Fondo alternativo */}
      <section className="section-light py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-text-primary mb-4">Lo que incluye Finaptico</h2>
            <p className="text-body text-text-secondary">Un servicio completo que combina dirección financiera, supervisión fiscal y automatización para empresas tecnológicas.</p>
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
                  <span className="text-base text-text-secondary">Supervisión fiscal y cumplimiento sin retrasos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Automación de procesos para reducir fricción</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Informes claros para decisiones rápidas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Acompañamiento operativo en el día a día</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Revisión periódica del sistema financiero</span>
                </li>
              </ul>
              <Link to="/servicios" className="btn-primary w-full text-center block">
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
            <h2 className="text-h2 mb-4">Lo que dicen mis clientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white/90 mb-4 italic">
                "Trabajar con Finaptico nos dio una visión clara de nuestra tesorería. Tomamos decisiones sin incertidumbre."
              </p>
              <p className="text-secondary font-medium">— María González, CEO TechStart</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white/90 mb-4 italic">
                "El orden financiero y los informes mensuales han reducido carga operativa. Ahora avanzamos con foco."
              </p>
              <p className="text-secondary font-medium">— Carlos Ruiz, Founder GrowthApp</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-white/90 mb-4 italic">
                "Rigor, claridad y disponibilidad. Nuestro sistema financiero nunca había estado tan organizado."
              </p>
              <p className="text-secondary font-medium">— Ana López, Directora CommerciaPlus</p>
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