import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface TimeSelectionCardProps {
  minutes: number;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const TimeSelectionCard = ({
  minutes,
  description,
  isSelected = false,
  onClick,
  className,
  disabled = false
}: TimeSelectionCardProps) => {
  const cardVariants = {
    initial: { 
      scale: 1,
      y: 0
    },
    hover: { 
      scale: disabled ? 1 : 1.05,
      y: disabled ? 0 : -6,
      transition: {
        duration: 0.2,
        ease: easings.easeOut
      }
    },
    tap: { 
      scale: disabled ? 1 : 0.95,
      transition: {
        duration: 0.1
      }
    },
    selected: {
      scale: 1.02,
      y: -3,
      transition: {
        duration: 0.3,
        ease: easings.easeOut
      }
    }
  };

  const clockVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: disabled ? 0 : 15,
      transition: {
        duration: 0.3,
        ease: easings.easeOut
      }
    },
    selected: {
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: easings.easeOut
      }
    }
  };

  return (
    <motion.div
      className={cn(
        'relative p-4 rounded-3xl border-2 cursor-pointer', // Same border-2 as Platform Discovery
        'bg-white transition-all duration-300', // Clean white background
        'select-none',
        'min-h-[64px] w-full', // Compact height matching minimalistic approach
        'flex flex-row items-center', // Horizontal layout for compact design

        // Default state - same as Platform Discovery
        !isSelected && !disabled && [
          'border-gray-200 hover:border-primary-300',
          'shadow-sm hover:shadow-md'
        ],

        // Selected state - same as Platform Discovery
        isSelected && [
          'border-primary-500 bg-primary-50',
          'shadow-lg shadow-primary-200'
        ],

        // Disabled state
        disabled && [
          'border-gray-100 bg-gray-50',
          'cursor-not-allowed opacity-60'
        ],
        
        className
      )}
      variants={cardVariants}
      initial="initial"
      whileHover={!disabled ? "hover" : "initial"}
      whileTap={!disabled ? "tap" : "initial"}
      animate={isSelected ? "selected" : "initial"}
      onClick={disabled ? undefined : onClick}
    >
      {/* Selection indicator - right side like minimalistic approach */}
      {isSelected && (
        <motion.div
          className="mr-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}

      {/* Clock icon - left side like minimalistic approach */}
      <motion.div
        className="text-2xl mr-4 flex-shrink-0"
        variants={clockVariants}
        initial="initial"
        animate={isSelected ? "selected" : "initial"}
      >
        🕐
      </motion.div>

      {/* Content - right side like minimalistic approach */}
      <div className="flex-1 text-right">
        {/* Minutes display */}
        <div className="mb-1">
          <span className={cn(
            'text-base font-medium font-persian', // Reduced size for minimalistic approach
            isSelected ? 'text-primary-700' : 'text-foreground'
          )}>
            {minutes} دقیقه
          </span>
        </div>

        {/* Description */}
        <p className={cn(
          'text-sm text-right leading-tight',
          'font-persian',
          isSelected ? 'text-primary-600' : 'text-muted'
        )}>
          {description}
        </p>
      </div>

      {/* Subtle background highlight for selected state - minimalistic approach */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-primary-50 rounded-3xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default TimeSelectionCard;
