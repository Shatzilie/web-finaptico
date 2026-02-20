import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

const Servicios = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Puedo cambiar de pack más adelante?",
      answer: "Sí. Cuando tu empresa crece, el servicio debe ajustarse. Podemos cambiar de pack en cualquier momento."
    },
    {
      question: "¿Trabajas solo con empresas tech?",
      answer: "Trabajo sobre todo con pymes tecnológicas y negocios digitales, pero reviso cada caso para asegurar que realmente puedo aportar."
    },
    {
      question: "¿Cuándo empezamos?",
      answer: "Tras la llamada inicial, preparo tu onboarding y empezamos en cuanto tengas todo listo."
    },
    {
      question: "¿Qué herramientas utilizas?",
      answer: "Odoo como ERP, Notion para documentación y seguimiento, y n8n y Make para automatizar procesos financieros. Si ya usas otras herramientas, las integramos o migramos según el caso."
    },
    {
      question: "¿Qué pasa si no trabajamos juntos?",
      answer: "Seguirás tomando decisiones con información incompleta. En muchos casos, eso sale más caro que el propio servicio."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Servicios de CFO externo para pymes tech | Packs de dirección financiera | Finaptico"
        description="Tres niveles de dirección financiera externa adaptados al momento de tu empresa. Desde estructura contable hasta CFO estratégico para pymes tecnológicas."
        canonical="/servicios"
      />
      <Header />
      
      <main>
        {/* Intro */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] text-text-primary mb-6 text-balance">
              Dirección financiera externa por packs para empresas tech
            </h1>
            <p className="text-body text-text-secondary max-w-2xl mx-auto mb-4">
              No todas las pymes tech necesitan lo mismo. Hay empresas que necesitan orden básico y otras que necesitan a alguien que tome decisiones financieras con ellos. Por eso trabajo por niveles de acompañamiento.
            </p>
            <p className="text-base text-text-secondary max-w-2xl mx-auto mb-4">
              No trabajo por tareas sueltas. Cada nivel define el grado de implicación en la dirección financiera de tu empresa.
            </p>
            <p className="text-base text-text-secondary max-w-2xl mx-auto">
              Trabajo con un método definido y herramientas concretas. Si tu sistema actual genera fricción, lo ajustamos en el onboarding. Esto requiere compromiso, no es un servicio de "ya me dirás".
            </p>
          </div>
        </section>

        {/* Pack Esencial */}
        <section id="pack-esencial" className="section-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-h2 text-text-primary mb-4">Pack Esencial: estructura financiera desde el inicio</h2>
                <p className="text-subtitle text-text-secondary">Para pymes tech que empiezan y quieren hacerlo bien desde el primer día.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Visión clara de lo que hay que hacer y en qué orden para arrancar con control</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Estructura contable organizada y adaptada a negocio digital</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Acompañamiento para que tomes decisiones financieras con criterio desde el inicio</span>
                    </li>
                  </ul>

                  <p className="text-small text-text-muted italic mb-4">
                    Pensado para: empresas que abren su primera SL, autónomos que quieren una base clara o pymes en fase inicial que no quieren repetir los errores de otros.
                  </p>
                  <p className="text-small text-text-secondary mb-6">
                    Si solo buscas "cumplir con Hacienda", una gestoría te cubre. Si quieres entender qué pasa con tu dinero, esto es otra cosa.
                  </p>

                  <Link to="/contacto?pack=esencial" className="btn-primary">
                    Quiero este pack
                  </Link>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-text-secondary">Estado empresa</span>
                      <span className="bg-secondary text-white px-2 py-1 rounded text-sm">Activa</span>
                    </div>
                    <div className="h-px bg-border"></div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-text-secondary">Libro diario</span>
                        <span className="text-sm text-text-primary">Al día</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-text-secondary">Facturas pendientes</span>
                        <span className="text-sm text-text-primary">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-text-secondary">Próxima declaración</span>
                        <span className="text-sm text-primary">15 días</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pack Crecimiento */}
        <section id="pack-crecimiento" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-h2 text-text-primary mb-4">Pack Crecimiento: control financiero para escalar sin romper la caja</h2>
                <p className="text-subtitle text-text-secondary">Aquí es donde se evitan los errores que cuestan dinero de verdad.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">KPIs y tesorería mensual: sabes lo que entra, lo que sale y lo que viene</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Supervisión fiscal y previsiones de caja reales</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Automatización de procesos financieros para reducir errores y ahorrar tiempo</span>
                    </li>
                  </ul>

                  <p className="text-small text-text-muted italic mb-4">
                    Pensado para: SaaS y pymes digitales que ya facturan y necesitan claridad financiera para que el crecimiento no les comprometa la liquidez.
                  </p>
                  <p className="text-small text-text-secondary mb-6">
                    El crecimiento sin control financiero suele salir caro.
                  </p>

                  <Link to="/contacto?pack=crecimiento" className="btn-primary">
                    Lo quiero para mi empresa
                  </Link>
                </div>

                <div className="bg-section-light rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <h4 className="font-semibold text-text-primary mb-4">Dashboard mensual</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-text-muted">Ingresos recurrentes</div>
                        <div className="text-lg font-semibold text-secondary">12.450 €</div>
                        <div className="text-xs text-secondary">+15% vs mes anterior</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm text-text-muted">Gasto mensual</div>
                        <div className="text-lg font-semibold text-text-primary">8.200 €</div>
                      </div>
                    </div>
                    <div className="h-16 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-sm text-text-muted">Gráfico de caja proyectado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pack Pro */}
        <section id="pack-pro" className="section-light py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-h2 text-text-primary mb-4">Pack Pro: CFO externo con visión estratégica a largo plazo</h2>
                <p className="text-subtitle text-text-secondary">Trabajo contigo como dirección financiera real.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Modelos financieros para inversión y expansión</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Informes para bancos, inversores y socios</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-body text-text-secondary">Estructura financiera y planificación patrimonial</span>
                    </li>
                  </ul>

                  <p className="text-small text-text-muted italic mb-4">
                    Pensado para: empresas en expansión, preparando ronda de inversión o con crecimiento acelerado que necesitan un CFO sin contratarlo a jornada completa.
                  </p>
                  <p className="text-small text-text-secondary mb-6">
                    Solo trabajo con pocas empresas en este nivel. Porque la dirección financiera estratégica requiere atención, no volumen.
                  </p>

                  <Link to="/contacto?pack=pro" className="btn-primary">
                    Hablemos de este pack
                  </Link>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-text-primary">Informe ejecutivo</h4>
                    <span className="text-xs text-text-muted bg-section-light px-2 py-1 rounded">Ejemplo</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Valoración actual</span>
                      <span className="font-semibold text-text-primary">2,1 M €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Caja disponible</span>
                      <span className="font-semibold text-secondary">24 meses</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Proyección a 12 meses</span>
                      <span className="font-semibold text-secondary">Positiva</span>
                    </div>
                    <div className="mt-4 p-3 bg-section-light rounded-lg">
                      <div className="text-xs text-text-muted mb-1">Próximo hito de financiación</div>
                      <div className="text-sm font-medium text-text-primary">Serie A · Q3 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparativa */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 id="comparativa" className="text-h2 text-text-primary text-center mb-4">Comparativa de servicios de dirección financiera</h2>
              <p className="text-body text-text-secondary text-center mb-4">Revisa qué incluye cada nivel y elige el que se ajusta a tu momento.</p>
              <p className="text-sm text-text-muted text-center mb-12 italic">Si dudas entre dos niveles, lo revisamos en la llamada y decidimos según tu situación real.</p>
              
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="text-left p-4 font-semibold">Servicios</th>
                        <th className="text-center p-4 font-semibold">Esencial</th>
                        <th className="text-center p-4 font-semibold">Crecimiento</th>
                        <th className="text-center p-4 font-semibold">Pro</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4 text-text-secondary">Estructura contable básica</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                      </tr>
                      <tr className="bg-section-light border-b border-border">
                        <td className="p-4 text-text-secondary">KPIs mensuales</td>
                        <td className="text-center p-4 text-text-muted">—</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4 text-text-secondary">Supervisión fiscal</td>
                        <td className="text-center p-4 text-text-muted">—</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                      </tr>
                      <tr className="bg-section-light border-b border-border">
                        <td className="p-4 text-text-secondary">Automatización financiera</td>
                        <td className="text-center p-4 text-text-muted">—</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-4 text-text-secondary">CFO externo</td>
                        <td className="text-center p-4 text-text-muted">—</td>
                        <td className="text-center p-4 text-text-muted">—</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                      </tr>
                      <tr className="bg-section-light">
                        <td className="p-4 text-text-secondary">Informes para inversores</td>
                        <td className="text-center p-4 text-text-muted">—</td>
                        <td className="text-center p-4 text-text-muted">—</td>
                        <td className="text-center p-4 text-secondary text-xl">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo trabajo */}
        <section className="section-alt py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-h2 text-text-primary mb-4">Cómo funciona el servicio de CFO externo</h2>
              <p className="text-body text-text-secondary mb-12">En tres pasos pasamos de conversación a sistema en marcha.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">01</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Llamada inicial de 30 minutos</h3>
                  <p className="text-base text-text-secondary">Hablamos de tu empresa, tu situación real y si tiene sentido trabajar juntos. Sin compromiso.</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">02</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Onboarding y configuración del sistema</h3>
                  <p className="text-base text-text-secondary">Definimos herramientas, accesos y flujos de trabajo. Todo queda claro antes de empezar.</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-5">
                    <span className="text-lg font-semibold text-primary">03</span>
                  </div>
                  <h3 className="text-subtitle font-semibold text-text-primary mb-3">Dirección financiera operativa y reporting</h3>
                  <p className="text-base text-text-secondary">Empiezo a dirigir y supervisar tu parte financiera con entregas regulares y soporte cuando lo necesitas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white pt-16 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-h2 text-text-primary text-center mb-12">Preguntas frecuentes sobre los packs</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-section-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                    >
                      <span className="font-medium text-text-primary">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-text-muted transition-transform duration-200 flex-shrink-0 ml-4 ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-text-secondary">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Servicios;
