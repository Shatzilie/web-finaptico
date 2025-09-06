import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaCookies = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 pb-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-h1 mb-8 text-center">🍪 POLÍTICA DE COOKIES</h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">1. ¿Qué son las cookies?</h2>
                <p className="text-body">
                  Las cookies son pequeños archivos de texto que un sitio web instala en el dispositivo del usuario al visitarlo. Su finalidad puede ser muy diversa: desde garantizar el correcto funcionamiento del sitio hasta recopilar información estadística o facilitar funciones de redes sociales.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">2. Tipos de cookies utilizadas en este sitio</h2>
                <p className="text-body">
                  Este sitio web utiliza cookies propias y de terceros con fines técnicos, de análisis y de redes sociales. A continuación, se detallan las categorías utilizadas:
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-h4 font-semibold">a) Cookies técnicas (necesarias)</h3>
                    <p className="text-body">
                      Permiten la navegación a través de la web y el uso de las diferentes opciones o servicios que ofrece. Son imprescindibles para el funcionamiento del sitio, por lo que no requieren consentimiento previo.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-h4 font-semibold">b) Cookies de análisis</h3>
                    <p className="text-body">
                      Permiten cuantificar el número de usuarios y realizar mediciones estadísticas sobre el uso que hacen los visitantes del sitio web. Se utilizan herramientas como Google Analytics, que pueden recopilar datos como la duración de la visita, páginas vistas, etc.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-h4 font-semibold">c) Cookies de redes sociales</h3>
                    <p className="text-body">
                      Integran funcionalidades de plataformas como Facebook, Instagram o YouTube, permitiendo compartir contenidos directamente en esas redes. Estas cookies pueden rastrear tu navegación incluso fuera de esta web.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">3. Gestión del consentimiento</h2>
                <div className="space-y-4 text-body">
                  <p>
                    Al acceder por primera vez a esta web, se muestra un banner que informa sobre el uso de cookies y ofrece al usuario la posibilidad de:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Aceptar todas las cookies.</li>
                    <li>Rechazar todas excepto las técnicas.</li>
                    <li>Configurar qué tipo de cookies desea aceptar.</li>
                  </ul>
                  <p>
                    En cualquier momento puedes modificar o retirar tu consentimiento desde el banner o accediendo a la configuración del navegador.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">4. Cómo eliminar o bloquear cookies</h2>
                <div className="space-y-4 text-body">
                  <p>
                    Puedes eliminar o bloquear las cookies desde las opciones de configuración de tu navegador. Aquí tienes enlaces con instrucciones para los principales navegadores:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Google Chrome</li>
                    <li>Mozilla Firefox</li>
                    <li>Safari</li>
                    <li>Microsoft Edge</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">5. Cookies de terceros</h2>
                <p className="text-body">
                  Ten en cuenta que algunas cookies pueden ser gestionadas por terceros para proporcionar servicios adicionales como análisis web o funcionalidades de redes sociales.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PoliticaCookies;