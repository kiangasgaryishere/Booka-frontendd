import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';
import Button from './Button';

interface StickyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const StickyButton = ({
  children,
  onClick,
  disabled = false,
  className
}: StickyButtonProps) => {
  return (
    <motion.div
      className={cn(
        // Fixed positioning at bottom
        'fixed bottom-0 left-0 right-0 z-50',
        // Background with blur effect
        'bg-background/95 backdrop-blur-sm border-t border-gray-200',
        // Container padding with increased top margin and 8px bottom margin
        'px-8 pt-8 pb-2',
        // Safe area padding for mobile devices
        'pb-safe-bottom',
        // Shadow for depth
        'shadow-lg'
      )}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: easings.easeOut,
        delay: 0.2 // Slight delay for better UX
      }}
    >
      <Button
        variant="primary"
        size="lg"
        className={cn('w-full', className)}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default StickyButton;
