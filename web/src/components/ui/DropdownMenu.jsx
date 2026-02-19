import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export function DropdownMenu({ trigger, children, align = 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "absolute z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1",
              align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
            )}
          >
            <div className="py-1" role="none">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownMenuItem({ children, onClick, className, destructive }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center rounded-sm px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
        destructive && "text-red-600 hover:text-red-700 hover:bg-red-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownMenuLabel({ children }) {
  return <div className="px-2 py-1.5 text-sm font-semibold text-gray-900">{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-100" />;
}
