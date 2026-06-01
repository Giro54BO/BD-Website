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
      className="flex flex-col bg-card border border-border/60 rounded-2xl p-5 hover:shadow-[0_20px_40px_rgba(48,44,103,0.08)] -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Image container */}
      <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-accent text-white px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg shadow-accent/25 z-10">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 bg-muted/60 px-2.5 py-1 rounded-md">
          {product.brand}
        </span>
      </div>

      {/* Product name */}
      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 min-h-[3.2rem] group-hover:text-primary transition-colors leading-tight">
        {product.name}
      </h3>

      {/* Code */}
      <p className="text-xs text-muted-foreground/80 mb-3 truncate" title={product.code}>
        <span className="font-semibold uppercase text-[10px] tracking-wide text-muted-foreground/60 mr-1">Código:</span>
        <span className="font-mono text-foreground/90">{product.code}</span>
      </p>

      {/* Rating & Stock row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 mt-auto">
        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating)
                  ? 'fill-accent text-accent'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        {/* Stock status - with accessible text + color indicator */}
        <div className="flex items-center gap-1.5 bg-green-500/10 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase" role="status" aria-label="Stock status">
          <div 
            className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" 
            aria-hidden="true"
          />
          En stock
        </div>
      </div>

      {/* Price & Action */}
      <div className="border-t border-border/30 pt-4 flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-extrabold text-foreground tracking-tight">
            {formatCurrency(product.price)}
          </p>
          {hasDiscount && product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.originalPrice)}
            </p>
          )}
        </div>

        {/* Add to cart button */}
        <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/95 active:scale-[0.98] shadow-md shadow-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer">
          Agregar al carrito
        </button>
      </div>
    </Link>
  );
}
