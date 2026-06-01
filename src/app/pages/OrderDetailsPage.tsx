import { Link, useParams } from 'react-router';
import svgPaths from '../../imports/svg-w2dxzt69fz';

export function OrderDetailsPage() {
  const { orderId } = useParams();

  // Mock order data
  const order = {
    id: orderId || 'BD-2025-00143',
    date: '17 de abril, 2024 - 20:30 PM',
    status: 'Entregado',
    statusColor: 'text-[#4CAF50]',
    tracking: [
      {
        status: 'Pedido recibido',
        date: '10 de marzo, 16:00',
        completed: true,
      },
      {
        status: 'Pago confirmado',
        date: '10 de marzo, 16:15',
        completed: true,
      },
      {
        status: 'En preparación',
        date: '10 de marzo, 16:30',
        completed: true,
      },
      {
        status: 'Enviado',
        date: '15 de marzo, 9:00',
        completed: true,
      },
      {
        status: 'Entregado',
        date: '11 de marzo, 16:00',
        completed: true,
      },
    ],
    products: [
      {
        id: 'BD-2025-00143',
        name: 'Filtro de aceite premium',
        quantity: 2,
        price: '$ 8.50',
        image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBmaWx0ZXJ8ZW58MXx8fHwxNzQyNzY2OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
    subtotal: '$ 234.99',
    shipping: 'Gratis',
    total: '$ 234.99',
    delivery: {
      method: 'Envió a domicilio',
      address: 'Sobre sexto anillo, a una cuadra de la Radial 17 1/2 Esquina Calle 8',
    },
    payment: {
      method: 'Pago por QR',
    },
    billing: {
      name: 'Carlos Alberto Ramirez Suarez',
      nit: 'NIT: 8176242',
    },
  };

  return (
    <div className="bg-background">
      {/* Page Title */}
      <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-8 leading-[1.2]">
        Mis pedidos
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Tracking & Products */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-base font-bold text-foreground mb-1">
                {order.id}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-lg bg-[#E8F5E9] ${order.statusColor}`}>
                {order.status}
              </span>
              <button className="text-primary hover:opacity-80 transition-opacity">
                <span className="text-base leading-[1.5]">Reordenar pedido</span>
              </button>
            </div>
          </div>

          {/* Tracking */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-primary mb-6">Seguimiento</h2>
            <div className="space-y-6">
              {order.tracking.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.completed
                          ? 'bg-[#4CAF50]'
                          : 'bg-muted'
                      }`}
                    >
                      {item.completed && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 14.5077 10.8845"
                        >
                          <path
                            d={svgPaths.p073ee680}
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>
                    {index < order.tracking.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          item.completed ? 'bg-[#4CAF50]' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-base text-foreground leading-[1.5] mb-1">
                      {item.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-primary mb-6">Productos</h2>
            <div className="space-y-4">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {product.id}
                    </p>
                    <p className="text-base text-foreground leading-[1.5] mb-1">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cantidad: {product.quantity}
                    </p>
                  </div>
                  <p className="text-base font-bold text-foreground">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Resumen</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Subtotal (2)
                </span>
                <span className="text-sm text-foreground">
                  {order.subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Envió</span>
                <span className="text-sm text-[#4CAF50]">
                  {order.shipping}
                </span>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">
                  {order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Entrega</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 21.3075 15.0577"
                >
                  <path
                    d={svgPaths.p0ffa6880}
                    fill="var(--color-primary)"
                  />
                </svg>
                <p className="text-sm text-foreground leading-[1.5]">
                  {order.delivery.method}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 15 18.75"
                >
                  <path
                    d={svgPaths.p06c3ad00}
                    fill="var(--color-primary)"
                  />
                </svg>
                <p className="text-sm text-foreground leading-[1.5]">
                  {order.delivery.address}
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Pago</h3>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 18.5577 14.0383"
              >
                <path
                  d={svgPaths.p27d0e080}
                  fill="var(--color-primary)"
                />
              </svg>
              <p className="text-sm text-foreground leading-[1.5]">
                {order.payment.method}
              </p>
            </div>
          </div>

          {/* Billing */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Facturación</h3>
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  d={svgPaths.p02c06c00}
                  fill="var(--color-primary)"
                />
              </svg>
              <div>
                <p className="text-sm text-foreground leading-[1.5] mb-1">
                  {order.billing.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.billing.nit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
