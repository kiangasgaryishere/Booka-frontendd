import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface AgeRangeCardProps {
  ageRange: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const AgeRangeCard = ({
  ageRange,
  title,
  description,
  emoji,
  color,
  isSelected = false,
  onClick,
  className
}: AgeRangeCardProps) => {
  const cardVariants = {
    initial: { 
      scale: 1,
      y: 0,
      rotateY: 0
    },
    hover: { 
      scale: 1.05,
      y: -8,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: easings.easeOut
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    },
    selected: {
      scale: 1.02,
      y: -4,
      transition: {
        duration: 0.4,
        ease: easings.easeOut
      }
    }
  };

  const emojiVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
        ease: easings.easeOut
      }
    },
    selected: {
      scale: 1.3,
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
        'relative p-6 rounded-3xl border-3 cursor-pointer',
        'bg-soft-white transition-all duration-300',
        'select-none overflow-hidden',
        'h-48 w-full flex flex-col justify-between',
        
        // Default state
        !isSelected && [
          'border-gray-200 hover:border-primary-300',
          'shadow-lg hover:shadow-2xl'
        ],
        
        // Selected state
        isSelected && [
          `border-${color}-500`,
          'shadow-2xl',
          `bg-gradient-to-br from-${color}-50 to-${color}-100`
        ],
        
        className
      )}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={isSelected ? "selected" : "initial"}
      onClick={onClick}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className={`absolute -top-3 -right-3 w-8 h-8 bg-${color}-500 rounded-full flex items-center justify-center`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}

      {/* Content */}
      <div className="flex flex-col h-full">
        {/* Emoji */}
        <motion.div
          className="text-5xl text-center mb-3"
          variants={emojiVariants}
          initial="initial"
          animate={isSelected ? "selected" : "initial"}
        >
          {emoji}
        </motion.div>

        {/* Age range */}
        <div className="text-center mb-2">
          <span className={cn(
            'text-2xl font-bold font-persian',
            isSelected ? `text-${color}-700` : 'text-foreground'
          )}>
            {ageRange}
          </span>
          <span className={cn(
            'text-lg font-medium font-persian mr-1',
            isSelected ? `text-${color}-600` : 'text-muted'
          )}>
            سال
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          'text-lg font-bold text-center mb-2 font-persian',
          isSelected ? `text-${color}-700` : 'text-foreground'
        )}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn(
          'text-sm text-center leading-tight font-persian flex-grow',
          isSelected ? `text-${color}-600` : 'text-muted'
        )}>
          {description}
        </p>
      </div>

      {/* Animated background glow */}
      {isSelected && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-200 to-${color}-300 rounded-3xl -z-10 opacity-30`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Sparkle effect for selected state */}
      {isSelected && (
        <>
          <motion.div
            className="absolute top-4 right-4 text-yellow-400"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-yellow-400"
            animate={{
              scale: [0, 1, 0],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            ⭐
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AgeRangeCard;
