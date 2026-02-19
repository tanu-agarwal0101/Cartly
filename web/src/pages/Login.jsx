import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 relative">
      {/* Left Col - Desktop Only */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-zinc-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1574&q=80')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="relative z-10 flex items-center space-x-2">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">Cartly</span>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Cartly has transformed how I discover unique items. The platform is incredibly intuitive and the curation is top-notch.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">Sofia Davis, Product Designer</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Col - Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-gray-50/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-gray-500">Enter your email to sign in to your account</p>
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
                  
                  <div className="space-y-1">
                     <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <Link to="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                          Forgot password?
                        </Link>
                     </div>
                     <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                     />
                  </div>
                  
                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full" isLoading={loading}>
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-100" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <Button variant="outline" type="button" disabled>GitHub</Button>
                   <Button variant="outline" type="button" disabled>Google</Button>
                </div>
             </CardContent>
             <CardFooter className="flex justify-center border-t border-gray-50 py-4">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </Link>
                </p>
             </CardFooter>
          </Card>
          
          <p className="px-8 text-center text-sm text-gray-400">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
      
      {/* Mobile Header (Absolute) */}
      <div className="absolute top-4 left-4 lg:hidden">
         <div className="flex items-center space-x-2 font-bold text-gray-900">
            <ShoppingBag className="h-6 w-6 text-indigo-600" />
            <span>Cartly</span>
         </div>
      </div>
    </div>
  );
}
