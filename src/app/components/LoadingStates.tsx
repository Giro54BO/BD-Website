import React from 'react';

/**
 * Loading Spinner Component
 * Usage: <LoadingSpinner /> or <LoadingSpinner text="Cargando..." />
 */
export const LoadingSpinner = ({ text = 'Cargando...' }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="animate-spin">
      <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full" />
    </div>
    {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
  </div>
);

/**
 * Product Card Skeleton Loader
 * Shows placeholder while product data loads
 */
export const ProductCardSkeleton = () => (
  <div className="rounded-lg border border-border bg-card p-4 animate-pulse">
    <div className="w-full h-48 bg-muted rounded-lg mb-4" />
    <div className="h-4 bg-muted rounded mb-3" />
    <div className="h-4 bg-muted rounded w-2/3 mb-4" />
    <div className="flex justify-between items-end">
      <div className="h-6 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-1/4" />
    </div>
  </div>
);

/**
 * Grid of product skeleton loaders
 */
export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Banner Skeleton Loader
 */
export const BannerSkeleton = () => (
  <div className="w-full h-64 bg-muted rounded-lg animate-pulse" />
);

/**
 * Page Section Skeleton
 * Generic placeholder for any section
 */
export const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-muted rounded w-1/4 mb-6" />
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded" />
      ))}
    </div>
  </div>
);
