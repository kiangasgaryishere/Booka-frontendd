import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface BackArrowProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  variant?: 'default' | 'minimal' | 'modern' | 'simple';
}

const BackArrow = ({
  onClick,
  className,
  size = 'md',
  disabled = false,
  variant = 'modern'
}: BackArrowProps) => {
  const sizeClasses = {
    sm: 'w-9 h-9 p-2',
    md: 'w-11 h-11 p-2.5',
    lg: 'w-13 h-13 p-3'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  const variantClasses = {
    default: 'bg-soft-white shadow-md border border-gray-200 hover:bg-gray-50',
    minimal: 'bg-gray-100 hover:bg-gray-200 border-0',
    modern: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg border-0',
    simple: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg border-0'
  };

  const iconColors = {
    default: 'text-gray-600',
    minimal: 'text-gray-700',
    modern: 'text-white',
    simple: 'text-white'
  };

  return (
    <motion.button
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-xl',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'backdrop-blur-sm',
        !disabled && 'hover:shadow-xl active:scale-95',
        disabled && 'opacity-50 cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={disabled ? undefined : onClick}
      whileHover={!disabled ? { scale: 1.05, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      disabled={disabled}
      aria-label="بازگشت"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: easings.easeOut }}
    >
      {/* Back Arrow - Points Right for Going Back (RTL) */}
      <motion.svg
        className={cn(
          iconColors[variant],
          iconSizes[size]
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </motion.svg>
    </motion.button>
  );
};

export default BackArrow;
