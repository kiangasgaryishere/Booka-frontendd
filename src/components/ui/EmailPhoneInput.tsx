import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

// Utility type to separate React props from Framer Motion props
type MotionInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>;

interface EmailPhoneInputProps extends MotionInputProps {
  label?: string;
  error?: string;
  className?: string;
  value?: string;
}

const EmailPhoneInput = forwardRef<HTMLInputElement, EmailPhoneInputProps>(
  ({ label, error, className, value = '', ...props }, ref) => {
    const hasError = !!error;
    // Use static input attributes to prevent mobile keyboard switching
    const inputType = 'email'; // Static type that works well for both email and phone
    const autoComplete = 'email tel'; // Support both email and phone autocomplete
    // Remove placeholder text - leave input field empty

    return (
      <motion.div 
        className="w-full space-y-3"
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

        {/* Input field */}
        <motion.input
          ref={ref}
          type={inputType}
          inputMode="email"
          value={value}
          autoComplete={autoComplete}
          className={cn(
            // Base styles
            'w-full px-6 py-3 rounded-2xl border-2 transition-all duration-300',
            'font-persian text-lg text-foreground placeholder:text-muted',
            'focus:outline-none focus:ring-4 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'text-center', // Center align text
            'bg-soft-white shadow-md',
            
            // Default state - minimalistic focus
            !hasError && [
              'border-gray-200',
              'hover:border-gray-300 hover:shadow-lg',
              'focus:border-gray-400 focus:ring-gray-200' // Subtle neutral focus
            ],
            
            // Error state
            hasError && [
              'border-red-300 bg-red-50',
              'hover:border-red-400',
              'focus:border-red-500 focus:ring-red-200'
            ],
            
            className
          )}
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          {...props}
        />

        {/* Error message */}
        {error && (
          <motion.p
            className="text-red-500 text-sm font-persian text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        {/* Input type indicator (subtle) - dynamically detect based on content */}
        {value.trim() && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs text-muted font-persian">
              {value.includes('@') ? 'ایمیل' : 'شماره تلفن'}
            </span>
          </motion.div>
        )}
      </motion.div>
    );
  }
);

EmailPhoneInput.displayName = 'EmailPhoneInput';

export default EmailPhoneInput;
