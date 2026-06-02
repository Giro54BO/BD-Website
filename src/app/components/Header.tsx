import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, MapPin } from 'lucide-react';
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const prevItemCountRef = useRef(itemCount);
  const [badgeAnimKey, setBadgeAnimKey] = useState(0);

  // Trigger slot-machine bounce whenever cart count increases
  useEffect(() => {
    if (itemCount > prevItemCountRef.current) {
      setBadgeAnimKey(k => k + 1);
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
    navigate(getCategoryPath(categoryName));
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

        {categoriesDropdownOpen && (
          <div className="absolute left-0 right-0 top-full z-[90] bg-background border-y border-border shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8">
              <div className="mb-6">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">
                    Explora por negocio
                  </p>
                  <h2 className="text-4xl font-bold text-primary leading-tight">
                    Negocios
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-5">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryClick(category.name)}
                    className="group overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div
                      className="h-[190px] overflow-hidden"
                      style={{ background: category.gradient }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-6">
                        <ImageWithFallback
                          src={categoryImages[category.id] || category.image}
                          alt={category.name}
                          className="max-h-[150px] w-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="block text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {getCategoryLabel(category.name)}
                      </span>
                      <span className="mt-2 block text-sm font-medium text-muted-foreground">
                        Ver catálogo
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
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
    `}</style>
    </>
  );
}
