import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useCart } from '../context/CartContext';
import { ChevronLeft, CreditCard, QrCode, Check, Building2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { items, clearCart, clearCartByCategory } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');

  // Filter items by category for this checkout
  const checkoutItems = useMemo(() => {
    if (!category) return items;
    return items.filter(item => (item.category || 'Sin categoría') === category);
  }, [items, category]);

  const cartTotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [checkoutItems]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
  });

  // Redirect to cart if no items or invalid category
  useEffect(() => {
    if (items.length === 0 || checkoutItems.length === 0) {
      navigate('/cart');
    }
  }, [items.length, checkoutItems.length, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate order processing
    alert(`¡Pedido realizado con éxito para ${category || 'tu compra'}!`);

    // Remove only the items from this category
    if (category) {
      clearCartByCategory(category);
      // Check if there are more items in cart
      const remainingItems = items.filter(item => (item.category || 'Sin categoría') !== category);
      if (remainingItems.length > 0) {
        navigate('/cart');
      } else {
        navigate('/');
      }
    } else {
      clearCart();
      navigate('/');
    }
  };

  // Show nothing while redirecting
  if (items.length === 0 || checkoutItems.length === 0) {
    return null;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8">
      {/* Back to cart */}
      <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="w-5 h-5" />
        <span>Volver al carrito</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Resumen de compra</h1>
        {category && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-5 h-5" />
            <span>Pagando a: <span className="font-medium text-foreground">{category}</span></span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Información de contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Información de entrega
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Método de pago
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-medium">Tarjeta de crédito/débito</span>
                  {paymentMethod === 'card' && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-colors ${
                    paymentMethod === 'qr'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <QrCode className="w-6 h-6" />
                  <span className="font-medium">QR</span>
                  {paymentMethod === 'qr' && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Fecha de vencimiento
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      placeholder="123"
                      required={paymentMethod === 'card'}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'qr' && (
                <div className="text-center py-8 bg-muted rounded-lg">
                  <QrCode className="w-32 h-32 mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">
                    Escanea el código QR para realizar el pago
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Resumen del pedido
              </h2>

              <div className="space-y-3 mb-6">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-medium text-foreground">Gratis</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Confirmar pedido
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}