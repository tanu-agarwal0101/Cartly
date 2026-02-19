import { Link, useNavigate } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { useState } from 'react';
import { cn } from '../lib/utils';

function ProductCard({ product }) {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const isFavorited = user?.favorites?.some(f => f.productId === product.id);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      await api.post(`/products/${product.id}/favorite`);
      await refreshUser();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="group relative flex flex-col h-full overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-gray-900/5 bg-white">
        {/* Image Container */}
        <Link to={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-2 group-hover:translate-y-0 z-10">
             <Button 
               variant="secondary" 
               size="icon" 
               className={cn(
                 "h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors",
                 isFavorited ? "text-red-500 hover:text-red-600 bg-red-50" : "hover:text-red-500"
               )}
               onClick={toggleFavorite}
               disabled={loading}
             >
               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />}
             </Button>
          </div>
        </Link>
        
        {/* Content */}
        <CardContent className="flex flex-col flex-1 p-5">
          <div className="flex justify-between items-start mb-2 gap-2">
            <Link to={`/products/${product.id}`} className="block flex-1">
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <Badge variant="secondary" className="font-semibold bg-gray-50 text-gray-900 border border-gray-100">
               ${product.price}
            </Badge>
          </div>
          
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>

          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium">
             <span>Free Shipping</span>
             <Link 
              to={`/products/${product.id}`}
              className="text-indigo-600 hover:text-indigo-700 flex items-center"
            >
              Details
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
