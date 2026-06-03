import { Link } from 'react-router';
import { categories } from '../data/mockData';
import { categoryImages, getCategoryLabel, getCategoryPath } from '../data/categoryImages';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export function AllCategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#eeedf4] border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            Explora por negocio
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-none mb-4">
            Todas las categorías
          </h1>
          <p className="text-base sm:text-lg text-[#54516f] leading-relaxed max-w-[52ch]">
            Encuentra productos de todos nuestros negocios en un solo lugar. Selecciona una categoría para explorar su catálogo completo.
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={getCategoryPath(category.name)}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-[0_20px_40px_rgba(48,44,103,0.10)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image area */}
              <div
                className="h-[180px] overflow-hidden flex items-center justify-center p-6"
                style={{ background: category.gradient }}
              >
                <ImageWithFallback
                  src={categoryImages[category.id] || category.image}
                  alt={category.name}
                  className="max-h-[140px] w-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Footer */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="block text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {getCategoryLabel(category.name)}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Ver catálogo
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
