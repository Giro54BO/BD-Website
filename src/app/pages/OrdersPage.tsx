import { Link } from 'react-router';
import svgPaths from '../../imports/svg-zg1n1rczii';

// Mock orders data
const orders = [
  {
    id: 'BD-2025-00144',
    date: '15 de marzo, 2026 - 13:00 PM',
    status: 'Confirmado',
    statusColor: 'text-[#4CAF50]',
    products: [
      {
        id: 'BD-2025-00144',
        name: 'Disco de freno ventilado delantero',
        quantity: 6,
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFrZSUyMGRpc2N8ZW58MXx8fHwxNzQyNzY2OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
    total: '$ 45.99',
  },
  {
    id: 'BD-2025-00143',
    date: '17 de abril, 2024 - 20:30 PM',
    status: 'Enviado',
    statusColor: 'text-[#FF9800]',
    products: [
      {
        id: 'BD-2025-00143',
        name: 'Filtro de aceite premium',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBmaWx0ZXJ8ZW58MXx8fHwxNzQyNzY2OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      },
    ],
    total: '$ 8.50',
  },
];

export function OrdersPage() {
  return (
    <div className="bg-background">
      {/* Page Title */}
      <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-8 leading-[1.2]">
        Mis pedidos
      </h1>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {order.date}
                </p>
                <p className="text-base font-bold text-foreground">
                  {order.id}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-base leading-[1.5] ${order.statusColor}`}>
                  {order.status}
                </span>
                <Link
                  to={`/profile/orders/${order.id}`}
                  className="text-primary hover:opacity-80 transition-opacity flex items-center gap-1"
                >
                  <span className="text-base leading-[1.5]">Ver detalle</span>
                  <svg
                    className="w-4 h-4 rotate-[-90deg]"
                    fill="none"
                    viewBox="0 0 11.3075 6.7075"
                  >
                    <path
                      d="M5.653 6.7075L0 1.0575 1.058 0L5.653 4.5925L10.2495 0L11.3075 1.0575L5.653 6.7075Z"
                      fill="var(--color-primary)"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={order.products[0].image}
                  alt={order.products[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-base text-foreground leading-[1.5] mb-1">
                  {order.products[0].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Cantidad: {order.products[0].quantity}
                </p>
              </div>
              <p className="text-xl font-bold text-foreground">
                {order.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
