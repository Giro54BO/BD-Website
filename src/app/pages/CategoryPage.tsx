import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  AlertCircle,
  ArrowRight,
  Car,
  ChevronDown,
  Grid2X2,
  List,
  PencilLine,
  Search,
  X,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { categories, products } from '../data/mockData';
import { categoryImages, getCategoryLabel } from '../data/categoryImages';
import imgBrand1 from 'figma:asset/1fc4a3179194286e3de909ab6510e5141e3ccce0.png';
import imgBrand2 from 'figma:asset/127927f341520b90d6948349f411b14b63ecc066.png';
import imgBrand3 from 'figma:asset/855f6644fd4c935b120bfa427173093a7ea7c099.png';
import imgBrand4 from 'figma:asset/5c85ed2e558bee29c107d284b0e60284c4d88318.png';
import imgBrand5 from 'figma:asset/65a4cc9e57394b6418cc884691c90dda27666826.png';
import imgBrand6 from 'figma:asset/6ad2fdfd6b853cae9cbea44f282a35305393e58e.png';

type SearchMode = 'vehicle' | 'code';
type SortOption = 'relevance' | 'discount' | 'price_asc' | 'price_desc';

type CategoryBrand = {
  name: string;
  logo?: string;
  mark?: string;
  tone?: string;
};

const categoryBrands: Record<string, CategoryBrand[]> = {
  autopartes: [
    { name: 'Sinteplast', logo: imgBrand1 },
    { name: 'Tigre', logo: imgBrand2 },
    { name: 'Picasso', logo: imgBrand3 },
    { name: 'Voito KH', logo: imgBrand4 },
    { name: 'GPC', logo: imgBrand5 },
    { name: 'Makhartan', logo: imgBrand6 },
  ],
  moda: [
    { name: 'Zara', mark: 'ZARA', tone: 'text-[#111111]' },
    { name: 'Nike', mark: 'NIKE', tone: 'text-[#111111]' },
    { name: 'Adidas', mark: 'adidas', tone: 'text-[#111111]' },
    { name: 'Levi’s', mark: 'Levi’s', tone: 'text-[#c41230]' },
    { name: 'Puma', mark: 'PUMA', tone: 'text-[#111111]' },
    { name: 'H&M', mark: 'H&M', tone: 'text-[#d6001c]' },
  ],
  electrónica: [
    { name: 'Samsung', mark: 'SAMSUNG', tone: 'text-[#1428a0]' },
    { name: 'Apple', mark: 'Apple', tone: 'text-[#111111]' },
    { name: 'Sony', mark: 'SONY', tone: 'text-[#111111]' },
    { name: 'LG', mark: 'LG', tone: 'text-[#a50034]' },
    { name: 'Lenovo', mark: 'Lenovo', tone: 'text-[#e2231a]' },
    { name: 'Xiaomi', mark: 'mi', tone: 'text-[#ff6900]' },
  ],
  ferretería: [
    { name: 'Stanley', mark: 'STANLEY', tone: 'text-[#111111]' },
    { name: 'Bosch', mark: 'BOSCH', tone: 'text-[#e20015]' },
    { name: 'Makita', mark: 'Makita', tone: 'text-[#008a98]' },
    { name: 'DeWalt', mark: 'DEWALT', tone: 'text-[#111111]' },
    { name: 'Truper', mark: 'TRUPER', tone: 'text-[#f37021]' },
    { name: 'Black+Decker', mark: 'B+D', tone: 'text-[#f47b20]' },
  ],
  hogar: [
    { name: 'KitchenAid', mark: 'KitchenAid', tone: 'text-[#c41230]' },
    { name: 'Oster', mark: 'Oster', tone: 'text-[#111111]' },
    { name: 'Philips', mark: 'PHILIPS', tone: 'text-[#0b5ed7]' },
    { name: 'Mabe', mark: 'mabe', tone: 'text-[#2b56a5]' },
    { name: 'Whirlpool', mark: 'Whirlpool', tone: 'text-[#111111]' },
    { name: 'HomeLiving', mark: 'HOME', tone: 'text-primary' },
  ],
};

const categorySubcategories: Record<string, string[]> = {
  autopartes: ['Todos', 'Frenos', 'Motor', 'Suspensión', 'Filtros', 'Transmisión', 'Encendido', 'Refrigeración'],
  electrónica: ['Todos', 'Computadoras', 'Electrodomésticos', 'Impresoras', 'Videojuegos', 'Parlantes', 'Celulares', 'Baterías'],
  moda: ['Todos', 'Calzado', 'Chaquetas', 'Mochilas', 'Accesorios', 'Deportivo'],
  ferretería: ['Todos', 'Herramientas eléctricas', 'Manuales', 'Tornillería', 'Pintura', 'Seguridad'],
  hogar: ['Todos', 'Muebles', 'Iluminación', 'Cocina', 'Decoración', 'Organización'],
};

const heroCopy: Record<string, string> = {
  autopartes: 'Repuestos, filtros y componentes para encontrar la pieza correcta sin perder tiempo.',
  electrónica: 'Tecnología, accesorios y dispositivos para renovar tu día con mejores equipos.',
  moda: 'Prendas, calzado y accesorios con selección directa para uso diario.',
  ferretería: 'Herramientas y soluciones para trabajos profesionales y proyectos de casa.',
  hogar: 'Muebles, iluminación y básicos para equipar espacios con intención.',
};

const sortLabels: Record<SortOption, string> = {
  relevance: 'Relevancia',
  discount: 'Descuentos',
  price_asc: 'Menor precio',
  price_desc: 'Mayor precio',
};

const vehicleBrands = ['Toyota', 'Nissan', 'Chevrolet', 'Ford', 'Hyundai', 'Kia', 'Honda'];
const vehicleModels: Record<string, string[]> = {
  Toyota: ['Corolla', 'Hilux', 'Yaris', 'RAV4'],
  Nissan: ['Sentra', 'Versa', 'Frontier', 'X-Trail'],
  Chevrolet: ['Spark', 'Onix', 'Tracker', 'Sail'],
  Ford: ['Fiesta', 'Focus', 'Ranger', 'EcoSport'],
  Hyundai: ['Accent', 'Elantra', 'Tucson', 'Santa Fe'],
  Kia: ['Rio', 'Cerato', 'Sportage', 'Picanto'],
  Honda: ['Civic', 'Accord', 'CR-V', 'City'],
};
const vehicleYears = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));

function normalize(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getProductCategory(categoryName: string) {
  return normalize(categoryName) === 'autopartes' ? 'Repuestos automotrices' : categoryName;
}

function inferSubcategory(productName: string, categoryKey: string) {
  const name = normalize(productName);

  if (categoryKey === 'autopartes') {
    if (name.includes('freno') || name.includes('pastilla')) return 'Frenos';
    if (name.includes('filtro')) return 'Filtros';
    if (name.includes('embrague')) return 'Transmisión';
    if (name.includes('bateria') || name.includes('alternador')) return 'Encendido';
    return 'Motor';
  }

  if (categoryKey === 'electronica') {
    if (name.includes('smartphone')) return 'Celulares';
    if (name.includes('auricular')) return 'Parlantes';
    if (name.includes('smartwatch')) return 'Baterías';
    return 'Computadoras';
  }

  if (categoryKey === 'moda') {
    if (name.includes('zapatilla')) return 'Calzado';
    if (name.includes('chaqueta')) return 'Chaquetas';
    if (name.includes('mochila')) return 'Mochilas';
    return 'Accesorios';
  }

  if (categoryKey === 'ferreteria') {
    if (name.includes('taladro') || name.includes('atornillador')) return 'Herramientas eléctricas';
    return 'Manuales';
  }

  if (categoryKey === 'hogar') {
    if (name.includes('sofa')) return 'Muebles';
    if (name.includes('lampara')) return 'Iluminación';
    if (name.includes('licuadora')) return 'Cocina';
    return 'Decoración';
  }

  return 'Todos';
}

export function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const decodedCategory = decodeURIComponent(categoryName || '');
  const categoryKey = normalize(decodedCategory);

  const category = categories.find((cat) => normalize(cat.name) === categoryKey);
  const isAutopartes = categoryKey === 'autopartes';
  const displayName = category ? getCategoryLabel(category.name) : decodedCategory;
  const productCategory = category ? getProductCategory(category.name) : '';
  const subcategories = categorySubcategories[categoryKey] || ['Todos'];
  const popularBrands = categoryBrands[categoryKey] || categoryBrands.autopartes;

  const [selectedFilterBrands, setSelectedFilterBrands] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [sortOpen, setSortOpen] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [vehicleSearchOpen, setVehicleSearchOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>('vehicle');
  const [searchCode, setSearchCode] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const resultsSectionRef = useRef<HTMLElement | null>(null);

  const categoryProducts = useMemo(() => {
    const categoryBase = products.filter((product) => normalize(product.category) === normalize(productCategory));

    return categoryBase
      .filter((product) => {
        if (selectedFilterBrands.length > 0 && !selectedFilterBrands.includes(product.brand)) {
          return false;
        }
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }
        if (selectedSubcategory !== 'Todos' && inferSubcategory(product.name, categoryKey) !== selectedSubcategory) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return 0;
      });
  }, [categoryKey, priceRange, productCategory, selectedFilterBrands, selectedSubcategory, sortBy]);

  const weeklyOffers = products.filter((product) => product.discount).slice(0, 3);
  const hasActiveFilters =
    selectedFilterBrands.length > 0 ||
    selectedSubcategory !== 'Todos' ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000;

  const toggleFilterBrand = (brand: string) => {
    setSelectedFilterBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]
    );
  };

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    scrollToResults();
  };

  const handlePopularBrandSelect = (brand: string) => {
    toggleFilterBrand(brand);
    scrollToResults();
  };

  const clearFilters = () => {
    setSelectedFilterBrands([]);
    setSelectedSubcategory('Todos');
    setPriceRange([0, 2000]);
  };

  const handleVehicleSearch = () => {
    const params = new URLSearchParams();
    if (selectedBrand) params.set('brand', selectedBrand);
    if (selectedModel) params.set('model', selectedModel);
    if (selectedYear) params.set('year', selectedYear);
    params.set('category', 'autopartes');
    navigate(`/search?${params.toString()}`);
  };

  const handleCodeSearch = () => {
    if (searchCode.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchCode.trim())}&category=autopartes`);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-input-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Categoría no encontrada</h1>
          <p className="text-muted-foreground mb-6">La categoría que buscas no existe.</p>
          <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-white border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-8 lg:py-10">
          <div className="relative overflow-hidden rounded-2xl bg-[#eeedf4] min-h-[190px] px-6 sm:px-10 lg:px-12 py-8 flex items-center">
            <div className="relative z-10 max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
                Negocio
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-none">
                {displayName}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#54516f] leading-relaxed max-w-[46ch]">
                {heroCopy[categoryKey] || 'Una selección clara de productos para comprar con confianza.'}
              </p>
            </div>
            <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 w-[180px] sm:w-[250px] lg:w-[330px] h-[150px] sm:h-[190px] opacity-90">
              <ImageWithFallback
                src={categoryImages[category.id] || category.image}
                alt={displayName}
                className="w-full h-full object-contain drop-shadow-[0_24px_45px_rgba(48,44,103,0.22)]"
              />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-extrabold text-primary mb-4">Subcategorías</h2>
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  type="button"
                  onClick={() => handleSubcategorySelect(subcategory)}
                  className={`shrink-0 h-10 px-4 rounded-full border text-sm font-semibold transition-colors ${
                    selectedSubcategory === subcategory
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-primary border-primary/70 hover:bg-primary/5'
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-extrabold text-primary mb-5">Marcas populares</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {popularBrands.map((brand) => (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() => handlePopularBrandSelect(brand.name)}
                  className={`aspect-square rounded-full border bg-white flex items-center justify-center p-6 hover:border-primary hover:shadow-[0_18px_38px_rgba(48,44,103,0.08)] transition-all ${
                    selectedFilterBrands.includes(brand.name)
                      ? 'border-primary ring-4 ring-primary/10'
                      : 'border-primary/25'
                  }`}
                  aria-pressed={selectedFilterBrands.includes(brand.name)}
                >
                  {brand.logo ? (
                    <ImageWithFallback src={brand.logo} alt={brand.name} className="max-w-full max-h-16 object-contain" />
                  ) : (
                    <span className={`text-xl sm:text-2xl font-black tracking-tight ${brand.tone || 'text-primary'}`}>
                      {brand.mark || brand.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isAutopartes && (
        <section className="bg-input-background border-y border-border/60">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6">
            {showInfoBanner && (
              <div className="bg-[#eef5ff] border border-[#7aa7e8] rounded-lg p-2.5 mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[#24538f]">
                  <AlertCircle className="w-5 h-5 shrink-0" strokeWidth={2} />
                  <p className="text-sm leading-[1.5]">Seleccione un vehículo para encontrar las piezas compatibles.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInfoBanner(false)}
                  className="w-5 h-5 text-[#24538f] hover:opacity-70 shrink-0"
                  aria-label="Cerrar banner"
                >
                  <X className="block size-full" strokeWidth={2.4} />
                </button>
              </div>
            )}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="flex items-center gap-2">
                <Car className="w-6 h-6 text-primary" strokeWidth={1.8} />
                <h2 className="text-primary text-xl font-extrabold">¿Para qué vehículo es esta pieza?</h2>
              </div>
              <button
                type="button"
                onClick={() => setVehicleSearchOpen((open) => !open)}
                aria-expanded={vehicleSearchOpen}
                aria-controls="category-vehicle-search"
                className="h-12 border border-primary rounded-xl px-5 flex items-center justify-center gap-1.5 hover:bg-white transition-colors text-primary font-semibold"
              >
                Agregar vehículo
                <PencilLine className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            {vehicleSearchOpen && (
              <div id="category-vehicle-search" className="mt-6 bg-white border border-border rounded-2xl p-5">
                <div className="flex items-center gap-8 mb-5">
                  <button
                    type="button"
                    onClick={() => setSearchMode('vehicle')}
                    className={`pb-2 border-b-2 font-extrabold ${searchMode === 'vehicle' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                  >
                    Buscar por vehículo
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('code')}
                    className={`pb-2 border-b-2 font-extrabold ${searchMode === 'code' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                  >
                    Buscar por código
                  </button>
                </div>

                {searchMode === 'vehicle' ? (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Marca del vehículo</label>
                      <select
                        value={selectedBrand}
                        onChange={(event) => {
                          setSelectedBrand(event.target.value);
                          setSelectedModel('');
                          setSelectedYear('');
                        }}
                        className="w-full h-12 bg-white border border-primary rounded-xl px-3 text-sm text-primary focus:outline-none"
                      >
                        <option value="">Seleccionar</option>
                        {vehicleBrands.map((brand) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Modelo</label>
                      <select
                        value={selectedModel}
                        onChange={(event) => {
                          setSelectedModel(event.target.value);
                          setSelectedYear('');
                        }}
                        disabled={!selectedBrand}
                        className="w-full h-12 bg-white border border-border rounded-xl px-3 text-sm text-primary focus:outline-none disabled:opacity-50"
                      >
                        <option value="">Seleccionar</option>
                        {(vehicleModels[selectedBrand] || []).map((model) => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Año</label>
                      <select
                        value={selectedYear}
                        onChange={(event) => setSelectedYear(event.target.value)}
                        disabled={!selectedModel}
                        className="w-full h-12 bg-white border border-border rounded-xl px-3 text-sm text-primary focus:outline-none disabled:opacity-50"
                      >
                        <option value="">Seleccionar</option>
                        {vehicleYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleVehicleSearch}
                      className="h-12 bg-primary text-white rounded-xl px-6 hover:opacity-90 transition-opacity font-bold"
                    >
                      Buscar resultados
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Código de la pieza</label>
                      <input
                        type="text"
                        value={searchCode}
                        onChange={(event) => setSearchCode(event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && handleCodeSearch()}
                        placeholder="Ej: BDF-4521, OEM o VIN"
                        className="w-full h-12 bg-white border border-border rounded-xl px-3 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleCodeSearch}
                      className="h-12 bg-primary text-white rounded-xl px-6 hover:opacity-90 transition-opacity font-bold"
                    >
                      Buscar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <section ref={resultsSectionRef} className="scroll-mt-28 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 pb-6 border-b border-border">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#6b6b7b] tracking-tight">
              {displayName}
            </h2>
            <p className="mt-3 text-muted-foreground">{categoryProducts.length} resultados</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                className="h-11 min-w-[170px] border border-primary rounded-xl px-4 flex items-center justify-between gap-3 text-sm font-semibold text-primary bg-white"
              >
                {sortLabels[sortBy]}
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-[190px] bg-white border border-border rounded-xl shadow-xl z-20 overflow-hidden">
                  {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSortBy(key);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-muted ${sortBy === key ? 'text-primary font-bold bg-muted/70' : 'text-foreground'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="hidden sm:inline text-xs text-muted-foreground">Ver productos</span>
            <Grid2X2 className="w-4 h-4 text-primary" />
            <List className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mt-8">
          <aside className="space-y-7">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Filtros</h3>
              {hasActiveFilters && (
                <button type="button" onClick={clearFilters} className="text-sm font-semibold text-accent hover:underline">
                  Limpiar
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-primary block mb-2">Precio mínimo</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(event) => setPriceRange([Number(event.target.value), priceRange[1]])}
                  className="w-full h-11 px-3 border border-primary rounded-lg text-sm bg-white focus:outline-none"
                  placeholder="Bs. 0.00"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary block mb-2">Precio máximo</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(event) => setPriceRange([priceRange[0], Number(event.target.value)])}
                  className="w-full h-11 px-3 border border-primary rounded-lg text-sm bg-white focus:outline-none"
                  placeholder="Bs. 2000.00"
                />
              </div>
            </div>

            {popularBrands.length > 0 && (
              <div className="border-t border-border pt-5">
                <h3 className="font-bold text-foreground mb-4">Marcas</h3>
                <div className="space-y-3">
                  {popularBrands.map((brand) => (
                    <label key={brand.name} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedFilterBrands.includes(brand.name)}
                        onChange={() => toggleFilterBrand(brand.name)}
                        className="w-4 h-4 rounded border-border text-primary accent-[var(--color-primary)]"
                      />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">{brand.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-border pt-5">
              <h3 className="font-bold text-foreground mb-4">Subcategoría</h3>
              <div className="space-y-3">
                {subcategories.filter((item) => item !== 'Todos').map((subcategory) => (
                  <label key={subcategory} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedSubcategory === subcategory}
                      onChange={() => setSelectedSubcategory(selectedSubcategory === subcategory ? 'Todos' : subcategory)}
                      className="w-4 h-4 rounded border-border text-primary accent-[var(--color-primary)]"
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">{subcategory}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            {categoryProducts.length === 0 ? (
              <div className="min-h-[420px] border border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-muted/20">
                <div className="w-24 h-24 rounded-full bg-white border border-border flex items-center justify-center mb-6 shadow-sm">
                  <Search className="w-10 h-10 text-muted-foreground/55" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-3">
                  {hasActiveFilters ? 'No hay productos con estos filtros' : 'No se encontraron productos'}
                </h3>
                <p className="text-muted-foreground text-base max-w-md mb-8 leading-relaxed">
                  {hasActiveFilters
                    ? 'Prueba con otra marca, subcategoría o rango de precio para ampliar los resultados.'
                    : 'Explora otras categorías o vuelve más tarde para ver nuevos productos disponibles.'}
                </p>
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="h-12 px-6 rounded-xl bg-primary text-white font-bold hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    Limpiar filtros
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="h-12 px-6 rounded-xl bg-primary text-white font-bold hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center"
                  >
                    Volver al inicio
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-primary">Ofertas semanales</h2>
          <Link to="/ofertas" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors">
            Ver más
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {weeklyOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
