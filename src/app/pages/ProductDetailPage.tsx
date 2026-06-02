import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/mockData';
import { Star, Truck, Shield, RotateCcw, ShoppingCart, Minus, Plus, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Producto no encontrado</h1>
          <Link to="/search" className="text-primary hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => 
    p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const handleAddToCart = () => {
    if (buttonState !== 'idle') return;
    setButtonState('loading');
    // Simulate brief async delay then add to cart
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        code: product.code,
        category: product.category,
        brand: product.brand,
      }, quantity);
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 1200);
    }, 700);
  };

  const images = [product.image, product.image]; // In real app, product would have multiple images

  return (
    <>
    <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Inicio</Link>
        {' / '}
        <Link to="/search" className="hover:text-foreground">Repuestos automotrices</Link>
        {' / '}
        <Link to="/search" className="hover:text-foreground">Frenos</Link>
        {' / '}
        <span className="text-foreground">{product.code}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div>
          <div className="bg-muted rounded-lg overflow-hidden mb-4 aspect-square">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`bg-muted rounded-lg aspect-square overflow-hidden border-2 ${
                  selectedImage === idx ? 'border-primary' : 'border-transparent'
                }`}
              >
                <ImageWithFallback
                  src={img}
                  alt={`${product.name} - Image ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Badges */}
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-muted text-muted-foreground px-4 py-2 rounded-full">
              {product.brand}
            </span>
            {product.discount && (
              <span className="bg-accent text-white px-4 py-2 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {product.name}
          </h1>

          {/* Code */}
          <p className="text-xl text-muted-foreground mb-4">
            <span className="font-medium">Código:</span> {product.code}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(product.rating)
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xl text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-6 h-6 text-chart-4" />
            <span className="text-xl text-chart-4">En stock</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-4 mb-8">
            <p className="text-5xl font-medium text-foreground">
              Bs. {product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-2xl text-muted-foreground line-through mb-2">
                Bs. {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted rounded-lg p-4 text-center">
              <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground">Envío rápido</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground">Garantía</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground">Devoluciones</p>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-end gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Cantidad
              </label>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-8 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Subtotal
              </label>
              <p className="text-3xl font-medium text-foreground">
                Bs. {(product.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={buttonState !== 'idle'}
            className="w-full bg-primary text-white py-4 rounded-lg flex items-center justify-center gap-2 transition-all text-lg font-medium overflow-hidden"
            style={{
              opacity: buttonState !== 'idle' ? 0.95 : 1,
              transform: buttonState === 'success' ? 'scale(1.01)' : 'scale(1)',
              background: buttonState === 'success' ? 'var(--color-chart-4, #22c55e)' : undefined,
              transition: 'background 0.3s ease, transform 0.15s ease',
            }}
          >
            {buttonState === 'idle' && (
              <>
                Agregar al carrito
                <ShoppingCart className="w-6 h-6" />
              </>
            )}
            {buttonState === 'loading' && (
              <svg
                className="w-6 h-6 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {buttonState === 'success' && (
              <svg
                className="w-7 h-7"
                style={{ animation: 'cartCheckPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Compatible Vehicles */}
      {product.compatibleVehicles && product.compatibleVehicles.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
            <h2 className="text-2xl font-bold text-foreground">Vehículos compatible con:</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {product.compatibleVehicles.map((vehicle, idx) => (
              <div
                key={idx}
                className={`bg-muted rounded-lg p-4 text-center ${
                  idx === 2 ? 'bg-chart-4/10 border-2 border-chart-4' : ''
                }`}
              >
                <p className={`font-medium ${idx === 2 ? 'text-chart-4' : 'text-foreground'}`}>
                  {vehicle.brand}
                </p>
                <p className={`text-sm ${idx === 2 ? 'text-chart-4' : 'text-muted-foreground'}`}>
                  {vehicle.model}
                </p>
                <p className={`text-sm ${idx === 2 ? 'text-chart-4' : 'text-muted-foreground'}`}>
                  {vehicle.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-12">
        <div className="bg-muted rounded-lg p-3 inline-flex gap-12 mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'description'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Descripción
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'specs'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Especificaciones
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'reviews'
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Opiniones
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          {activeTab === 'description' && (
            <div>
              <p className="text-lg text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === 'specs' && product.specifications && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-border">
                  <span className="font-medium text-foreground">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No hay opiniones todavía
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
                Ser el primero en opinar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Más repuestos compatibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
    <style>{`
      @keyframes cartCheckPop {
        0%   { transform: scale(0.4) rotate(-15deg); opacity: 0; }
        60%  { transform: scale(1.25) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
    `}</style>
    </>
  );
}