import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const variants = {
  default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-indigo-500/20',
  secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100/50 hover:text-gray-900',
  outline: 'border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900',
  destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
  link: 'text-indigo-600 underline-offset-4 hover:underline',
};

const sizes = {
  sm: 'h-8 px-3 text-xs',
  default: 'h-10 px-4 py-2',
  lg: 'h-12 px-8 text-base',
  icon: 'h-10 w-10 p-0 items-center justify-center',
};

const Button = forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  isLoading = false, 
  children, 
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
