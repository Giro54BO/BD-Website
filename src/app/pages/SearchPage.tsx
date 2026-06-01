import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import svgPaths from '../../imports/svg-worchwxac6';
import svgPathsMobile from '../../imports/svg-eymrglue4j';
import svgPathsSearch from '../../imports/svg-ykvc2l1ede';
import svgPathsFilters from '../../imports/svg-ulnwdl2pel';

type SearchMode = 'vehicle' | 'code';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [searchMode, setSearchMode] = useState<SearchMode>('vehicle');
  const [showBanner, setShowBanner] = useState(true);
  
  // Vehicle search states
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Code search state
  const [searchCode, setSearchCode] = useState('');
  
  // Filter states
  const [selectedFilterBrands, setSelectedFilterBrands] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // Mock data for vehicle dropdowns
  const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
  const models = ['Corolla', 'Camry', 'RAV4', 'Hilux'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  // Filter products based on all criteria
  const filteredProducts = products.filter((product) => {
    // Search query filter
    if (query && !product.name.toLowerCase().includes(query.toLowerCase()) &&
        !product.code.toLowerCase().includes(query.toLowerCase()) &&
        !product.brand.toLowerCase().includes(query.toLowerCase())) {
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

  const productBrands = Array.from(new Set(products.map(p => p.brand)));
  const subcategories = ['Sistema de frenos', 'Suspensión', 'Motor', 'Transmisión', 'Dirección'];

  const toggleFilterBrand = (brand: string) => {
    setSelectedFilterBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory) ? prev.filter(s => s !== subcategory) : [...prev, subcategory]
    );
  };

  const handleVehicleSearch = () => {
    // Handle vehicle search logic
    console.log('Searching for:', { selectedBrand, selectedModel, selectedYear });
  };

  const handleCodeSearch = () => {
    // Handle code search logic
    console.log('Searching for code:', searchCode);
  };

  return (
    <div className="bg-input-background min-h-screen">
      {/* Mobile Layout */}
      <div className="lg:hidden bg-[#ffffff]">
        {/* Aclaracion Section */}
        <div className="bg-input-background px-3 py-6">
          {/* Yellow Warning Banner */}
          {showBanner && (
            <div className="bg-[#fdf7e6] border border-[#efac00] rounded-[4px] p-2 mb-[30px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px] flex-1">
                  {/* Info Icon */}
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                      <mask height="20" id="mask0_info" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
                        <rect fill="#D9D9D9" height="20" width="20" />
                      </mask>
                      <g mask="url(#mask0_info)">
                        <path d={svgPathsMobile.p16f11100} fill="#EFAC00" />
                      </g>
                    </svg>
                  </div>
                  <p className="text-[#835f00] text-sm leading-[1.5]">
                    Seleccione un vehículo para encontrar las piezas compatibles.
                  </p>
                </div>
                <button onClick={() => setShowBanner(false)} className="w-4 h-4 flex-shrink-0 hover:opacity-70 ml-2">
                  <svg className="block size-full" fill="none" viewBox="0 0 13.3075 13.3075">
                    <path d={svgPathsMobile.p20bff00} fill="#EFAC00" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Vehicle Question and Add Vehicle Button */}
          <div className="flex flex-col gap-6 mb-[30px]">
            <div className="flex items-center gap-1">
              {/* Car Icon */}
              <div className="w-6 h-6 flex-shrink-0">
                <svg className="block size-full" fill="none" viewBox="0 0 17 15">
                  <path d={svgPathsMobile.p69d4980} fill="var(--color-primary)" />
                </svg>
              </div>
              <h2 className="text-primary font-bold leading-[1.3] text-[20px]">
                ¿Para qué vehículo es esta pieza?
              </h2>
            </div>
            <button className="h-[52px] border border-primary rounded-xl px-4 flex items-center justify-center gap-1 hover:bg-muted transition-colors">
              <span className="text-primary text-base leading-[1.5]">Agregar vehículo</span>
              <div className="w-4 h-4 flex-shrink-0">
                <svg className="block size-full" fill="none" viewBox="0 0 20 21.7345">
                  <path d={svgPathsMobile.pbd22480} fill="var(--color-primary)" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white border-[0.5px] border-[#bfbed0] rounded-xl p-6 mx-3 my-6">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSearchMode('vehicle')}
              className={`flex items-center gap-1 pb-2 relative ${
                searchMode === 'vehicle' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="w-4 h-4 flex-shrink-0">
                <svg className="block size-full" fill="none" viewBox="0 0 17 15">
                  <path 
                    d={svgPathsSearch.p69d4980} 
                    fill={searchMode === 'vehicle' ? 'var(--color-primary)' : '#6B6B7B'} 
                  />
                </svg>
              </div>
              <span className="text-base leading-[1.5]">
                Buscar por vehículo
              </span>
              {searchMode === 'vehicle' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>

            <button
              onClick={() => setSearchMode('code')}
              className={`flex items-center gap-1 pb-2 relative ${
                searchMode === 'code' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="w-4 h-4 flex-shrink-0">
                <svg className="block size-full" fill="none" viewBox="0 0 15 19">
                  <path 
                    d={svgPathsSearch.p1596ba10} 
                    fill={searchMode === 'code' ? 'var(--color-primary)' : '#6B6B7B'} 
                  />
                </svg>
              </div>
              <span className="text-base leading-[1.5]">
                Buscar por código
              </span>
              {searchMode === 'code' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#f0f0f2] mb-6" />

          {/* Search Forms */}
          {searchMode === 'vehicle' ? (
            <div className="flex flex-col gap-1">
              {/* Brand Dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-primary leading-[1.5]">Marca del vehículo</label>
                <div className="relative h-[52px]">
                  <div className="absolute inset-0 border border-primary rounded-xl" />
                  <div className="flex items-center gap-3 px-3 h-full">
                    <div className="w-4 h-4 flex-shrink-0">
                      <svg className="block size-full" fill="none" viewBox="0 0 17.192 17.1923">
                        <path d={svgPathsSearch.p34e8e200} fill="var(--color-primary)" />
                      </svg>
                    </div>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-muted-foreground appearance-none cursor-pointer outline-none"
                    >
                      <option value="">Seleccionar o buscar marca</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <div className="w-4 h-4 flex-shrink-0">
                      <svg className="block size-full" fill="none" viewBox="0 0 11.3075 6.7075">
                        <path d={svgPathsSearch.p34b30800} fill="var(--color-primary)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-muted-foreground leading-[1.5]">Modelo</label>
                <div className="relative h-[52px]">
                  <div className="absolute inset-0 bg-card border border-muted-foreground rounded-xl" />
                  <div className="flex items-center gap-3 px-3 h-full">
                    <div className="w-6 h-6 flex-shrink-0">
                      <svg className="block size-full" fill="none" viewBox="0 0 17.192 17.1923">
                        <path d={svgPathsSearch.p34e8e200} fill="var(--color-primary)" />
                      </svg>
                    </div>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-muted-foreground appearance-none cursor-pointer outline-none"
                      disabled={!selectedBrand}
                    >
                      <option value="">Seleccionar modelo</option>
                      {models.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    <div className="w-6 h-6 flex-shrink-0">
                      <svg className="block size-full" fill="none" viewBox="0 0 11.3075 6.7075">
                        <path d={svgPathsSearch.p34b30800} fill="var(--color-primary)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Year Dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-muted-foreground leading-[1.5]">Año</label>
                <div className="relative h-[52px]">
                  <div className="absolute inset-0 bg-card border border-muted-foreground rounded-xl" />
                  <div className="flex items-center gap-3 px-3 h-full">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-muted-foreground appearance-none cursor-pointer outline-none"
                      disabled={!selectedModel}
                    >
                      <option value="">Seleccionar año</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <div className="w-6 h-6 flex-shrink-0">
                      <svg className="block size-full" fill="none" viewBox="0 0 11.3075 6.70775">
                        <path d={svgPathsSearch.p1a7900} fill="var(--color-primary)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-6 mt-6">
                <button
                  onClick={handleVehicleSearch}
                  className="h-[54px] bg-muted text-muted-foreground rounded-xl px-4 flex items-center justify-center gap-1 hover:bg-card transition-colors"
                >
                  <span className="text-base leading-[1.5]">Buscar repuestos compatibles</span>
                  <div className="w-6 h-6 flex-shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 19 12">
                      <path d={svgPathsSearch.p1478b400} fill="var(--color-muted-foreground)" />
                    </svg>
                  </div>
                </button>

                <button className="h-[54px] bg-card text-muted-foreground rounded-xl px-4 flex items-center justify-center gap-1 hover:bg-muted transition-colors">
                  <span className="text-base leading-[1.5]">Limpiar búsqueda</span>
                  <div className="w-6 h-6 flex-shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 17.404 15.4038">
                      <path d={svgPathsSearch.p9716740} fill="var(--color-muted-foreground)" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {/* Code Input */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-muted-foreground leading-[1.5]">Buscar por código</label>
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Ej: Ingrese el código AXXS 2005 1234 o similar"
                  className="h-[52px] bg-card border border-muted-foreground rounded-xl px-3 text-sm text-primary placeholder:text-muted-foreground"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-6 mt-6">
                <button
                  onClick={handleCodeSearch}
                  className="h-[54px] bg-muted text-muted-foreground rounded-xl px-4 flex items-center justify-center gap-1 hover:bg-card transition-colors"
                >
                  <span className="text-base leading-[1.5]">Buscar</span>
                </button>

                <button className="h-[54px] bg-card text-muted-foreground rounded-xl px-4 flex items-center justify-center gap-1 hover:bg-muted transition-colors">
                  <span className="text-base leading-[1.5]">Limpiar búsqueda</span>
                  <div className="w-6 h-6 flex-shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 17.404 15.4038">
                      <path d={svgPathsSearch.p9716740} fill="var(--color-muted-foreground)" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white px-3 py-8">
          {/* Title, Results Count, and Filter Buttons */}
          <div className="mb-8 flex flex-col gap-6">
            <h1 className="text-[32px] font-bold text-muted-foreground leading-[1.25] tracking-[-0.0016px]">Autopartes</h1>
            <p className="text-muted-foreground text-lg leading-[1.5]">{filteredProducts.length} resultados</p>
            
            {/* Divider Line */}
            <div className="h-px bg-border w-full" />
            
            {/* Filter and Sort Buttons */}
            <div className="flex gap-6 items-start">
              <button 
                onClick={() => navigate('/filters')}
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
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No se encontraron productos
              </p>
              <p className="text-muted-foreground">
                Intenta ajustar los filtros o realiza una nueva búsqueda
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Vehicle Selection Banner Section */}
        <div className="bg-input-background px-8 lg:px-16 py-6">
          <div className="max-w-[1440px] mx-auto">
            {/* Yellow Warning Banner */}
            {showBanner && (
              <div className="bg-[#fdf7e6] border border-[#efac00] rounded-[4px] p-2 mb-[30px] flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                  {/* Info Icon */}
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                      <mask height="20" id="mask0_info" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
                        <rect fill="#D9D9D9" height="20" width="20" />
                      </mask>
                      <g mask="url(#mask0_info)">
                        <path d={svgPaths.p16f11100} fill="#EFAC00" />
                      </g>
                    </svg>
                  </div>
                  <p className="text-[#835f00] text-sm leading-[1.5]">
                    Seleccione un vehículo para encontrar las piezas compatibles.
                  </p>
                </div>
                <button onClick={() => setShowBanner(false)} className="w-4 h-4 flex-shrink-0 hover:opacity-70">
                  <svg className="block size-full" fill="none" viewBox="0 0 9.648 9.648">
                    <path d={svgPaths.p36a1e2c0} fill="var(--color-primary)" />
                  </svg>
                </button>
              </div>
            )}

            {/* Vehicle Question and Add Vehicle Button */}
            <div className="flex items-center justify-between mb-[30px]">
              <div className="flex items-center gap-1">
                {/* Car Icon */}
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="block size-full" fill="none" viewBox="0 0 17 15">
                    <path d={svgPaths.p69d4980} fill="var(--color-primary)" />
                  </svg>
                </div>
                <h2 className="text-primary text-2xl font-bold leading-[1.3]">
                  ¿Para qué vehículo es esta pieza?
                </h2>
              </div>
              <button className="border border-primary rounded-xl px-4 py-4 flex items-center gap-1 hover:bg-muted transition-colors">
                <span className="text-primary text-base leading-[1.5]">Agregar vehículo</span>
                <div className="w-4 h-4 flex-shrink-0">
                  <svg className="block size-full" fill="none" viewBox="0 0 20 21.7345">
                    <path d={svgPaths.pbd22480} fill="var(--color-primary)" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Search Mode Tabs */}
            <div className="flex items-center gap-12 mb-6">
              {/* Vehicle Tab */}
              <button
                onClick={() => setSearchMode('vehicle')}
                className={`flex items-center gap-1 pb-2 border-b-2 transition-colors ${
                  searchMode === 'vehicle' ? 'border-primary' : 'border-transparent'
                }`}
              >
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="block size-full" fill="none" viewBox="0 0 17 15">
                    <path 
                      d={svgPaths.p69d4980} 
                      fill={searchMode === 'vehicle' ? 'var(--color-primary)' : '#6B6B7B'} 
                    />
                  </svg>
                </div>
                <span className={`text-2xl font-bold leading-[1.3] ${
                  searchMode === 'vehicle' ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  Buscar por vehículo
                </span>
              </button>

              {/* Code Tab */}
              <button
                onClick={() => setSearchMode('code')}
                className={`flex items-center gap-1 pb-2 border-b-2 transition-colors ${
                  searchMode === 'code' ? 'border-primary' : 'border-transparent'
                }`}
              >
                <div className="w-6 h-6 flex-shrink-0">
                  <svg className="block size-full" fill="none" viewBox="0 0 15 19">
                    <path 
                      d={svgPaths.p1596ba10} 
                      fill={searchMode === 'code' ? 'var(--color-primary)' : '#6B6B7B'} 
                    />
                  </svg>
                </div>
                <span className={`text-2xl font-bold leading-[1.3] ${
                  searchMode === 'code' ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  Buscar por código
                </span>
              </button>
            </div>

            {/* Search Forms */}
            {searchMode === 'vehicle' ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Brand Dropdown */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Marca del vehículo</label>
                  <div className="relative">
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full h-[52px] bg-input-background border border-primary rounded-xl px-3 text-sm text-primary appearance-none cursor-pointer"
                    >
                      <option value="">Seleccionar</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
                      <svg className="block size-full" fill="none" viewBox="0 0 11.3075 6.7075">
                        <path d={svgPaths.p34b30800} fill="var(--color-primary)" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Model Dropdown */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Modelo</label>
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full h-[52px] bg-card border border-muted-foreground rounded-xl px-3 text-sm text-primary appearance-none cursor-pointer"
                      disabled={!selectedBrand}
                    >
                      <option value="">Seleccionar</option>
                      {models.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
                      <svg className="block size-full" fill="none" viewBox="0 0 11.3075 6.7075">
                        <path d={svgPaths.p34b30800} fill="#6B6B7B" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Year Dropdown */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Año</label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full h-[52px] bg-card border border-muted-foreground rounded-xl px-3 text-sm text-primary appearance-none cursor-pointer"
                      disabled={!selectedModel}
                    >
                      <option value="">Seleccionar</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
                      <svg className="block size-full" fill="none" viewBox="0 0 11.3075 6.7075">
                        <path d={svgPaths.p34b30800} fill="#6B6B7B" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleVehicleSearch}
                  className="h-[52px] bg-primary text-white rounded-xl px-6 hover:opacity-90 transition-opacity font-medium"
                >
                  Buscar resultados
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                {/* Code Input */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Buscar por código</label>
                  <input
                    type="text"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="Ej: Ingrese el código AXXS 2005 1234 o similar (incluye marca, año y motor)"
                    className="w-full h-[52px] bg-card border border-muted-foreground rounded-xl px-3 text-sm text-primary placeholder:text-muted-foreground"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleCodeSearch}
                  className="h-[52px] bg-primary text-white rounded-xl px-6 hover:opacity-90 transition-opacity font-medium"
                >
                  Buscar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8 bg-[#ffffff]">
          {/* Title and Results Count */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Autopartes</h1>
            <p className="text-muted-foreground">{filteredProducts.length} resultados</p>
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
                      <span className="text-muted-foreground text-left">Precio maximo</span>
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

                {/* Subcategories Filter */}
                <div>
                  <h3 className="font-bold text-foreground mb-4">Subcategoría</h3>
                  <div className="space-y-3">
                    {subcategories.map((subcategory) => (
                      <label key={subcategory} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={() => toggleSubcategory(subcategory)}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
                        />
                        <span className="text-sm text-foreground">{subcategory}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">
                    No se encontraron productos
                  </p>
                  <p className="text-muted-foreground">
                    Intenta ajustar los filtros o realiza una nueva búsqueda
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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