import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

// Utility type to separate React props from Framer Motion props
type MotionInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>;

interface EmailInputProps extends MotionInputProps {
  label?: string;
  error?: string;
  className?: string;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const hasError = !!error;

    return (
      <motion.div 
        className="w-full space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easings.easeOut }}
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
          type="email"
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

EmailInput.displayName = 'EmailInput';

export default EmailInput;
