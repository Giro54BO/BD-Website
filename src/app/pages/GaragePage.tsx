import { Link } from 'react-router';
import { useState } from 'react';
import svgPaths from '../../imports/svg-gqnvqssqp0';

// Mock garage data
const initialVehicles = [
  {
    id: '1',
    name: 'Toyota Corolla CE, 2017',
  },
  {
    id: '2',
    name: 'Honda Civic, 2016',
  },
  {
    id: '3',
    name: 'Hyundai Tucson, 2021',
  },
];

export function GaragePage() {
  const [vehicles, setVehicles] = useState(initialVehicles);

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  return (
    <div className="bg-background">
      {/* Page Title */}
      <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-8 leading-[1.2]">
        Mi garage
      </h1>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] rounded-xl p-4 mb-6 flex items-start gap-3">
        <svg
          className="w-6 h-6 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <path
            d="M12 8v4M12 16h.01"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-base text-primary leading-[1.5]">
          Guarda tus vehículos para filtrar repuestos compatibles rápidamente.
        </p>
      </div>

      {/* Vehicles List */}
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-card rounded-xl border border-border p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 flex-shrink-0">
                <svg
                  className="w-full h-full"
                  fill="none"
                  viewBox="0 0 19.9998 18"
                >
                  <path
                    d={svgPaths.p1ad66680}
                    fill="var(--color-primary)"
                  />
                </svg>
              </div>
              <p className="text-base text-foreground leading-[1.5]">
                {vehicle.name}
              </p>
            </div>
            <button
              onClick={() => handleDelete(vehicle.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 15 18.75"
              >
                <path
                  d={svgPaths.p30a4c100}
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Borrar</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
