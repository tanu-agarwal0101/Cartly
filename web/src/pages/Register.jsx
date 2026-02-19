import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { motion } from 'framer-motion';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(email, password);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 relative">
      {/* Right Col - Form (Swapped for variety or keep consistent? Let's keep consistent left for brand, right for form) */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900 to-zinc-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1564&q=80')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="relative z-10 flex items-center space-x-2">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">Cartly</span>
        </div>
        
        <div className="relative z-10 max-w-lg">
           <h2 className="text-3xl font-bold leading-tight mb-4">Start your journey today</h2>
           <p className="text-zinc-400">Join thousands of users discovering curated digital and physical goods on the world's fastest growing micro-marketplace.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-gray-50/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-gray-500">Enter your email below to create your account</p>
          </div>

          <Card className="border-0 shadow-lg ring-1 ring-gray-900/5 sm:rounded-xl">
             <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete="new-password"
                  />
                  
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" isLoading={loading}>
                    Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
             </CardContent>
             <CardFooter className="flex justify-center border-t border-gray-50 py-4">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </Link>
                </p>
             </CardFooter>
          </Card>
          
          <p className="px-8 text-center text-sm text-gray-400">
             By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
      
      {/* Mobile Header */}
      <div className="absolute top-4 left-4 lg:hidden">
         <div className="flex items-center space-x-2 font-bold text-gray-900">
            <ShoppingBag className="h-6 w-6 text-indigo-600" />
            <span>Cartly</span>
         </div>
      </div>
    </div>
  );
}
