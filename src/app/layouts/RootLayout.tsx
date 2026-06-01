import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { TopBanner } from '../components/TopBanner';
import { Header } from '../components/Header';
import { SecondaryNav } from '../components/SecondaryNav';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { CitySelectionModal } from '../components/CitySelectionModal';

export function RootLayout() {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem('bigdam_selected_city');

    if (savedCity) {
      setSelectedCity(savedCity);
    } else {
      setIsLocationModalOpen(true);
    }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsLocationModalOpen(false);
    console.log('Selected city:', city);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to main content link - accessible to keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-b-lg"
      >
        Ir al contenido principal
      </a>

      <TopBanner />
      <Header selectedCity={selectedCity} onOpenLocationModal={() => setIsLocationModalOpen(true)} />
      <SecondaryNav />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
      <CitySelectionModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectCity={handleCitySelect}
      />
    </div>
  );
}