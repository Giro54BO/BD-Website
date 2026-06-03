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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter items by category for this checkout
  const checkoutItems = useMemo(() => {
    if (!category) return items;
    return items.filter(item => (item.category || 'Sin categoría') === category);
  }, [items, category]);

  const cartTotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [checkoutItems]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const VALID_COUPONS: Record<string, number> = {
    DESCUENTO10: 0.10,
    DESCUENTO20: 0.20,
    BIENVENIDO: 0.15,
  };

  const discountAmount = appliedCoupon ? cartTotal * appliedCoupon.discount : 0;
  const finalTotal = cartTotal - discountAmount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (VALID_COUPONS[code]) {
      setAppliedCoupon({ code, discount: VALID_COUPONS[code] });
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError('Cupón inválido o expirado.');
    }
  };

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

  // Redirect to cart if no items or invalid category (skip while submitting)
  useEffect(() => {
    if (!isSubmitting && (items.length === 0 || checkoutItems.length === 0)) {
      navigate('/cart');
    }
  }, [items.length, checkoutItems.length, navigate, isSubmitting]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `BD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0')}`;

      if (category) {
        clearCartByCategory(category);
      } else {
        clearCart();
      }

      navigate('/order-confirmation', { state: { orderNumber } });
    }, 1800);
  };

  // Show nothing while redirecting (only when not in the middle of submitting)
  if (!isSubmitting && (items.length === 0 || checkoutItems.length === 0)) {
    return null;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8">

      {/* Processing overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background/80 backdrop-blur-sm">
          <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="text-lg font-semibold text-foreground">Procesando tu pedido...</p>
        </div>
      )}

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

              {/* Coupon */}
              <div className="border-t border-border pt-4 mb-4">
                <p className="text-sm font-semibold text-foreground mb-3">Código de descuento</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(null); }}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApplyCoupon())}
                    placeholder="Código de descuento"
                    disabled={!!appliedCoupon}
                    className="flex-1 px-4 py-3 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={appliedCoupon ? () => { setAppliedCoupon(null); setCouponCode(''); } : handleApplyCoupon}
                    className="px-4 py-3 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/5 transition-colors whitespace-nowrap"
                  >
                    {appliedCoupon ? 'Quitar' : 'Aplicar →'}
                  </button>
                </div>
                {couponError && (
                  <p className="text-sm text-destructive mt-2">{couponError}</p>
                )}
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2">
                    Cupón <span className="font-semibold">{appliedCoupon.code}</span> aplicado — {Math.round(appliedCoupon.discount * 100)}% de descuento
                  </p>
                )}
              </div>

              <div className="space-y-3 border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Descuento</span>
                    <span className="font-medium text-green-600">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-medium text-foreground">Gratis</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">
                      ${finalTotal.toFixed(2)}
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