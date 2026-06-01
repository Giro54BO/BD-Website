// Utility function to generate Unsplash image URLs based on search query
// For categories, we'll use predefined image URLs
const categoryImages: Record<string, string> = {
  'fashion accessories': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop&q=80',
  'automotive parts tools': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&q=80',
  'electronic devices': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&q=80',
  'hardware tools': 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop&q=80',
  'home furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&q=80'
};

export function unsplash_tool(query: string): string {
  return categoryImages[query] || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop&q=80';
}
