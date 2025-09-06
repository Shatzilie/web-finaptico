import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Sobre mí", href: "/sobre-mi" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="header-sticky">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <img src="/lovable-uploads/0210cb49-99a1-4d7b-aa90-c57902239bf7.png" alt="Finaptico" className="h-16" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`link-underline font-medium transition-colors duration-200 ${
                  isActiveLink(item.href) ? "text-secondary" : "text-text-secondary hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="btn-primary"
            >
              Reserva tu llamada
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded="false"
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg
              className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg
              className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-semibold transition-colors duration-200 ${
                  isActiveLink(item.href)
                    ? "text-secondary bg-section-light"
                    : "text-text-secondary hover:text-primary hover:bg-section-light"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="block mt-4 btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Reserva tu llamada
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;