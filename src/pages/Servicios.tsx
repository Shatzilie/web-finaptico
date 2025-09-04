import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Servicios = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Puedo cambiar de pack más adelante?",
      answer: "Sí, puedes cambiar de pack cuando necesites más o menos nivel de servicio. Lo revisamos juntas y ajustamos según tus necesidades."
    },
    {
      question: "¿Trabajas solo con empresas tech?",
      answer: "No, trabajo tanto con pymes tecnológicas como con empresas tradicionales en crecimiento. Mi experiencia abarca diferentes sectores."
    },
    {
      question: "¿Cuándo empezamos?",
      answer: "Normalmente podemos empezar en 3-7 días después de nuestra primera llamada, dependiendo de la complejidad del setup inicial."
    },
    {
      question: "¿Qué herramientas utilizas?",
      answer: "Trabajo con las herramientas que ya uses (Odoo, Holded, etc.) o propongo automatizaciones con Notion, Google Sheets, Make/Zapier según tus necesidades."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Intro */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-h1 text-text-primary mb-6">Servicios por packs</h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Cada negocio es distinto. Aquí te explico cómo trabajo en cada nivel de servicio, con ejemplos reales.
          </p>
        </div>
      </section>

      {/* Pack Esencial */}
      <section id="pack-esencial" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-text-primary mb-4">Pack Esencial · Empezar con base sólida</h2>
              <p className="text-subtitle text-text-secondary">Me ocupo de lo básico para que no te frenes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Alta de empresa y obligaciones claras</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Contabilidad organizada desde el primer día</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Resolución de dudas rápidas</span>
                  </li>
                </ul>

                <p className="text-small text-text-muted italic mb-6">
                  Ej.: pyme tradicional que abre su primera SL y quiere centrarse en clientes.
                </p>

                <Link to="/contacto?pack=esencial" className="btn-primary">
                  Quiero este pack
                </Link>
              </div>

              <div className="bg-section-light rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-secondary">Estado empresa</span>
                    <span className="bg-secondary text-white px-2 py-1 rounded text-sm">✓ Activa</span>
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
      <section id="pack-crecimiento" className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-text-primary mb-4">Pack Crecimiento · Escalar con control</h2>
              <p className="text-subtitle text-text-secondary">Métricas claras y decisiones informadas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">KPIs y tesorería mensual</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Optimización fiscal y previsiones de caja</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Automatización de procesos</span>
                  </li>
                </ul>

                <p className="text-small text-text-muted italic mb-6">
                  Ej.: SaaS que crece en suscripciones y valora contratar sin poner en riesgo la liquidez.
                </p>

                <Link to="/contacto?pack=crecimiento" className="btn-primary">
                  Lo quiero para mi empresa
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h4 className="font-semibold text-text-primary mb-4">Dashboard mensual</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-section-light rounded-lg p-3">
                      <div className="text-sm text-text-muted">MRR</div>
                      <div className="text-lg font-semibold text-secondary">€12,450</div>
                      <div className="text-xs text-secondary">+15% vs mes anterior</div>
                    </div>
                    <div className="bg-section-light rounded-lg p-3">
                      <div className="text-sm text-text-muted">Burn Rate</div>
                      <div className="text-lg font-semibold text-text-primary">€8,200</div>
                      <div className="text-xs text-text-muted">18 meses runway</div>
                    </div>
                  </div>
                  <div className="h-16 bg-section-light rounded-lg flex items-center justify-center">
                    <span className="text-sm text-text-muted">Gráfico de caja proyectado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pack Pro */}
      <section id="pack-pro" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-text-primary mb-4">Pack Pro · Visión estratégica a largo plazo</h2>
              <p className="text-subtitle text-text-secondary">Actúo como tu CFO externo para decisiones clave.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Modelos de inversión y expansión</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Informes para bancos e inversores</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-body text-text-secondary">Planificación patrimonial</span>
                  </li>
                </ul>

                <p className="text-small text-text-muted italic mb-6">
                  Ej.: empresa en expansión que prepara ronda de inversión.
                </p>

                <Link to="/contacto?pack=pro" className="btn-primary">
                  Hablemos de este pack
                </Link>
              </div>

              <div className="bg-section-light rounded-2xl p-8">
                <h4 className="font-semibold text-text-primary mb-4">Informe ejecutivo</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Valoración actual</span>
                    <span className="font-semibold text-text-primary">€2.1M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Runway disponible</span>
                    <span className="font-semibold text-secondary">24 meses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">ROI proyectado</span>
                    <span className="font-semibold text-secondary">185%</span>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="text-xs text-text-muted mb-1">Próximo hito de funding</div>
                    <div className="text-sm font-medium text-text-primary">Serie A · Q3 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="comparativa" className="text-h2 text-text-primary text-center mb-12">Comparativa de packs</h2>
            
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
                      <td className="p-4 text-text-secondary">Contabilidad básica</td>
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
                      <td className="p-4 text-text-secondary">Optimización fiscal</td>
                      <td className="text-center p-4 text-text-muted">—</td>
                      <td className="text-center p-4 text-secondary text-xl">✓</td>
                      <td className="text-center p-4 text-secondary text-xl">✓</td>
                    </tr>
                    <tr className="bg-section-light border-b border-border">
                      <td className="p-4 text-text-secondary">Automatización</td>
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
                      <td className="p-4 text-text-secondary">Informes inversores</td>
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

      {/* Cómo trabajamos */}
      <section className="section-alt py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-text-primary mb-12">Cómo trabajaremos juntas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-3">Llamada inicial</h3>
                <p className="text-base text-text-secondary">20 minutos para entender tu negocio y objetivos. Sin compromiso.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-3">Setup y acceso seguro</h3>
                <p className="text-base text-text-secondary">Configuración de herramientas y calendario de trabajo conjunto.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-subtitle font-semibold text-text-primary mb-3">Ejecución y reporting</h3>
                <p className="text-base text-text-secondary">Cierres mensuales, KPIs claros y propuestas de mejora continua.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-h2 text-text-primary text-center mb-12">Preguntas frecuentes</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-section-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  >
                    <span className="font-medium text-text-primary">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-text-muted transition-transform duration-200 ${
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

      {/* CTA Final */}
      <section className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="cta-gradient">
              <h2 className="text-h2 mb-4">¿No tienes claro el pack?</h2>
              <p className="text-body mb-6 opacity-90">
                Escríbeme y lo vemos juntas. Prefiero que decidas con claridad total.
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

      {/* Espacio para el Footer CTA */}
      <div className="bg-white py-16"></div>

      <Footer />
    </div>
  );
};

export default Servicios;