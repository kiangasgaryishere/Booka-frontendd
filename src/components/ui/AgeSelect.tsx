import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface AgeSelectProps {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const AgeSelect = forwardRef<HTMLDivElement, AgeSelectProps>(
  ({ label, error, value, onChange, className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasError = !!error;

    // Generate age options from 13 to 80
    const ageOptions = Array.from({ length: 68 }, (_, i) => i + 13);

    const handleSelect = (age: number) => {
      onChange?.(age.toString());
      setIsOpen(false);
    };

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <motion.div 
        ref={ref}
        className={cn("w-full space-y-3 relative", className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Label */}
        {label && (
          <label className={cn(
            'block text-lg font-medium text-foreground',
            'font-persian text-center'
          )}>
            {label}
          </label>
        )}

        {/* Select button */}
        <motion.div
          className={cn(
            // Base styles
            'w-full px-6 py-3 rounded-2xl border-2 transition-all duration-300',
            'font-persian text-lg text-foreground',
            'focus:outline-none focus:ring-4 focus:ring-offset-2',
            'cursor-pointer select-none',
            'text-center bg-soft-white shadow-md',
            'flex items-center justify-between',
            
            // Default state - softer colors for better eye comfort
            !hasError && [
              'border-gray-200',
              'hover:border-primary-300 hover:shadow-lg hover:bg-soft-neutral-50',
              isOpen && 'border-primary-400 ring-4 ring-primary-100'
            ],
            
            // Error state
            hasError && [
              'border-red-300 bg-red-50',
              'hover:border-red-400',
              isOpen && 'border-red-500 ring-4 ring-red-200'
            ]
          )}
          onClick={toggleOpen}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className={cn(
            'flex-1 text-center',
            !value && 'text-muted'
          )}>
            {value ? `${value} سال` : 'سن خود را انتخاب کنید'}
          </span>
          
          {/* Arrow icon */}
          <motion.svg
            className="w-5 h-5 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.div>

        {/* Dropdown list */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={cn(
                'absolute top-full left-0 right-0 z-50 mt-2',
                'bg-soft-white border-2 border-gray-200 rounded-2xl shadow-xl',
                'max-h-60 overflow-y-auto'
              )}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: easings.easeOut }}
            >
              {ageOptions.map((age) => (
                <motion.div
                  key={age}
                  className={cn(
                    'px-6 py-3 cursor-pointer transition-colors duration-150',
                    'font-persian text-center border-b border-gray-100 last:border-b-0',
                    'hover:bg-soft-primary-100 hover:text-primary-700',
                    value === age.toString() && 'bg-soft-primary-200 text-primary-700 font-medium'
                  )}
                  onClick={() => handleSelect(age)}
                  whileHover={{ backgroundColor: 'var(--primary-soft-100)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {age} سال
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop to close dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Error message */}
        {error && (
          <motion.p 
            className="text-sm text-red-600 font-persian text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

AgeSelect.displayName = 'AgeSelect';

export default AgeSelect;
