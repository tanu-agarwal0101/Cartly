import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';
import { motion } from 'framer-motion';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setFavorites(data.favorites.map(f => f.product) || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[...Array(4)].map((_, i) => (
             <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
          Favorites
          <span className="ml-4 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {favorites.length} items
          </span>
        </h1>
      </div>

      {favorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
        >
          <div className="bg-gray-50 p-4 rounded-full mb-6">
            <Heart className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No favorites yet</h3>
          <p className="text-gray-500 mt-2 text-center max-w-sm mb-8">
             Items you love will appear here. Start browsing to find your next favorite thing.
          </p>
          <Link to="/">
             <Button size="lg" className="shadow-lg shadow-indigo-500/20">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Marketplace
             </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
