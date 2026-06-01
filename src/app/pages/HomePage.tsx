import { Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import { categoryImages, getCategoryLabel, getCategoryPath } from '../data/categoryImages';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BannerSlider } from '../components/BannerSlider';
import svgPathsTruck from '../../imports/svg-7r8u8d4ra9';
import svgPathsClock from '../../imports/svg-gwqpgywzo8';
import imgBrand1 from "figma:asset/1fc4a3179194286e3de909ab6510e5141e3ccce0.png";
import imgBrand2 from "figma:asset/127927f341520b90d6948349f411b14b63ecc066.png";
import imgBrand3 from "figma:asset/855f6644fd4c935b120bfa427173093a7ea7c099.png";
import imgBrand4 from "figma:asset/5c85ed2e558bee29c107d284b0e60284c4d88318.png";
import imgBrand5 from "figma:asset/65a4cc9e57394b6418cc884691c90dda27666826.png";
import imgBrand6 from "figma:asset/6ad2fdfd6b853cae9cbea44f282a35305393e58e.png";

export function HomePage() {
  const featuredProducts = products.slice(0, 3);

  // Brand logos
  const brands = [
    { name: 'Sinteplast', logo: imgBrand1 },
    { name: 'Tigre', logo: imgBrand2 },
    { name: 'Picasso', logo: imgBrand3 },
    { name: 'Voito KH', logo: imgBrand4 },
    { name: 'GPC', logo: imgBrand5 },
    { name: 'Makhartan', logo: imgBrand6 },
  ];

  return (
    <>
      {/* Banner Slider */}
      <BannerSlider />

      {/* Features */}
      <section className="py-16 border-b border-border">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="block w-12 h-12" fill="none" viewBox="0 0 21.3075 15.0577">
                  <path d={svgPathsTruck.p21ffd200} fill="var(--color-primary)" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Envío rápido</h3>
                <p className="text-muted-foreground">A todo el país</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="block w-12 h-12" fill="none" viewBox="0 0 20.6535 19.7305">
                  <path d={svgPathsTruck.p36ce9c00} fill="var(--color-primary)" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Garantía</h3>
                <p className="text-muted-foreground">En todos los productos</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="block w-12 h-12" fill="none" viewBox="0 0 15 17.3538">
                  <path d={svgPathsClock.p1f772b00} fill="var(--color-primary)" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">Atención 24/7</h3>
                <p className="text-muted-foreground">Soporte en línea</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="block w-12 h-12" fill="none" viewBox="0 0 19 19">
                  <path d={svgPathsTruck.p2af23f80} fill="var(--color-primary)" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">30+ Años</h3>
                <p className="text-muted-foreground">De experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Negocios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={getCategoryPath(category.name)}
                className="group bg-muted rounded-xl p-6 hover:shadow-lg transition-all"
              >
                <div
                  className="h-[150px] rounded-lg mb-4 overflow-hidden"
                  style={{ background: category.gradient }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageWithFallback
                      src={categoryImages[category.id] || category.image}
                      alt={category.name}
                      className="w-24 h-24 object-contain opacity-80"
                    />
                  </div>
                </div>
                <h3 className="text-xl text-foreground group-hover:text-primary transition-colors font-bold">
                  {getCategoryLabel(category.name)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Productos destacados</h2>
            <Link
              to="/search"
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              Ver todos los productos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 bg-background">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Marcas populares</h2>
            <Link
              to="/search"
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
            >
              Ver todas
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="bg-card border border-border rounded-xl p-6 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <ImageWithFallback
                  src={brand.logo}
                  alt={brand.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Estamos listo para ayudarte</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            ¿No sabes cómo comprar con nosotros? Revisa nuestras preguntas frecuentes o contáctanos directamente.
          </p>
          <button className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-medium transition-colors">
            Conoce más
          </button>
        </div>
      </section>
    </>
  );
}
