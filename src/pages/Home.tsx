import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section - Oscuro */}
        <section className="section-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-h1 text-balance">
                  Si no tienes control financiero, estás tomando decisiones a ciegas.
                </h1>
                <p className="text-body text-white/90 leading-relaxed">
                  Ayudo a empresas tecnológicas y pymes digitales a tener números claros, tesorería bajo control y previsión real para decidir con seguridad y sin sustos.
                </p>
                <p className="text-sm text-white/70 italic">
                  No es contabilidad. Es dirección financiera operativa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contacto" className="btn-primary-contrast">
                    Solicitar revisión financiera
                  </Link>
                  <Link to="/servicios" className="btn-outline">
                    Ver cómo trabajo
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/edfe88c1-c8c4-4f11-83fb-287debc52ecc.png"
                  alt="Dashboard financiero con métricas en tiempo real - Balance, ingresos, gastos y beneficios"
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

        {/* Beneficios Section - Fondo blanco */}
        <section className="bg-white py-20" aria-labelledby="beneficios-heading">
          <h2 id="beneficios-heading" className="sr-only">Beneficios de Finaptico</h2>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2M9 17h6M9 17v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m6 0V9a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Sabes exactamente dónde estás</h3>
                <p className="text-base text-text-secondary leading-relaxed">Tesorería, KPIs y flujo de caja claros. Dejas de intuir y empiezas a decidir con datos reales.</p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Evitas errores fiscales antes de que cuesten dinero</h3>
                <p className="text-base text-text-secondary leading-relaxed">Supervisión constante para que nada se retrase ni se haga mal. Sin sorpresas ni carreras de última hora.</p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Recuperas tiempo y foco</h3>
                <p className="text-base text-text-secondary leading-relaxed">Delegas la parte financiera y eliminas fricción. Tú te centras en crecer, no en apagar fuegos.</p>
              </div>
            </div>
          </div>
        </section>

      {/* Packs Section - Fondo alternativo */}
      <section className="section-light py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-text-primary mb-4">Lo que incluye Finaptico</h2>
            <p className="text-body text-text-secondary">Esto es lo que pasa cuando el sistema financiero funciona como debe.</p>
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
                  <span className="text-base text-text-secondary">Supervisión fiscal y control de obligaciones sin retrasos por parte de la gestoría</span>
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
                  <span className="text-base text-text-secondary">Acompañamiento financiero operativo en el día a día</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base text-text-secondary">Revisión periódica del sistema financiero</span>
                </li>
              </ul>
              <p className="text-base text-text-secondary mb-6">
                Si tu empresa no está dispuesta a ordenar procesos y trabajar con criterio, este servicio no es para ti.
              </p>
              <Link to="/servicios" className="btn-primary w-full text-center block">
                Ver detalles
              </Link>
            </div>
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

export default Home;
