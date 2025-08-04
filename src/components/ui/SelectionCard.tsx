import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface SelectionCardProps {
  title: string;
  description: string;
  icon: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const SelectionCard = ({
  title,
  description,
  icon,
  isSelected = false,
  onClick,
  className,
  disabled = false
}: SelectionCardProps) => {
  const cardVariants = {
    initial: { 
      scale: 1,
      y: 0
    },
    hover: { 
      scale: disabled ? 1 : 1.02,
      y: disabled ? 0 : -4,
      transition: {
        duration: 0.2,
        ease: easings.easeOut
      }
    },
    tap: { 
      scale: disabled ? 1 : 0.98,
      transition: {
        duration: 0.1
      }
    },
    selected: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.3,
        ease: easings.easeOut
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: disabled ? 1 : 1.1,
      rotate: disabled ? 0 : 5,
      transition: {
        duration: 0.2,
        ease: easings.easeOut
      }
    },
    selected: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: easings.easeOut
      }
    }
  };

  return (
    <motion.div
      className={cn(
        'relative p-5 rounded-2xl border-2 cursor-pointer', // Increased padding
        'bg-soft-white transition-all duration-200',
        'select-none',
        'min-h-36 w-full', // Increased minimum height
        'flex flex-col justify-between', // Distribute content evenly

        // Default state
        !isSelected && !disabled && [
          'border-gray-200 hover:border-primary-300',
          'shadow-sm hover:shadow-md'
        ],

        // Selected state - using softer colors for better eye comfort
        isSelected && [
          'border-primary-400 bg-soft-primary-100',
          'shadow-md shadow-primary-100'
        ],

        // Disabled state - using softer neutral colors
        disabled && [
          'border-gray-100 bg-soft-neutral-100',
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
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: easings.easeOut }}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}

      {/* Content container with flex layout */}
      <div className="flex flex-col h-full">
        {/* Icon */}
        <motion.div
          className="text-3xl text-center mb-3 flex-shrink-0" // Increased icon size and margin
          variants={iconVariants}
          initial="initial"
          animate={isSelected ? "selected" : "initial"}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className={cn(
          'text-sm font-bold text-center mb-2 flex-shrink-0', // Increased bottom margin
          'font-persian leading-relaxed', // Better line height
          isSelected ? 'text-primary-700' : 'text-foreground'
        )}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(
          'text-xs text-center leading-relaxed flex-grow', // Improved line height
          'font-persian overflow-hidden',
          'line-clamp-2', // Limit to 2 lines
          isSelected ? 'text-primary-600' : 'text-muted'
        )}>
          {description}
        </p>
      </div>

      {/* Animated background glow for selected state - softer glow */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-soft-primary-200 rounded-2xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default SelectionCard;
