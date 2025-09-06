import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PoliticaPrivacidad = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 pb-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-h1 mb-8 text-center">🛡 POLÍTICA DE PRIVACIDAD</h1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">Responsable del tratamiento:</h2>
                <div className="space-y-2 text-body">
                  <p><strong>Fátima Temsamani Fernández</strong></p>
                  <p><strong>DNI:</strong> 77313325K</p>
                  <p><strong>Dirección:</strong> Urb. Boscos de Can Martí, parcela 133, 08784 Piera (Barcelona)</p>
                  <p><strong>Correo de contacto:</strong> legal@sienna-grouse-877900.hostingersite.com</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">1. Finalidad del tratamiento</h2>
                <p className="text-body">
                  Los datos personales que se recogen a través de esta web (nombre y correo electrónico) son tratados con las siguientes finalidades:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li>Responder a las consultas recibidas a través del formulario de contacto.</li>
                  <li>Enviar comunicaciones informativas (newsletter) a quienes lo soliciten expresamente.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">2. Base legal del tratamiento</h2>
                <p className="text-body">
                  El tratamiento de los datos se basa en el consentimiento expreso del usuario, otorgado mediante las casillas de aceptación habilitadas en el formulario de contacto.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">3. Conservación de los datos</h2>
                <p className="text-body">
                  Los datos se conservarán hasta que el usuario solicite su supresión o se dé de baja voluntariamente, sin perjuicio de las obligaciones legales de conservación aplicables.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">4. Destinatarios de los datos</h2>
                <p className="text-body">
                  Los datos pueden ser gestionados a través de servicios de terceros que cumplen con la normativa de protección de datos:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-body">
                  <li><strong>Mailerlite:</strong> para la gestión de newsletters.</li>
                  <li><strong>Hostinger:</strong> para el alojamiento del sitio web.</li>
                </ul>
                <p className="text-body">
                  No se prevén transferencias internacionales fuera del Espacio Económico Europeo (EEE) por parte del responsable del tratamiento.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">5. Derechos del usuario</h2>
                <div className="space-y-4 text-body">
                  <p>
                    Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad de tus datos, enviando un correo a: legal@sienna-grouse-877900.hostingersite.com.
                  </p>
                  <p>
                    También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si consideras que se ha vulnerado tu derecho a la protección de datos.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-h3 font-semibold">6. Medidas de seguridad</h2>
                <p className="text-body">
                  Se han implementado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su pérdida, alteración o acceso no autorizado.
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

export default PoliticaPrivacidad;