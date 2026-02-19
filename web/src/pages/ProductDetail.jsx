import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Heart, ArrowLeft, Share2, ShieldCheck, Truck, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Separator } from '../components/ui/Separator';
import { Skeleton } from '../components/ui/Skeleton';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        console.log(`Fetching product ${id}...`);
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        const me = await api.get('/auth/me').catch(() => null);
        if (me && me.data.favorites) {
           const isFav = me.data.favorites.some(f => f.productId === parseInt(id));
           setFavorited(isFav);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const toggleFavorite = async () => {
    setToggling(true);
    try {
      const { data } = await api.post(`/products/${id}/favorite`);
      setFavorited(data.favorited);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setToggling(false);
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-12">
       <Skeleton className="h-[500px] w-full rounded-2xl" />
       <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
       </div>
    </div>
  );

  if (!product) return <div className="text-center py-20 text-gray-500">Product not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Left: Image */}
        <div className="space-y-4">
          <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
               <Badge variant="primary" className="px-3 py-1">New Arrival</Badge>
               <span className="text-sm text-gray-500 font-medium">Verified Seller</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-baseline space-x-2">
               <span className="text-3xl font-bold text-gray-900">${product.price}</span>
               <span className="text-sm text-gray-500">USD</span>
            </div>
          </div>

          <Separator />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 leading-relaxed text-balance"
          >
            {product.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4 py-4"
          >
            <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3">
               <Truck className="h-5 w-5 text-indigo-600 mt-0.5" />
               <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500 mt-0.5">On all US orders over $50</p>
               </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3">
               <Clock className="h-5 w-5 text-indigo-600 mt-0.5" />
               <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Fast Delivery</h4>
                  <p className="text-xs text-gray-500 mt-0.5">2-3 business days</p>
               </div>
            </div>
          </motion.div>

          <div className="flex gap-4 pt-4">
            <Button size="lg" className="flex-1 text-base shadow-lg shadow-indigo-500/20">
              Add to Cart
            </Button>
            <Button 
              size="lg" 
              variant={favorited ? "destructive" : "outline"} 
              onClick={toggleFavorite}
              isLoading={toggling}
              className={cn("px-6 transition-all", favorited ? "bg-red-50 text-red-600 hover:bg-red-100 border-red-200" : "")}
            >
              <Heart className={cn("h-5 w-5 transition-transform", favorited ? 'fill-current scale-110' : 'mr-2')} />
              {!favorited && "Save"}
            </Button>
            <Button size="lg" variant="ghost" className="px-4">
              <Share2 className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
             <ShieldCheck className="h-4 w-4" />
             <span>Secure payment processing encrypted by Stripe</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
