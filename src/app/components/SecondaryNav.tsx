import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

export function SecondaryNav() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`hidden lg:block bg-muted border-b border-border sticky top-[84px] z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="flex items-center gap-12 py-3">
          {/* Centro de ayuda */}
          <Link
            to="/help-center"
            className="text-base text-foreground hover:text-primary transition-colors"
          >
            Centro de ayuda
          </Link>

          {/* Sobre nosotros */}
          <Link
            to="/nosotros"
            className="text-base text-foreground hover:text-primary transition-colors"
          >
            Sobre nosotros
          </Link>

          {/* Ofertas semanales */}
          <Link
            to="/ofertas"
            className="text-base text-foreground hover:text-primary transition-colors"
          >
            Ofertas semanales
          </Link>

          {/* Blog */}
          <Link
            to="/blog"
            className="text-base text-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
