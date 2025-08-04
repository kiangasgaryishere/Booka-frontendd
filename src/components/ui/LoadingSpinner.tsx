import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ className, size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2'
  };

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const circleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: easings.easeInOut,
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn('flex space-x-1 rtl:space-x-reverse', sizeClasses[size])}
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn(
              'bg-primary-500 rounded-full',
              dotSizes[size]
            )}
            variants={circleVariants}
            transition={circleTransition}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
