import { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router';
import { CheckCircle, Package } from 'lucide-react';
import dingSound from '../../assets/dragon-studio-ding-sfx-472366.mp3';

interface ConfirmationState {
  orderNumber: string;
}

export function OrderConfirmationPage() {
  const location = useLocation();
  const state = location.state as ConfirmationState | null;

  useEffect(() => {
    if (state?.orderNumber) {
      new Audio(dingSound).play().catch(() => {});
    }
  }, []);

  if (!state?.orderNumber) {
    return <Navigate to="/" replace />;
  }

  const { orderNumber } = state;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md flex flex-col items-center text-center gap-6">

        {/* Icon */}
        <CheckCircle className="w-20 h-20 text-primary stroke-[1.5]" />

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-foreground">Pedido confirmado</h1>
          <p className="text-muted-foreground leading-relaxed">
            Tu pedido ha sido registrado correctamente y está siendo procesado.
          </p>
        </div>

        {/* Order details card */}
        <div className="w-full border border-border rounded-2xl overflow-hidden text-left">
          <div className="px-6 py-5">
            <p className="text-sm font-medium text-foreground mb-1">Número de pedido</p>
            <p className="text-2xl font-extrabold text-muted-foreground tracking-tight">{orderNumber}</p>
          </div>

          <div className="border-t border-border px-6 py-5">
            <p className="text-sm font-medium text-foreground mb-2">Estado</p>
            <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              Confirmado
            </span>
          </div>

          <div className="border-t border-border px-6 py-5">
            <p className="text-sm font-medium text-foreground mb-1">Entrega estimada</p>
            <p className="text-muted-foreground">3-5 días hábiles</p>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col gap-3">
          <Link
            to="/profile/orders"
            className="w-full flex items-center justify-center gap-2 py-4 border border-primary text-primary rounded-2xl font-medium hover:bg-primary/5 transition-colors"
          >
            Ver mi pedido <Package className="w-5 h-5" />
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors"
          >
            Seguir comprando →
          </Link>
        </div>

      </div>
    </div>
  );
}
