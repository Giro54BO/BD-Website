import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface CitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: string) => void;
}

const CITIES = [
  { id: 'santa-cruz', name: 'Santa Cruz', coordinates: { lat: -17.8146, lng: -63.1561 } },
  { id: 'la-paz', name: 'La Paz', coordinates: { lat: -16.5000, lng: -68.1500 } },
  { id: 'cochabamba', name: 'Cochabamba', coordinates: { lat: -17.4139, lng: -66.1653 } },
];

export function CitySelectionModal({ isOpen, onClose, onSelectCity }: CitySelectionModalProps) {
  const [selectedCity, setSelectedCity] = useState('Santa Cruz');

  useEffect(() => {
    const savedCity = localStorage.getItem('bigdam_selected_city');

    if (savedCity) {
      setSelectedCity(savedCity);
      return;
    }

    if (!isOpen) {
      return;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const distances = CITIES.map(city => {
            const latDiff = userLat - city.coordinates.lat;
            const lngDiff = userLng - city.coordinates.lng;
            const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
            return { city: city.name, distance };
          });

          const closestCity = distances.reduce((prev, curr) =>
            curr.distance < prev.distance ? curr : prev
          );

          setSelectedCity(closestCity.city);
        },
        (error) => {
          console.log('Geolocation error:', error);
          setSelectedCity('Santa Cruz');
        }
      );
    } else {
      setSelectedCity('Santa Cruz');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    localStorage.setItem('bigdam_selected_city', selectedCity);
    onSelectCity(selectedCity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center px-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white px-6 py-5">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <h2 className="text-xl font-bold">Selecciona tu ciudad</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground mb-6">
            ¿Desde dónde estás comprando? Esto nos ayudará a mostrarte precios y disponibilidad correctos.
          </p>

          {/* City Options */}
          <div className="space-y-3 mb-6">
            {CITIES.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.name)}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 transition-all ${
                  selectedCity === city.name
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-5 h-5 ${
                    selectedCity === city.name ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <span className={`font-medium ${
                    selectedCity === city.name ? 'text-primary' : 'text-foreground'
                  }`}>
                    {city.name}
                  </span>
                </div>

                {selectedCity === city.name && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
