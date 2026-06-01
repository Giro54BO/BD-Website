import React from 'react';
import { AlertCircle, ShoppingBag, Search, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    href: string;
  };
}

/**
 * Error State Component
 * Shows when something goes wrong
 */
export const ErrorState = ({
  title = 'Error',
  message = 'Algo salió mal. Por favor intenta de nuevo.',
  action,
}: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <AlertCircle className="w-16 h-16 text-destructive mb-4" />
    <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground text-center max-w-md mb-6">{message}</p>
    {action && (
      <Link
        to={action.href}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
      >
        {action.label}
      </Link>
    )}
  </div>
);

/**
 * Empty Cart State
 */
export const EmptyCartState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
    <h2 className="text-2xl font-semibold text-foreground mb-2">
      Tu carrito está vacío
    </h2>
    <p className="text-muted-foreground text-center max-w-md mb-6">
      Explora nuestro catálogo y agrega los productos que deseas
    </p>
    <Link
      to="/productos"
      className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
    >
      Continuar comprando
    </Link>
  </div>
);

/**
 * Empty Search Results
 */
export const EmptySearchState = ({ query }: { query: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <Search className="w-16 h-16 text-muted-foreground mb-4" />
    <h2 className="text-2xl font-semibold text-foreground mb-2">
      No encontramos resultados
    </h2>
    <p className="text-muted-foreground text-center max-w-md mb-2">
      No hay productos que coincidan con "{query}"
    </p>
    <p className="text-sm text-muted-foreground mb-6">
      Intenta con otras palabras clave o explora nuestras categorías
    </p>
    <Link
      to="/productos"
      className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
    >
      Ver todos los productos
    </Link>
  </div>
);

/**
 * Empty Orders State
 */
export const EmptyOrdersState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <Package className="w-16 h-16 text-muted-foreground mb-4" />
    <h2 className="text-2xl font-semibold text-foreground mb-2">
      No tienes pedidos
    </h2>
    <p className="text-muted-foreground text-center max-w-md mb-6">
      Aún no has realizado ninguna compra. Comienza a explorar nuestro catálogo.
    </p>
    <Link
      to="/productos"
      className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
    >
      Explorar productos
    </Link>
  </div>
);

/**
 * Generic Empty State
 * Reusable for any empty content scenario
 */
export const EmptyState = ({
  icon: Icon,
  title,
  message,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  message: string;
  action?: { label: string; href: string };
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <Icon className="w-16 h-16 text-muted-foreground mb-4" />
    <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
    <p className="text-muted-foreground text-center max-w-md mb-6">{message}</p>
    {action && (
      <Link
        to={action.href}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
      >
        {action.label}
      </Link>
    )}
  </div>
);
