import { Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { Tag } from 'lucide-react';

export function OffersPage() {
  // Filter products with discounts
  const offersProducts = products.filter(p => p.discount && p.discount > 0);

  return (
    <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Ofertas Semanales</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Descubre nuestras mejores ofertas y promociones de la semana
        </p>
      </div>

      {/* Offers Grid */}
      {offersProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offersProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No hay ofertas disponibles
          </h2>
          <p className="text-muted-foreground mb-8">
            Vuelve pronto para ver nuestras nuevas promociones
          </p>
          <Link
            to="/search"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
      )}
    </div>
  );
}
