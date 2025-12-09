import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="section-darker text-white relative">
      {/* CTA Card superpuesta */}
      <div className="container mx-auto px-4 relative">
        <div className="cta-gradient text-center -mt-16 mb-16 relative z-10">
          <h2 className="text-h2 mb-4">¿Empezamos?</h2>
          <p className="text-body mb-6 opacity-90">Agendemos una llamada y revisamos tu situación financiera con calma.</p>
          <Link
            to="/contacto"
            className="inline-block bg-white text-darker-bg hover:bg-section-light transition-colors duration-200 rounded-[var(--radius-pill)] px-8 py-4 font-semibold text-body"
          >
            Reserva tu llamada
          </Link>
        </div>

        <div className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Marca + Claim */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Finaptico</h3>
              <p className="text-white/80 text-base leading-relaxed">
                Sistemas financieros claros y sin fricción para empresas tecnológicas.
              </p>
            </div>

            {/* Navegación */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Navegación</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Inicio
                </Link>
                <Link to="/servicios" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Servicios
                </Link>
                <Link to="/sobre-mi" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Sobre mí
                </Link>
                <Link to="/blog" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Blog
                </Link>
                <Link to="/contacto" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Contacto
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Legal</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/aviso-legal" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Aviso Legal
                </Link>
                <Link to="/politica-de-privacidad" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Privacidad
                </Link>
                <Link to="/politica-de-cookies" className="text-white/80 hover:text-secondary transition-colors duration-200">
                  Cookies
                </Link>
              </nav>
            </div>
          </div>

          {/* Franja final */}
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-white/60 text-sm">
              © Finaptico 2025
            </p>
            <p className="text-white/60 text-sm">
              Email: <a href="mailto:hola@finaptico.com" className="hover:text-secondary transition-colors duration-200">hola@finaptico.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;