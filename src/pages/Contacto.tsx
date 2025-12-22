import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "@/integrations/supabase/client";

const WORKER_URL = 'https://ujbnqyeqrkheflvbrwat.supabase.co/functions/v1/smart-worker';

const POLICY_VERSION = '2025-09-01';
const POLICY_URL = `${window.location.origin}/privacidad`;
const POLICY_TEXT = 'He leído y acepto la Política de Privacidad';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    acepta_privacidad: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverId, setServerId] = useState<string | null>(null);
  const [consentId, setConsentId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contacto form submitted!');
    
    if (!formData.acepta_privacidad) {
      setErrorMsg('Debes aceptar la política de privacidad');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg(null);
    setServerId(null);
    setConsentId(null);
    
    const submitWithRetry = async (maxRetries = 3) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`Attempt ${attempt}: Sending to smart-worker:`, formData);
          
          const requestBody = {
            name: formData.nombre, 
            email: formData.email, 
            message: formData.mensaje,
            privacy: formData.acepta_privacidad,
            policyVersion: POLICY_VERSION,
            policyUrl: POLICY_URL,
            policyText: POLICY_TEXT
          };
          
          console.log('Request body:', requestBody);
          
          // Use fetch with proper configuration
          const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
          
          console.log(`Attempt ${attempt} - Response status:`, response.status);
          console.log(`Attempt ${attempt} - Response headers:`, Object.fromEntries(response.headers.entries()));
          
          if (!response.ok) {
            const errorText = await response.text();
            console.log(`Attempt ${attempt} - Error response:`, errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
          }
          
          const result = await response.json();
          console.log(`Attempt ${attempt} - Response json:`, result);
          
          if (result.ok === false) {
            throw new Error(result.error || 'Error al enviar mensaje');
          }
          
          // Success!
          setServerId(result.id);
          if (result.saved === 'contact' && result.consent_id) {
            setConsentId(result.consent_id);
          }
          setShowSuccess(true);
          setFormData({
            nombre: "",
            email: "",
            mensaje: "",
            acepta_privacidad: false
          });
          return;
          
        } catch (err: any) {
          console.error(`Attempt ${attempt} failed:`, err);
          
          if (attempt === maxRetries) {
            // Last attempt failed
            let errorMessage = 'Error enviando el mensaje. Por favor, inténtalo de nuevo.';
            
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
              errorMessage = 'Error de conexión. Verifica tu internet e inténtalo de nuevo.';
            } else if (err.message.includes('CORS')) {
              errorMessage = 'Error de configuración. Inténtalo de nuevo en unos segundos.';
            } else if (err.message.includes('HTTP 4')) {
              errorMessage = 'Error en los datos enviados. Revisa los campos e inténtalo de nuevo.';
            } else if (err.message.includes('HTTP 5')) {
              errorMessage = 'Error del servidor. Inténtalo de nuevo en unos minutos.';
            } else if (err.message && !err.message.includes('HTTP')) {
              errorMessage = err.message;
            }
            
            setErrorMsg(errorMessage);
          } else {
            // Wait before retry with exponential backoff
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          }
        }
      }
    };
    
    try {
      await submitWithRetry();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const fieldName = name === 'privacy' ? 'acepta_privacidad' : name;
    setFormData(prev => ({
      ...prev,
      [fieldName]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Intro */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-h1 text-text-primary mb-6">Contacto</h1>
            <p className="text-body text-text-secondary mb-4">
              Cuéntame sobre tu empresa y en qué punto estás. Te respondo muy pronto y vemos si puedo ayudarte.
            </p>
            <p className="text-base text-text-secondary">
              Trabajo con un sistema estructurado. Durante la llamada vemos si tu empresa encaja con este modelo.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario y contacto */}
      <section className="section-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Formulario */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/30">
                {showSuccess ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-h2 text-text-primary mb-4">¡Mensaje enviado!</h3>
                    <p className="text-body text-text-secondary mb-4">
                      Gracias por contactar. Te responderé en un máximo de 24 horas.
                    </p>
                    {serverId && (
                      <div className="text-sm text-text-secondary mb-4 font-mono bg-gray-100 p-2 rounded space-y-1">
                        <p>ID: {serverId}</p>
                        {consentId && <p>Consent ID: {consentId}</p>}
                      </div>
                    )}
                    <button
                      onClick={() => {setShowSuccess(false); setServerId(null); setConsentId(null); setErrorMsg(null);}}
                      className="btn-secondary"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-text-primary mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                        placeholder="tucorreo@empresa.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium text-text-primary mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        required
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-none"
                        placeholder="Cuéntame qué necesitas, qué te preocupa o qué estás buscando mejorar."
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="acepta_privacidad"
                          name="privacy"
                          required
                          checked={formData.acepta_privacidad}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border rounded"
                        />
                        <label htmlFor="acepta_privacidad" className="text-sm text-text-secondary">
                          He leído y acepto la{" "}
                          <a 
                            href="/politica-de-privacidad" 
                            target="_blank" 
                            rel="noopener"
                            className="text-primary hover:text-secondary underline"
                          >
                            Política de Privacidad
                          </a>{" "}
                          *
                        </label>
                      </div>

                      <div className="bg-section-light p-4 rounded-lg">
                        <p className="text-xs text-text-muted leading-relaxed">
                          <strong>Responsable:</strong> Fátima. <strong>Finalidad:</strong> responder tu solicitud y enviar información relacionada con mis servicios. 
                          <strong> Derechos:</strong> acceso, rectificación, supresión y más. Consulta la Política de Privacidad para más detalle.
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.acepta_privacidad}
                      className={`w-full btn-primary ${
                        isSubmitting || !formData.acepta_privacidad 
                          ? "opacity-50 cursor-not-allowed" 
                          : ""
                      }`}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </button>
                    
                    {errorMsg && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{errorMsg}</p>
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* Información de contacto */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-h2 text-text-primary mb-6">Otras formas de contactar</h2>
                  
                  {/* WhatsApp */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border/30 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.109"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">WhatsApp (solo mensajes)</h3>
                        <p className="text-sm text-text-secondary mb-2">Respuesta rápida para consultas breves.</p>
                        <a
                          href="https://web.whatsapp.com/send?phone=34623760848&text=Hola,%20quiero%20información%20sobre%20Finaptico"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block btn-secondary text-sm"
                          onClick={(e) => {
                            // On mobile, use wa.me, on desktop use web.whatsapp.com
                            if (window.innerWidth <= 768) {
                              e.preventDefault();
                              window.open("https://wa.me/34623760848?text=Hola,%20quiero%20información%20sobre%20Finaptico", "_blank");
                            }
                          }}
                        >
                          Enviar mensaje
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Telegram */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border/30 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Telegram</h3>
                        <p className="text-sm text-text-secondary mb-2">Canal directo para dudas y mensajes rápidos.</p>
                        <a
                          href="https://t.me/+34623760848"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block btn-secondary text-sm"
                        >
                          Contactar
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email directo */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">Email directo</h3>
                        <p className="text-sm text-text-secondary mb-2">Para consultas más detalladas:</p>
                        <a
                          href="mailto:hola@finaptico.com"
                          className="text-primary hover:text-secondary underline"
                        >
                          hola@finaptico.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tiempo de respuesta */}
                <div className="bg-section-alt rounded-xl p-6">
                  <h3 className="font-semibold text-text-primary mb-4">Tiempo de respuesta</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-text-secondary">Formulario web: máximo 24 horas</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-text-secondary">WhatsApp: 2-4 horas (días laborables)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-text-secondary">Telegram: 2-4 horas (días laborables)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-text-secondary">Email: 12-24 horas</span>
                    </div>
                  </div>
                </div>
              </div>
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

export default Contacto;