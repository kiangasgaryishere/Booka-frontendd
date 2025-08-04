import { forwardRef, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  ({ length = 4, value, onChange, error, className, disabled = false }, ref) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const hasError = !!error;

    useEffect(() => {
      // Focus first input on mount
      if (inputRefs.current[0] && !disabled) {
        inputRefs.current[0].focus();
      }
    }, [disabled]);

    const handleChange = (index: number, inputValue: string) => {
      // Only allow digits
      const digit = inputValue.replace(/\D/g, '').slice(-1);
      
      const newValue = value.split('');
      newValue[index] = digit;
      
      // Pad with empty strings if needed
      while (newValue.length < length) {
        newValue.push('');
      }
      
      onChange(newValue.join(''));

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!value[index] && index > 0) {
          // If current input is empty, focus previous and clear it
          inputRefs.current[index - 1]?.focus();
          const newValue = value.split('');
          newValue[index - 1] = '';
          onChange(newValue.join(''));
        } else {
          // Clear current input
          const newValue = value.split('');
          newValue[index] = '';
          onChange(newValue.join(''));
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
      onChange(pastedData.padEnd(length, ''));
      
      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    };

    return (
      <motion.div 
        ref={ref}
        className={cn('w-full space-y-4', className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easings.easeOut }}
      >
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3">
          {Array.from({ length }, (_, index) => (
            <motion.input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              className={cn(
                // Base styles
                'w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-300',
                'font-persian text-foreground bg-soft-white shadow-md',
                'focus:outline-none focus:ring-4 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                
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
                
                // Filled state
                value[index] && !hasError && 'border-primary-400 bg-primary-50'
              )}
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

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
      </motion.div>
    );
  }
);

OTPInput.displayName = 'OTPInput';

export default OTPInput;
