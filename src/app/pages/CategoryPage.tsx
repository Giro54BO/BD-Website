import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import svgPathsFilters from '../../imports/svg-ulnwdl2pel';

export function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Filter states
  const [selectedFilterBrands, setSelectedFilterBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  
  // Find the category
  const category = categories.find(
    cat => cat.name.toLowerCase() === categoryName?.toLowerCase()
  );
  
  // Filter products by category and filters
  const categoryProducts = products.filter((product) => {
    // Category filter
    if (product.category.toLowerCase() !== categoryName?.toLowerCase()) {
      return false;
    }

    // Brand filter from sidebar
    if (selectedFilterBrands.length > 0 && !selectedFilterBrands.includes(product.brand)) {
      return false;
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });
  
  // Get unique brands from category products
  const productBrands = Array.from(new Set(
    products
      .filter(p => p.category.toLowerCase() === categoryName?.toLowerCase())
      .map(p => p.brand)
  ));
  
  const toggleFilterBrand = (brand: string) => {
    setSelectedFilterBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };
  
  if (!category) {
    return (
      <div className="min-h-screen bg-input-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Categoría no encontrada
          </h1>
          <p className="text-muted-foreground mb-6">
            La categoría que buscas no existe.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-input-background min-h-screen">
      {/* Mobile Layout */}
      <div className="lg:hidden bg-[#ffffff]">
        {/* Results Section */}
        <div className="bg-white px-3 py-8">
          {/* Title, Results Count, and Filter Buttons */}
          <div className="mb-8 flex flex-col gap-6">
            <h1 className="text-[32px] font-bold text-muted-foreground leading-[1.25] tracking-[-0.0016px]">
              {category.name}
            </h1>
            <p className="text-muted-foreground text-lg leading-[1.5]">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'resultado' : 'resultados'}
            </p>
            
            {/* Divider Line */}
            <div className="h-px bg-border w-full" />
            
            {/* Filter and Sort Buttons */}
            <div className="flex gap-6 items-start">
              <button 
                className="bg-white flex-1 h-12 rounded-xl border border-border flex items-center justify-center gap-1 px-4 hover:bg-muted transition-colors"
              >
                <span className="text-primary text-base leading-[1.5]">Filtros</span>
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="block size-full" fill="none" viewBox="0 0 17.5 17.5">
                    <path d={svgPathsFilters.p308cc871} fill="var(--color-primary)" />
                  </svg>
                </div>
              </button>
              
              <button className="bg-white flex-1 h-12 rounded-xl border border-border flex items-center justify-center gap-1 px-4 hover:bg-muted transition-colors">
                <span className="text-primary text-base leading-[1.5]">Ordenar por</span>
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="block size-full" fill="none" viewBox="0 0 11.3075 6.70775">
                    <path d={svgPathsFilters.p1a7900} fill="var(--color-primary)" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {categoryProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No se encontraron productos
              </p>
              <p className="text-muted-foreground">
                Intenta ajustar los filtros o explora otras categorías
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Results Section */}
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8 bg-[#ffffff]">
          {/* Title and Results Count */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">{category.name}</h1>
            <p className="text-muted-foreground">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'resultado' : 'resultados'}
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className="w-[280px] flex-shrink-0 hidden lg:block">
              <div className="space-y-6">
                {/* Price Section */}
                <div>
                  <h3 className="font-bold text-foreground mb-4">Precio</h3>
                  <p className="text-sm text-muted-foreground mb-3">Precio mínimo</p>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full h-[40px] px-3 border border-border rounded-lg text-sm bg-card"
                        placeholder="Min"
                      />
                      <span className="text-muted-foreground text-left">Precio máximo</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full h-[40px] px-3 border border-border rounded-lg text-sm bg-card"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                {/* Brands Filter */}
                {productBrands.length > 0 && (
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Marcas</h3>
                    <div className="space-y-3">
                      {productBrands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilterBrands.includes(brand)}
                            onChange={() => toggleFilterBrand(brand)}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
                          />
                          <span className="text-sm text-foreground">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {categoryProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">
                    No se encontraron productos
                  </p>
                  <p className="text-muted-foreground">
                    Intenta ajustar los filtros o explora otras categorías
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}