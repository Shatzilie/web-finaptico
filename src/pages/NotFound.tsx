import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center px-6 py-16 max-w-lg">
          <p className="text-[120px] sm:text-[160px] font-bold leading-none text-primary/15 select-none">
            404
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-3">
            Esta página no existe
          </h1>
          <p className="text-base text-muted-foreground mb-8">
            Puede que el enlace haya cambiado o que la página se haya movido.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              Ir al blog
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
