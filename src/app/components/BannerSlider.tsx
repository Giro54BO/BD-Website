import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowDownCircle, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface PromoCard {
  image: string;
  alt: string;
}

interface BannerSlide {
  id: number;
  eyebrow: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  background: string;
  accentCardText: string;
  cards: PromoCard[];
}

const slides: BannerSlide[] = [
  {
    id: 1,
    eyebrow: 'Verano, hogar y más',
    title: 'Ofertas que te acompañan',
    buttonText: 'Comprar ahora',
    buttonLink: '/ofertas',
    background: 'linear-gradient(135deg, #ffe57f 0%, #ffe177 42%, #ffd76a 100%)',
    accentCardText: 'Devoluciones y más',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&h=900&fit=crop&q=90',
        alt: 'Protector solar en promoción',
      },
      {
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=900&h=700&fit=crop&q=90',
        alt: 'Mujer aplicando crema cosmética',
      },
      {
        image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=700&h=460&fit=crop&q=90',
        alt: 'Bolso tejido de verano',
      },
    ],
  },
  {
    id: 2,
    eyebrow: 'Garage listo',
    title: 'Repuestos para seguir',
    buttonText: 'Ver catálogo',
    buttonLink: '/search',
    background: 'linear-gradient(135deg, #d9edff 0%, #b7dcff 48%, #ffdf8a 100%)',
    accentCardText: 'Envíos rápidos',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=700&h=900&fit=crop&q=90',
        alt: 'Repuestos y herramientas automotrices',
      },
      {
        image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=900&h=700&fit=crop&q=90',
        alt: 'Auto en mantenimiento',
      },
      {
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&h=460&fit=crop&q=90',
        alt: 'Auto deportivo',
      },
    ],
  },
  {
    id: 3,
    eyebrow: 'Todo para tu espacio',
    title: 'Hogar y herramientas',
    buttonText: 'Explorar',
    buttonLink: '/category/hogar',
    background: 'linear-gradient(135deg, #fff0b8 0%, #f8df8a 46%, #cdebd6 100%)',
    accentCardText: 'Nuevos negocios',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=700&h=900&fit=crop&q=90',
        alt: 'Herramientas para el hogar',
      },
      {
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=700&fit=crop&q=90',
        alt: 'Muebles para sala',
      },
      {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=460&fit=crop&q=90',
        alt: 'Interior de hogar',
      },
    ],
  },
];

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];
  const [primaryCard, featureCard, secondaryCard] = slide.cards;

  return (
    <section className="bg-background py-8 lg:py-10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[18px] px-6 py-8 shadow-[0_18px_50px_rgba(38,35,82,0.12)] lg:min-h-[350px] lg:px-9 lg:py-10"
          style={{ background: slide.background }}
        >
          <div className="absolute right-6 top-6 z-20 flex items-center gap-2 lg:right-8">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:h-12 lg:w-12"
              aria-label="Banner anterior"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={3} />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:h-12 lg:w-12"
              aria-label={isPaused ? 'Reproducir banner' : 'Pausar banner'}
            >
              {isPaused ? (
                <Play className="h-5 w-5 fill-current" strokeWidth={3} />
              ) : (
                <Pause className="h-5 w-5 fill-current" strokeWidth={3} />
              )}
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-white text-primary shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:h-14 lg:w-14"
              aria-label="Siguiente banner"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={3} />
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.62fr_1.08fr_0.8fr] lg:items-center">
            <div className="relative z-10 max-w-[450px] pt-12 lg:pt-0">
              <p className="mb-3 text-xl font-bold leading-tight text-primary lg:text-2xl">
                {slide.eyebrow}
              </p>
              <h1 className="mb-7 text-5xl font-bold leading-[0.95] text-primary lg:text-6xl">
                {slide.title}
              </h1>
              <Link
                to={slide.buttonLink}
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-primary bg-white px-8 text-xl font-bold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {slide.buttonText}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-[0.72fr_1.25fr_0.9fr] lg:items-stretch">
              <div className="overflow-hidden rounded-[18px] bg-[#ffb27f] lg:min-h-[250px]">
                <img
                  src={primaryCard.image}
                  alt={primaryCard.alt}
                  className="h-full min-h-[180px] w-full object-cover transition-transform duration-700 hover:scale-105 lg:min-h-[250px]"
                />
              </div>

              <div className="overflow-hidden rounded-[18px] bg-[#9ad6ff] lg:min-h-[250px]">
                <img
                  src={featureCard.image}
                  alt={featureCard.alt}
                  className="h-full min-h-[180px] w-full object-cover transition-transform duration-700 hover:scale-105 lg:min-h-[250px]"
                />
              </div>

              <div className="col-span-2 grid gap-4 lg:col-span-1">
                <div className="overflow-hidden rounded-[18px] bg-[#ffb27f]">
                  <img
                    src={secondaryCard.image}
                    alt={secondaryCard.alt}
                    className="h-[150px] w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-[134px]"
                  />
                </div>

                <Link
                  to="/help-center"
                  className="flex min-h-[116px] items-center justify-between rounded-[18px] bg-[#ef1b0c] px-6 text-white shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <span className="max-w-[230px] text-3xl font-bold leading-[1.05] lg:text-4xl">
                    {slide.accentCardText}
                  </span>
                  <ArrowDownCircle className="h-10 w-10 flex-shrink-0" strokeWidth={3} />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-6 flex gap-2 lg:left-9">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide ? 'w-10 bg-primary' : 'w-4 bg-primary/30 hover:bg-primary/60'
                }`}
                aria-label={`Ir al banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
