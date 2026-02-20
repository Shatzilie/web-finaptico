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
        {/* Hero Section - Oscuro */}
        <section className="section-dark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-h1 text-balance">
                  Dirección financiera externa para pymes tech y negocios digitales
                </h1>
                <p className="text-body text-white/90 leading-relaxed">
                  Si cada mes miras la cuenta del banco para saber cómo vas, eso no es control financiero. Es ir a ciegas. Soy CFO externa para empresas tecnológicas que quieren tomar decisiones con números claros, no con intuición.
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

        {/* Beneficios Section - Fondo blanco */}
        <section className="bg-white py-20" aria-labelledby="beneficios-heading">
          <h2 id="beneficios-heading" className="sr-only">Qué consigues con dirección financiera externa</h2>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2M9 17h6M9 17v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m6 0V9a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Números claros para decidir bien</h3>
                <p className="text-base text-text-secondary leading-relaxed">Tesorería, KPIs y flujo de caja actualizados. Sabes exactamente dónde está tu empresa cada mes, no cada susto.</p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Fiscalidad supervisada sin sorpresas</h3>
                <p className="text-base text-text-secondary leading-relaxed">Reviso que tu gestoría cumpla plazos y que nada se escape. Porque un error fiscal no avisa, simplemente llega.</p>
              </div>

              <div className="card-hover border border-border/30">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-subtitle font-semibold mb-3 text-text-primary">Tiempo para hacer crecer tu empresa</h3>
                <p className="text-base text-text-secondary leading-relaxed">Delegas el control financiero en alguien que entiende tu negocio digital. Tú te centras en producto, equipo y clientes.</p>
              </div>
            </div>
          </div>
        </section>

      {/* Packs Section - Fondo alternativo */}
      <section className="section-light py-20">
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
