import { Link, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, Building2, ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useMemo } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  code: string;
  category?: string;
  brand?: string;
}

export function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart } = useCart();

  // Group items by category (business)
  const itemsByBusiness = useMemo(() => {
    const groups: Record<string, CartItem[]> = {};
    items.forEach(item => {
      const category = item.category || 'Sin categoría';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    });
    return groups;
  }, [items]);

  // Calculate totals per business
  const businessTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    Object.entries(itemsByBusiness).forEach(([category, items]) => {
      totals[category] = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });
    return totals;
  }, [itemsByBusiness]);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-muted-foreground mb-8">
            Agrega productos a tu carrito para continuar con tu compra
          </p>
          <Link
            to="/search"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-16 py-8">
      {/* Back Button */}
      <Link to="/search" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="w-5 h-5" />
        <span>Seguir comprando</span>
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Carrito de Compras ({totalItems})
        </h1>
        <p className="text-muted-foreground">
          Los productos se agrupan por negocio. El pago se realiza por separado para cada negocio.
        </p>
      </div>

      <div className="space-y-6">
        {/* Cart Items Grouped by Business */}
        <div className="space-y-6">
          {Object.entries(itemsByBusiness).map(([category, businessItems]) => {
            const itemCount = businessItems.reduce((sum, item) => sum + item.quantity, 0);
            const subtotal = businessTotals[category];

            return (
              <div key={category} className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Business Header */}
                <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-foreground" />
                    <h2 className="font-bold text-foreground">
                      {category}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {itemCount} producto{itemCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Subtotal: <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Products */}
                <div className="divide-y divide-border">
                  {businessItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex gap-4"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-medium text-foreground hover:text-primary mb-1 block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.brand ? `${item.brand} · ` : ''}{item.code}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 text-sm font-medium min-w-[2rem] text-center" aria-live="polite" aria-label={`Cantidad: ${item.quantity}`}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[100px]">
                          <p className="font-bold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Business Payment Footer */}
                <div className="bg-muted/30 px-6 py-4 border-t border-border flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Pago independiente para <span className="font-medium text-foreground">{category}</span>
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/checkout?category=${encodeURIComponent(category)}`);
                    }}
                    className="bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors font-medium"
                  >
                    Pagar ${subtotal.toFixed(2)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
