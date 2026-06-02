import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { getCategoryLabel } from '../data/categoryImages';
import { Search, SlidersHorizontal, ChevronDown, X, ArrowLeft, AlertCircle, Car, PencilLine } from 'lucide-react';
import svgPathsFilters from '../../imports/svg-ulnwdl2pel';

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating';
type SearchMode = 'vehicle' | 'code';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  // Optionally passed when navigating from a specific category
  const categoryParam = searchParams.get('category') || '';

  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [sortOpen, setSortOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('vehicle');
  const [searchCode, setSearchCode] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [vehicleSearchOpen, setVehicleSearchOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filter states
  const [selectedFilterBrands, setSelectedFilterBrands] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const isAutomotriz = categoryParam.toLowerCase() === 'autopartes';

  // Determine page category label
  const activeCategoryLabel = categoryParam
    ? getCategoryLabel(categoryParam)
    : query
    ? 'Todos los resultados'
    : 'Todos los productos';

  // ------- Filtering -------
  const baseProducts = categoryParam
    ? products.filter((p) => p.category.toLowerCase() === categoryParam.toLowerCase())
    : products;

  const matchedProducts = baseProducts.filter((product) => {
    if (query) {
      const q = query.toLowerCase();
      const matches =
        product.name.toLowerCase().includes(q) ||
        product.code.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (selectedFilterBrands.length > 0 && !selectedFilterBrands.includes(product.brand)) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  // Sorting
  const filteredProducts = [...matchedProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // relevance = original order
  });

  const productBrands = Array.from(new Set(baseProducts.map((p) => p.brand)));
  const subcategories = ['Sistema de frenos', 'Suspensión', 'Motor', 'Transmisión', 'Dirección'];
  const vehicleBrands = ['Toyota', 'Nissan', 'Chevrolet', 'Ford', 'Hyundai', 'Kia', 'Honda'];
  const models: Record<string, string[]> = {
    Toyota: ['Corolla', 'Hilux', 'Yaris', 'RAV4'],
    Nissan: ['Sentra', 'Versa', 'Frontier', 'X-Trail'],
    Chevrolet: ['Spark', 'Onix', 'Tracker', 'Sail'],
    Ford: ['Fiesta', 'Focus', 'Ranger', 'EcoSport'],
    Hyundai: ['Accent', 'Elantra', 'Tucson', 'Santa Fe'],
    Kia: ['Rio', 'Cerato', 'Sportage', 'Picanto'],
    Honda: ['Civic', 'Accord', 'CR-V', 'City'],
  };
  const years = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));

  const sortLabels: Record<SortOption, string> = {
    relevance: 'Relevancia',
    price_asc: 'Menor precio',
    price_desc: 'Mayor precio',
    rating: 'Mejor valorados',
  };

  const toggleFilterBrand = (brand: string) => {
    setSelectedFilterBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleVehicleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedBrand) params.set('brand', selectedBrand);
    if (selectedModel) params.set('model', selectedModel);
    if (selectedYear) params.set('year', selectedYear);
    if (categoryParam) params.set('category', categoryParam);
    navigate(`/search?${params.toString()}`);
  };

  const handleCodeSearch = () => {
    if (searchCode.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchCode.trim())}`);
    }
  };

  const clearFilters = () => {
    setSelectedFilterBrands([]);
    setSelectedSubcategories([]);
    setPriceRange([0, 2000]);
  };

  const hasActiveFilters =
    selectedFilterBrands.length > 0 ||
    selectedSubcategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000;

  // ---- Empty State ----
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Illustration */}
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        {hasActiveFilters ? (
          <SlidersHorizontal className="w-10 h-10 text-muted-foreground/50" strokeWidth={1.5} />
        ) : (
          <Search className="w-10 h-10 text-muted-foreground/50" strokeWidth={1.5} />
        )}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-3">
        {hasActiveFilters 
          ? 'Sin resultados para estos filtros'
          : `Sin resultados para${query ? ` "${query}"` : ' esta búsqueda'}`
        }
      </h2>
      <p className="text-muted-foreground text-base max-w-md mb-8 leading-relaxed">
        {hasActiveFilters
          ? 'Intenta ajustar los criterios de búsqueda o limpiar los filtros para encontrar lo que buscas.'
          : 'No encontramos ningún producto con ese término. Prueba con el nombre de una marca, un código de pieza, o una descripción como «pastillas de freno» o «filtro de aceite».'
        }
      </p>

      {hasActiveFilters ? (
        <button
          onClick={clearFilters}
          className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Limpiar filtros
        </button>
      ) : (
        <>
          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['Bosch', 'Frenos', 'Filtro', 'Batería', 'Embrague'].map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                className="px-4 py-2 rounded-full border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </>
      )}
    </div>
  );

  // ---- Sidebar Filters ----
  const FiltersSidebar = () => (
    <aside className="w-[260px] flex-shrink-0">
      <div className="space-y-7">
        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-accent font-medium hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            Limpiar filtros
          </button>
        )}

        {/* Price */}
        <div>
          <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
            Precio (Bs.)
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Mínimo</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full h-10 px-3 border border-border rounded-lg text-sm bg-card focus:outline-none focus:border-primary"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Máximo</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full h-10 px-3 border border-border rounded-lg text-sm bg-card focus:outline-none focus:border-primary"
                placeholder="2000"
              />
            </div>
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
            Marcas
          </h3>
          <div className="space-y-2.5">
            {productBrands.map((brand) => (
              <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFilterBrands.includes(brand)}
                  onChange={() => toggleFilterBrand(brand)}
                  className="w-4 h-4 rounded border-border text-primary accent-[var(--color-primary)]"
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Subcategories — only for Autopartes */}
        {isAutomotriz && (
          <div>
            <h3 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
              Subcategoría
            </h3>
            <div className="space-y-2.5">
              {subcategories.map((sub) => (
                <label key={sub} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(sub)}
                    onChange={() => toggleSubcategory(sub)}
                    className="w-4 h-4 rounded border-border text-primary accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {sub}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <div className="bg-input-background min-h-screen">

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="lg:hidden bg-white">
        {isAutomotriz && (
          <div className="bg-input-background px-3 py-6 border-b border-border">
            {/* Information Banner */}
            {showBanner && (
              <div className="bg-[#eef5ff] border border-[#7aa7e8] rounded-[4px] p-2 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] flex-1">
                    <div className="w-5 h-5 flex-shrink-0 text-[#24538f]">
                      <AlertCircle className="block size-full" strokeWidth={2} />
                    </div>
                    <p className="text-[#24538f] text-sm leading-[1.5]">
                      Seleccione un vehículo para encontrar las piezas compatibles.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="w-4 h-4 flex-shrink-0 text-[#24538f] hover:opacity-70 ml-2"
                    aria-label="Cerrar banner"
                  >
                    <X className="block size-full" strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            )}

            {/* Vehicle heading */}
            <div className="flex flex-col gap-6 mb-[30px]">
              <div className="flex items-center gap-1">
                <Car className="w-6 h-6 flex-shrink-0 text-primary" strokeWidth={1.8} />
                <h2 className="text-primary font-bold leading-[1.3] text-[20px]">
                  ¿Para qué vehículo es esta pieza?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setVehicleSearchOpen((open) => !open)}
                aria-expanded={vehicleSearchOpen}
                aria-controls="mobile-vehicle-search"
                className="h-[52px] border border-primary rounded-xl px-4 flex items-center justify-center gap-1.5 hover:bg-muted transition-colors"
              >
                <span className="text-primary text-base leading-[1.5]">Agregar vehículo</span>
                <PencilLine className="w-4 h-4 flex-shrink-0 text-primary" strokeWidth={2} />
              </button>
            </div>

            {/* Search Card */}
            {vehicleSearchOpen && (
              <div id="mobile-vehicle-search" className="bg-white border border-border rounded-xl p-6 shadow-sm">
                {/* Tabs */}
                <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setSearchMode('vehicle')}
                  className={`flex items-center gap-1.5 pb-2 relative transition-colors ${searchMode === 'vehicle' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <div className="w-4 h-4 flex-shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 17 15">
                      <path d={svgPathsFilters.p69d4980} fill={searchMode === 'vehicle' ? 'var(--color-primary)' : '#6B6B7B'} />
                    </svg>
                  </div>
                  <span className="text-base font-bold leading-[1.5]">Buscar por vehículo</span>
                  {searchMode === 'vehicle' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />}
                </button>
                <button
                  onClick={() => setSearchMode('code')}
                  className={`flex items-center gap-1.5 pb-2 relative transition-colors ${searchMode === 'code' ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  <div className="w-4 h-4 flex-shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 15 19">
                      <path d={svgPathsFilters.p1596ba10} fill={searchMode === 'code' ? 'var(--color-primary)' : '#6B6B7B'} />
                    </svg>
                  </div>
                  <span className="text-base font-bold leading-[1.5]">Buscar por código</span>
                  {searchMode === 'code' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />}
                </button>
                </div>
                <div className="h-px bg-[#f0f0f2] mb-6" />

              {/* Forms */}
              {searchMode === 'vehicle' ? (
                <div className="flex flex-col gap-4">
                  {/* Brand */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-primary leading-[1.5]">Marca del vehículo</label>
                    <div className="relative h-[52px]">
                      <div className="absolute inset-0 border border-primary rounded-xl" />
                      <div className="flex items-center gap-3 px-3 h-full">
                        <select value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); setSelectedYear(''); }} className="flex-1 bg-transparent text-sm text-muted-foreground appearance-none cursor-pointer outline-none">
                          <option value="">Seleccionar marca</option>
                          {vehicleBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 text-primary flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                  {/* Model */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground leading-[1.5]">Modelo</label>
                    <div className="relative h-[52px]">
                      <div className={`absolute inset-0 border rounded-xl ${selectedBrand ? 'border-primary' : 'border-muted-foreground'}`} />
                      <div className="flex items-center gap-3 px-3 h-full">
                        <select value={selectedModel} onChange={(e) => { setSelectedModel(e.target.value); setSelectedYear(''); }} className="flex-1 bg-transparent text-sm text-muted-foreground appearance-none cursor-pointer outline-none" disabled={!selectedBrand}>
                          <option value="">Seleccionar modelo</option>
                          {(models[selectedBrand] || []).map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                  {/* Year */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground leading-[1.5]">Año</label>
                    <div className="relative h-[52px]">
                      <div className={`absolute inset-0 border rounded-xl ${selectedModel ? 'border-primary' : 'border-muted-foreground'}`} />
                      <div className="flex items-center gap-3 px-3 h-full">
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="flex-1 bg-transparent text-sm text-muted-foreground appearance-none cursor-pointer outline-none" disabled={!selectedModel}>
                          <option value="">Seleccionar año</option>
                          {years.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleVehicleSearch} className="mt-2 h-[52px] bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                    Buscar repuestos compatibles
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-muted-foreground leading-[1.5]">Código de la pieza</label>
                    <input type="text" value={searchCode} onChange={(e) => setSearchCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCodeSearch()} placeholder="Ej: BDF-4521 o similar" className="h-[52px] bg-card border border-primary rounded-xl px-3 text-sm text-primary placeholder:text-muted-foreground focus:outline-none" />
                  </div>
                  <button onClick={handleCodeSearch} className="h-[52px] bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                    Buscar
                  </button>
                </div>
              )}
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        <div className="bg-white px-3 py-8">
          <div className="mb-6 flex flex-col gap-4">
            <div>
              <h1 className="text-[28px] font-bold text-foreground leading-tight">
                {query ? `"${query}"` : activeCategoryLabel}
              </h1>
              <p className="text-muted-foreground text-base mt-1">
                {filteredProducts.length === 0
                  ? 'Sin resultados'
                  : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'resultado' : 'resultados'}`}
              </p>
            </div>
            <div className="h-px bg-border w-full" />
            {/* Filter and Sort */}
            <div className="flex gap-3 items-center">
              <button onClick={() => navigate('/filters')} className="flex-1 h-11 rounded-xl border border-border flex items-center justify-center gap-1.5 px-4 hover:bg-muted transition-colors">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Filtros</span>
              </button>
              <div className="flex-1 relative">
                <button onClick={() => setSortOpen((v) => !v)} className="w-full h-11 rounded-xl border border-border flex items-center justify-center gap-1.5 px-4 hover:bg-muted transition-colors text-foreground">
                  <span className="text-sm font-medium">Ordenar: {sortLabels[sortBy]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortOpen && (
                  <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                    {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                      <button key={key} onClick={() => { setSortBy(key); setSortOpen(false); }} className={`w-full text-left px-4 py-3 text-sm transition-colors ${sortBy === key ? 'text-primary font-medium bg-muted' : 'text-foreground hover:bg-muted'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-5 grid-cols-1">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:block">

        {/* Vehicle Selector Section — Autopartes only */}
        {isAutomotriz && (
          <div className="bg-input-background px-8 lg:px-16 py-6 border-b border-border">
            <div className="max-w-[1440px] mx-auto">
              {showBanner && (
                <div className="bg-[#eef5ff] border border-[#7aa7e8] rounded-[4px] p-2 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-[6px]">
                    <div className="w-5 h-5 flex-shrink-0 text-[#24538f]">
                      <AlertCircle className="block size-full" strokeWidth={2} />
                    </div>
                    <p className="text-[#24538f] text-sm leading-[1.5]">
                      Seleccione un vehículo para encontrar las piezas compatibles.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="w-4 h-4 flex-shrink-0 text-[#24538f] hover:opacity-70"
                    aria-label="Cerrar banner"
                  >
                    <X className="block size-full" strokeWidth={2.4} />
                  </button>
                </div>
              )}

              {/* Heading */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Car className="w-6 h-6 flex-shrink-0 text-primary" strokeWidth={1.8} />
                  <h2 className="text-primary text-2xl font-bold leading-[1.3]">
                    ¿Para qué vehículo es esta pieza?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setVehicleSearchOpen((open) => !open)}
                  aria-expanded={vehicleSearchOpen}
                  aria-controls="desktop-vehicle-search"
                  className="border border-primary rounded-xl px-5 py-3 flex items-center gap-1.5 hover:bg-muted transition-colors"
                >
                  <span className="text-primary text-base leading-[1.5]">Agregar vehículo</span>
                  <PencilLine className="w-4 h-4 flex-shrink-0 text-primary" strokeWidth={2} />
                </button>
              </div>

              {vehicleSearchOpen && (
                <div id="desktop-vehicle-search">
                  {/* Mode Tabs */}
                  <div className="flex items-center gap-10 mb-5">
                    <button onClick={() => setSearchMode('vehicle')} className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${searchMode === 'vehicle' ? 'border-primary' : 'border-transparent'}`}>
                      <div className="w-5 h-5 flex-shrink-0">
                        <svg className="block size-full" fill="none" viewBox="0 0 17 15">
                          <path d={svgPathsFilters.p69d4980} fill={searchMode === 'vehicle' ? 'var(--color-primary)' : '#6B6B7B'} />
                        </svg>
                      </div>
                      <span className={`text-xl font-bold leading-[1.3] ${searchMode === 'vehicle' ? 'text-primary' : 'text-muted-foreground'}`}>Buscar por vehículo</span>
                    </button>
                    <button onClick={() => setSearchMode('code')} className={`flex items-center gap-1.5 pb-2 border-b-2 transition-colors ${searchMode === 'code' ? 'border-primary' : 'border-transparent'}`}>
                      <div className="w-5 h-5 flex-shrink-0">
                        <svg className="block size-full" fill="none" viewBox="0 0 15 19">
                          <path d={svgPathsFilters.p1596ba10} fill={searchMode === 'code' ? 'var(--color-primary)' : '#6B6B7B'} />
                        </svg>
                      </div>
                      <span className={`text-xl font-bold leading-[1.3] ${searchMode === 'code' ? 'text-primary' : 'text-muted-foreground'}`}>Buscar por código</span>
                    </button>
                  </div>

                  {/* Forms */}
                  {searchMode === 'vehicle' ? (
                <div className="grid grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Marca del vehículo</label>
                    <div className="relative">
                      <select value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); setSelectedYear(''); }} className="w-full h-[52px] bg-input-background border border-primary rounded-xl px-3 text-sm text-primary appearance-none cursor-pointer focus:outline-none">
                        <option value="">Seleccionar</option>
                        {vehicleBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Modelo</label>
                    <div className="relative">
                      <select value={selectedModel} onChange={(e) => { setSelectedModel(e.target.value); setSelectedYear(''); }} className="w-full h-[52px] bg-card border border-muted-foreground rounded-xl px-3 text-sm text-primary appearance-none cursor-pointer focus:outline-none disabled:opacity-50" disabled={!selectedBrand}>
                        <option value="">Seleccionar</option>
                        {(models[selectedBrand] || []).map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Año</label>
                    <div className="relative">
                      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full h-[52px] bg-card border border-muted-foreground rounded-xl px-3 text-sm text-primary appearance-none cursor-pointer focus:outline-none disabled:opacity-50" disabled={!selectedModel}>
                        <option value="">Seleccionar</option>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <button onClick={handleVehicleSearch} className="h-[52px] bg-primary text-white rounded-xl px-6 hover:opacity-90 transition-opacity font-medium">
                    Buscar resultados
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Código de la pieza</label>
                    <input type="text" value={searchCode} onChange={(e) => setSearchCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCodeSearch()} placeholder="Ej: BDF-4521 (incluye marca, año y motor)" className="w-full h-[52px] bg-card border border-muted-foreground rounded-xl px-3 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
                  </div>
                  <button onClick={handleCodeSearch} className="h-[52px] bg-primary text-white rounded-xl px-6 hover:opacity-90 transition-opacity font-medium">
                    Buscar
                  </button>
                </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8 bg-white">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {query ? (
                  <>
                    Resultados para{' '}
                    <span className="text-primary">"{query}"</span>
                  </>
                ) : (
                  activeCategoryLabel
                )}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {filteredProducts.length === 0
                  ? 'Sin resultados'
                  : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}`}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 h-11 px-4 rounded-xl border border-border hover:bg-muted transition-colors text-sm text-foreground font-medium"
              >
                Ordenar: {sortLabels[sortBy]}
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute top-full mt-1 right-0 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden min-w-[180px]">
                  {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                    <button key={key} onClick={() => { setSortBy(key); setSortOpen(false); }} className={`w-full text-left px-4 py-3 text-sm transition-colors ${sortBy === key ? 'text-primary font-semibold bg-muted' : 'text-foreground hover:bg-muted'}`}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <FiltersSidebar />

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
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
