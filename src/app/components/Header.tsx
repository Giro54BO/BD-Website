import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, Eye, MapPin } from 'lucide-react';

function normalize(value = '') {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

const megaMenuSubcategories: Record<string, string[]> = {
  autopartes: ['Frenos', 'Motor', 'Suspensión', 'Filtros', 'Transmisión', 'Encendido', 'Refrigeración'],
  electronica: ['Computadoras', 'Electrodomésticos', 'Impresoras', 'Videojuegos', 'Parlantes', 'Celulares', 'Accesorios'],
  moda: ['Calzado', 'Chaquetas', 'Mochilas', 'Accesorios', 'Deportivo'],
  ferreteria: ['Herramientas eléctricas', 'Manuales', 'Tornillería', 'Pintura', 'Seguridad'],
  hogar: ['Muebles', 'Iluminación', 'Cocina', 'Decoración', 'Organización'],
};

const megaMenuBrands: Record<string, string[]> = {
  autopartes: ['Sinteplast', 'Tigre', 'Picasso', 'Voito KH', 'GPC', 'Makhartan'],
  moda: ['Zara', 'Nike', 'Adidas', "Levi's", 'Puma', 'H&M'],
  electronica: ['Apple', 'Samsung', 'Nintendo', 'HP', 'Sony', 'Lenovo'],
  ferreteria: ['Stanley', 'Bosch', 'Makita', 'DeWalt', 'Truper', 'Black+Decker'],
  hogar: ['KitchenAid', 'Oster', 'Philips', 'Mabe', 'Whirlpool', 'HomeLiving'],
};

const megaMenuSucursales = [
  '2 de Agosto', 'Alto San Pedro', 'Arroyo Concepción', 'Casco Viejo',
  'El Parí', 'El Torno', 'German Moreno', 'La Colorada', 'La Guardia',
  'Los Lotes', 'Minero', 'Montero', 'Mutualista', 'Pampa de la Isla',
  'Piraí', 'Plan 3000', 'San José', 'Satélite Norte', 'Villa 1º de Mayo', 'Yapacaní',
];
import svgPaths from "../../imports/svg-dzlm20prl5";
import svgPathsMobile from "../../imports/svg-pmlra41f7y";
import imgBigdamAzul1 from "figma:asset/618631a906a3f14879ebf268c012439e9a59550d.png";
import { MobileMenu } from "./MobileMenu";
import { categories, products } from "../data/mockData";
import { categoryImages, getCategoryLabel, getCategoryPath } from "../data/categoryImages";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeaderProps {
  selectedCity: string;
  isLocationModalOpen?: boolean;
  onOpenLocationModal: () => void;
}

export function Header({ selectedCity, isLocationModalOpen = false, onOpenLocationModal }: HeaderProps) {
  const { itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [selectedMegaCategory, setSelectedMegaCategory] = useState<string | null>(null);

  // Default-select the first category whenever the mega menu opens
  useEffect(() => {
    if (categoriesDropdownOpen) {
      setSelectedMegaCategory(prev => prev ?? (categories[0]?.id ?? null));
    }
  }, [categoriesDropdownOpen]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLAnchorElement>(null);
  const mobileCartButtonRef = useRef<HTMLAnchorElement>(null);
  const prevItemCountRef = useRef(itemCount);
  const [badgeAnimKey, setBadgeAnimKey] = useState(0);

  // Trigger badge bounce + button shake whenever cart count increases
  useEffect(() => {
    if (itemCount > prevItemCountRef.current) {
      setBadgeAnimKey(k => k + 1);
      [cartButtonRef, mobileCartButtonRef].forEach(ref => {
        const el = ref.current;
        if (!el) return;
        el.style.animation = 'none';
        void el.offsetHeight; // force reflow to restart animation
        el.style.animation = 'cartShake 0.55s cubic-bezier(0.36,0.07,0.19,0.97) both';
      });
    }
    prevItemCountRef.current = itemCount;
  }, [itemCount]);

  // Filter products based on search query
  const searchSuggestions = searchQuery.trim().length > 0
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6) // Limit to 6 suggestions
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleProductClick = (productId: string) => {
    setSearchModalOpen(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSearchModalOpen(false);
    setCategoriesDropdownOpen(false);
    setSelectedMegaCategory(null);
    navigate(getCategoryPath(categoryName));
  };

  const handleMegaMenuFilter = (
    categoryName: string,
    type: 'initialSubcategory' | 'initialBrand' | 'initialSucursal',
    value: string
  ) => {
    setCategoriesDropdownOpen(false);
    setSelectedMegaCategory(null);
    navigate(getCategoryPath(categoryName), { state: { [type]: value } });
  };

  // Close open menus on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setCategoriesDropdownOpen(false);
      }
    };

    if (searchModalOpen || categoriesDropdownOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    if (searchModalOpen) {
      // Focus input when modal opens
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }

    return () => document.removeEventListener('keydown', handleEsc);
  }, [searchModalOpen, categoriesDropdownOpen]);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(event.target as Node)
      ) {
        setCategoriesDropdownOpen(false);
        setSelectedMegaCategory(null);
      }
    };

    if (categoriesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [categoriesDropdownOpen]);

  return (
    <>
    <header className="bg-background sticky top-0 z-50 relative">
      {/* Desktop Header */}
      <div className="hidden lg:block bg-background" ref={categoriesDropdownRef}>
        <div className="flex bg-background items-center justify-between px-8 lg:px-16 py-[18px]">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center h-8 flex-shrink-0"
          >
            <img
              src={imgBigdamAzul1}
              alt="BigDam"
              className="h-[46.475px] w-[145.666px] object-cover"
            />
          </Link>

          <div className="flex flex-1 items-center justify-center min-w-0 px-8">
            <div className="flex w-full max-w-[900px] items-center justify-center gap-3">
              {/* Negocios Mega Menu */}
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen((isOpen) => !isOpen)}
                className="flex h-[52px] items-center gap-2 rounded-xl px-4 text-primary text-base leading-[1.5] hover:bg-muted hover:text-primary/80 transition-colors whitespace-nowrap"
                aria-expanded={categoriesDropdownOpen}
                aria-haspopup="menu"
              >
                <span>Negocios</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Search Bar Button (opens modal) */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="min-w-0 flex-1"
              >
                <div className="bg-input-background flex gap-[15px] items-center px-4 py-1 rounded-xl border border-primary relative hover:border-primary/80 transition-colors cursor-pointer">
                  <span className="flex-1 h-9 flex items-center text-sm text-muted-foreground truncate">
                    Buscar por marca, modelo, año o motor...
                  </span>
                  <div className="w-6 h-6 flex-shrink-0 relative">
                    <div className="absolute inset-[14.1%_14.18%_14.26%_14.18%]">
                      <svg
                        className="absolute block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 17.192 17.1923"
                      >
                        <path
                          d={svgPaths.p34e8e200}
                          fill="var(--color-primary)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="h-[52px] rounded-xl bg-primary px-7 text-base font-bold text-white transition-colors hover:bg-primary/90"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Location Button */}
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="bg-card flex items-center justify-center gap-2 h-[52px] px-4 rounded-xl flex-shrink-0 hover:bg-muted transition-colors text-primary"
              aria-haspopup="dialog"
            >
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="text-base leading-[1.5] whitespace-nowrap max-w-[132px] truncate">
                {selectedCity || 'Ubicación'}
              </span>
              <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isLocationModalOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Cart Button */}
            <Link
              ref={cartButtonRef}
              to="/cart"
              className="bg-card flex gap-1 h-[52px] items-center justify-center px-4 rounded-xl flex-shrink-0 hover:bg-muted transition-colors relative"
            >
              <span className="text-primary text-base leading-[1.5] whitespace-nowrap">
                Mi carrito
              </span>
              <div className="w-5 h-5 flex-shrink-0 relative">
                <div className="absolute inset-[9.37%_12.47%_10.18%_6.25%]">
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 19.5077 19.3078"
                  >
                    <path
                      d={svgPaths.p3761b200}
                      fill="var(--color-primary)"
                    />
                  </svg>
                </div>
                {itemCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium overflow-hidden">
                    <span
                      key={badgeAnimKey}
                      style={{ display: 'inline-block', animation: badgeAnimKey > 0 ? 'badgeSlotBounce 0.4s cubic-bezier(0.34,1.56,0.64,1) both' : 'none' }}
                    >
                      {itemCount}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Divider */}
            <div className="flex h-6 items-center justify-center w-0 flex-shrink-0">
              <div className="rotate-90 w-6 h-0">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 24 1"
                >
                  <line
                    stroke="var(--color-primary)"
                    x2="24"
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
              </div>
            </div>

            {/* Profile Button */}
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="bg-card flex gap-1 h-[52px] items-center justify-center px-4 rounded-xl w-[124px] flex-shrink-0 hover:bg-muted transition-colors"
            >
              <span className="text-primary text-base leading-[1.5] whitespace-nowrap">
                Mi perfil
              </span>
              <div className="w-5 h-5 flex-shrink-0 relative">
                <div className="absolute inset-[10.42%]">
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 19 19"
                  >
                    <path
                      d={svgPaths.p2155cd80}
                      fill="var(--color-primary)"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {categoriesDropdownOpen && (() => {
          const activeCat = categories.find(c => c.id === selectedMegaCategory) ?? null;
          const activeCatKey = activeCat ? normalize(activeCat.name) : '';
          const activeSubs = megaMenuSubcategories[activeCatKey] ?? [];
          const activeBrands = megaMenuBrands[activeCatKey] ?? [];

          return (
            <div className="absolute left-0 right-0 top-full z-[90] bg-background border-y border-border shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
              <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-7 pb-8">
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                    Explora por negocio
                  </p>
                  <h2 className="text-3xl font-bold text-primary leading-tight">
                    Negocios
                  </h2>
                </div>

                {/* Category cards — selectable */}
                <div className="grid grid-cols-6 gap-4">
                  {categories.map((category) => {
                    const isActive = selectedMegaCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedMegaCategory(isActive ? null : category.id)}
                        className={`group overflow-hidden rounded-xl border-2 bg-card text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          isActive
                            ? 'border-primary ring-[3px] ring-primary/20 shadow-lg'
                            : 'border-border hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5'
                        }`}
                      >
                        <div
                          className="h-[110px] overflow-hidden"
                          style={{ background: category.gradient }}
                        >
                          <div className="w-full h-full flex items-center justify-center p-4">
                            <ImageWithFallback
                              src={categoryImages[category.id] || category.image}
                              alt={category.name}
                              className="max-h-[80px] w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </div>
                        <div className={`px-4 py-3 flex items-center justify-between transition-colors ${isActive ? 'bg-primary/5' : ''}`}>
                          <span className={`text-sm font-bold leading-snug transition-colors ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                            {getCategoryLabel(category.name)}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isActive ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                        </div>
                      </button>
                    );
                  })}

                  {/* Ver todas las categorías card */}
                  <button
                    type="button"
                    onClick={() => { setCategoriesDropdownOpen(false); setSelectedMegaCategory(null); navigate('/categorias'); }}
                    className="group rounded-xl border-2 border-dashed border-border bg-white transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex flex-col items-center justify-center gap-3 px-4 py-5"
                    style={{ minHeight: 'calc(110px + 46px)' }}
                  >
                    <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center bg-muted/40 group-hover:border-primary/50 group-hover:bg-primary/5 transition-colors">
                      <Eye className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-semibold text-center leading-snug text-muted-foreground group-hover:text-primary transition-colors">
                      Ver todas las categorías
                    </span>
                  </button>
                </div>

                {/* Hint below the card row */}
                <p className="mt-3 text-xs text-muted-foreground">
                  Selecciona una categoría para ver sus filtros
                </p>

                {/* Filter panel — appears below cards when a category is selected */}
                {activeCat && (
                  <div className="mt-5 border-t border-border pt-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-primary">
                        {getCategoryLabel(activeCat.name)}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(activeCat.name)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
                      >
                        Ver todo el catálogo <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subcategorías */}
                    {activeSubs.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Subcategorías</p>
                        <div className="flex flex-wrap gap-2">
                          {activeSubs.map((sub) => (
                            <button
                              key={sub}
                              type="button"
                              onClick={() => handleMegaMenuFilter(activeCat.name, 'initialSubcategory', sub)}
                              className="h-8 px-3.5 rounded-full border border-primary/60 text-sm font-semibold text-primary bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Marcas */}
                    {activeBrands.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Marcas</p>
                        <div className="flex flex-wrap gap-2">
                          {activeBrands.map((brand) => (
                            <button
                              key={brand}
                              type="button"
                              onClick={() => handleMegaMenuFilter(activeCat.name, 'initialBrand', brand)}
                              className="h-8 px-3.5 rounded-full border border-primary/60 text-sm font-semibold text-primary bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sucursales */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Sucursales</p>
                      <div className="flex flex-wrap gap-2">
                        {megaMenuSucursales.map((sucursal) => (
                          <button
                            key={sucursal}
                            type="button"
                            onClick={() => handleMegaMenuFilter(activeCat.name, 'initialSucursal', sucursal)}
                            className="h-8 px-3.5 rounded-full border border-primary/60 text-sm font-semibold text-primary bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
                          >
                            {sucursal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-background flex items-center justify-between px-8 py-[18px]">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0"
        >
          <div className="overflow-clip relative w-8 h-8">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 32 32"
            >
              <path
                d={svgPathsMobile.p345914f0}
                fill="var(--color-primary)"
              />
            </svg>
            <div className="absolute inset-[21.26%_48.77%_39.58%_18.41%]">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 10.5028 12.5317"
              >
                <path
                  clipRule="evenodd"
                  d={svgPathsMobile.p131a2800}
                  fill="white"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute inset-[37.78%_17.77%_23.23%_54.67%]">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 8.81761 12.4743"
              >
                <path
                  clipRule="evenodd"
                  d={svgPathsMobile.p3ae03d00}
                  fill="white"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute inset-[55.57%_43.03%_8.26%_10.41%]">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 14.8989 11.576"
              >
                <path
                  d={svgPathsMobile.pb0f6d00}
                  fill="var(--color-accent)"
                />
              </svg>
            </div>
            <div className="absolute inset-[24.79%_14.98%_38.38%_64.63%]">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 6.52456 11.7845"
              >
                <path
                  d={svgPathsMobile.p3592200}
                  fill="var(--color-accent)"
                />
              </svg>
            </div>
            <div className="absolute inset-[55.51%_35.37%_38.32%_56.97%]">
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 2.45123 1.97365"
              >
                <path
                  d={svgPathsMobile.p1281be80}
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </Link>

        {/* Search Bar Button (opens modal) */}
        <button
          type="button"
          onClick={() => setSearchModalOpen(true)}
          className="flex-1 max-w-[269px] mx-4"
        >
          <div className="bg-input-background flex items-center justify-between px-4 py-1 rounded-xl border border-primary relative h-11 cursor-pointer hover:border-primary/80 transition-colors">
            <span className="flex-1 text-sm text-muted-foreground">
              Busca por marca, modelo, año...
            </span>
            <div className="w-4 h-4 flex-shrink-0 relative ml-2">
              <svg
                className="block size-full"
                fill="none"
                viewBox="0 0 17.192 17.1923"
              >
                <path
                  d={svgPathsMobile.p34e8e200}
                  fill="var(--color-primary)"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Location Button */}
        <button
          type="button"
          onClick={onOpenLocationModal}
          className="hidden sm:flex items-center gap-2 text-sm text-primary mr-4"
        >
          <MapPin className="w-4 h-4" />
          <span>Ubicación</span>
        </button>

        {/* Cart Icon */}
        <Link
          ref={mobileCartButtonRef}
          to="/cart"
          className="w-4 h-4 flex-shrink-0 relative mr-4"
          aria-label="Carrito"
        >
          <svg
            className="block size-full"
            fill="none"
            viewBox="0 0 19.5077 19.3078"
          >
            <path
              d={svgPathsMobile.p3761b200}
              fill="var(--color-primary)"
            />
          </svg>
          {itemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium overflow-hidden">
              <span
                key={badgeAnimKey}
                style={{ display: 'inline-block', animation: badgeAnimKey > 0 ? 'badgeSlotBounce 0.4s cubic-bezier(0.34,1.56,0.64,1) both' : 'none' }}
              >
                {itemCount}
              </span>
            </div>
          )}
        </Link>

        {/* Account Icon */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-4 h-4 flex-shrink-0 relative"
          aria-label="Mi cuenta"
        >
          <svg
            className="block size-full"
            fill="none"
            viewBox="0 0 19 19"
          >
            <path
              d={svgPathsMobile.p2155cd80}
              fill="var(--color-primary)"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] flex items-start justify-center pt-12 lg:pt-20 px-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-[800px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar in Modal */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="bg-input-background flex gap-[15px] items-center px-4 py-1 rounded-xl border-2 border-primary relative shadow-lg">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por marca, modelo, año o motor..."
                  className="flex-1 h-11 bg-transparent text-sm lg:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0 relative"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    viewBox="0 0 17.192 17.1923"
                  >
                    <path
                      d={svgPaths.p34e8e200}
                      fill="var(--color-primary)"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden mb-4">
                <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-border">
                  <h3 className="text-xs lg:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Resultados ({searchSuggestions.length})
                  </h3>
                </div>
                <div className="divide-y divide-border max-h-[40vh] overflow-y-auto">
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 hover:bg-muted transition-colors text-left"
                    >
                      <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm lg:text-base text-foreground font-medium truncate">
                          {product.name}
                        </p>
                        <p className="text-xs lg:text-sm text-muted-foreground">
                          {product.brand} · {product.code}
                        </p>
                        <p className="text-sm lg:text-base text-primary font-bold mt-1">
                          Bs. {product.price.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories List - Only show when no search query */}
            {searchQuery.trim().length === 0 && (
              <div className="bg-card rounded-xl shadow-xl border border-border overflow-hidden max-h-[60vh] lg:max-h-[70vh] overflow-y-auto">
                <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-border sticky top-0 bg-card z-10">
                  <h3 className="text-xs lg:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    Principales Categorías
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {categories.map((category) => {
                    const imageUrl = categoryImages[category.id] || category.image;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.name)}
                        className="w-full flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 hover:bg-muted transition-colors text-left"
                      >
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          <ImageWithFallback
                            src={imageUrl}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm lg:text-base text-foreground font-medium">
                          {getCategoryLabel(category.name)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
    <style>{`
      @keyframes badgeSlotBounce {
        0%   { transform: translateY(120%) scale(0.6); opacity: 0; }
        55%  { transform: translateY(-25%) scale(1.15); opacity: 1; }
        80%  { transform: translateY(8%) scale(0.95); }
        100% { transform: translateY(0%) scale(1); opacity: 1; }
      }
      @keyframes cartShake {
        0%   { transform: translateX(0) rotate(0deg); }
        15%  { transform: translateX(-4px) rotate(-6deg); }
        30%  { transform: translateX(4px) rotate(5deg); }
        45%  { transform: translateX(-3px) rotate(-4deg); }
        60%  { transform: translateX(3px) rotate(3deg); }
        75%  { transform: translateX(-2px) rotate(-2deg); }
        90%  { transform: translateX(1px) rotate(1deg); }
        100% { transform: translateX(0) rotate(0deg); }
      }
    `}</style>
    </>
  );
}
