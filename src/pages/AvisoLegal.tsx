import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AvisoLegal = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-h1 mb-8 text-center">⚖ AVISO LEGAL</h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <p className="text-body text-foreground/80">
                En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa lo siguiente:
              </p>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">1. Titular del sitio web</h2>
                <div className="space-y-2 text-body">
                  <p><strong>Nombre comercial:</strong> Finaptico</p>
                  <p><strong>Titular:</strong> Fátima Temsamani Fernández</p>
                  <p><strong>NIF:</strong> 77313325K</p>
                  <p><strong>Domicilio:</strong> Urb. Boscos de Can Martí, parcela 133, 08784 Piera (Barcelona)</p>
                  <p><strong>Correo electrónico de contacto:</strong> legal@sienna-grouse-877900.hostingersite.com</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">2. Objeto del sitio web</h2>
                <p className="text-body">
                  A través de este sitio web se ofrecen servicios profesionales de asesoría y automatización financiera, así como contenido informativo relacionado con la mejora de procesos financieros digitales para emprendedores y negocios online.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">3. Condiciones de uso</h2>
                <p className="text-body">
                  El acceso y uso del sitio web atribuye la condición de usuario e implica la aceptación plena de estas condiciones:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>El usuario se compromete a utilizar la web y sus contenidos de forma lícita y conforme a la normativa vigente.</li>
                  <li>El titular se reserva el derecho a modificar en cualquier momento y sin previo aviso la presentación, configuración y contenidos del sitio.</li>
                  <li>No se garantiza que el acceso sea ininterrumpido o libre de errores.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">4. Propiedad intelectual e industrial</h2>
                <div className="space-y-4 text-body">
                  <p>
                    Todos los contenidos de esta web (textos, imágenes, logotipos, diseños, etc.) están protegidos por los derechos de propiedad intelectual e industrial y pertenecen a Fátima Temsamani Fernández o a terceros con autorización expresa.
                  </p>
                  <p>
                    Queda prohibida su reproducción, distribución o transformación sin el consentimiento previo y por escrito del titular.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">5. Enlaces externos</h2>
                <p className="text-body">
                  Esta web puede contener enlaces a sitios de terceros. El titular no se responsabiliza del contenido ni de las condiciones de uso de dichos sitios, que son ajenos a su control.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">6. Responsabilidad</h2>
                <p className="text-body">
                  El titular no se hace responsable de los daños derivados del uso incorrecto del sitio web o de los servicios prestados, ni de los errores u omisiones en los contenidos.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">7. Legislación aplicable y jurisdicción</h2>
                <p className="text-body">
                  Estas condiciones se rigen por la legislación española. Para cualquier controversia que pudiera derivarse del acceso o uso del sitio web, las partes se someten a los juzgados y tribunales competentes del domicilio del titular.
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

export default AvisoLegal;