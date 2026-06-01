import { Link } from 'react-router';
import { Star } from 'lucide-react';
import { Product } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatCurrency } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discount && product.discount > 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group"
    >
      {/* Image container */}
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="mb-2">
        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {product.brand}
        </span>
      </div>

      {/* Product name */}
      <h3 className="text-lg font-medium text-foreground mb-2 line-clamp-2 min-h-[3.5rem]">
        {product.name}
      </h3>

      {/* Code */}
      <p className="text-sm text-muted-foreground mb-2 truncate" title={product.code}>
        <span className="font-medium">Código:</span> {product.code}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(product.rating)
                ? 'fill-primary text-primary'
                : 'text-muted-foreground'
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
      </div>

      {/* Stock status - with accessible text + color indicator */}
      <div className="flex items-center gap-2 mb-3" role="status" aria-label="Stock status">
        <div 
          className="w-2 h-2 rounded-full bg-green-500" 
          aria-hidden="true"
        />
        <span className="text-sm text-green-600 font-medium">En stock</span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3">
        <p className="text-2xl font-medium text-foreground">
          {formatCurrency(product.price)}
        </p>
        {hasDiscount && product.originalPrice && (
          <p className="text-sm text-muted-foreground line-through mb-1">
            {formatCurrency(product.originalPrice)}
          </p>
        )}
      </div>

      {/* Add to cart button */}
      <button className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors">
        Agregar al carrito
      </button>
    </Link>
  );
}
