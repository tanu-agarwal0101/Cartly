import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Skeleton } from '../components/ui/Skeleton';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Separator } from '../components/ui/Separator';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products', {
        params: { search: debouncedSearch, page, limit: 12 },
      });
      setProducts(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, debouncedSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setDebouncedSearch(search);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pb-6 relative">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Marketplace</h1>
          <p className="text-gray-500 text-lg">Curated collection of premium digital assets.</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="relative flex-1 sm:w-80 group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <Button variant="outline" className="gap-2 shrink-0">
             <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>
        </div>
      </div>
      
      <Separator className="mb-8" />

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {products.length === 0 && (
            <div className="text-center py-20 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-1">We couldn&apos;t find anything matching &quot;{search}&quot;</p>
              <Button 
                variant="link" 
                onClick={() => setSearch('')} 
                className="mt-2 text-indigo-600"
              >
                Clear search
              </Button>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="flex justify-center items-center py-8">
           <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm font-medium text-gray-700 px-4 min-w-[3rem] text-center">
                {page} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
           </div>
        </div>
      )}
    </div>
  );
}
