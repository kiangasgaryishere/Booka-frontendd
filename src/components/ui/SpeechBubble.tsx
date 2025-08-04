import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  animated?: boolean;
}

const SpeechBubble = ({ 
  children, 
  className, 
  position = 'top',
  animated = true 
}: SpeechBubbleProps) => {
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: easings.easeOut
      }
    }
  };

  const getTailClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-[-8px] left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-soft-white';
      case 'bottom':
        return 'top-[-8px] left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-soft-white';
      case 'left':
        return 'right-[-8px] top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-soft-white';
      case 'right':
        return 'left-[-8px] top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-soft-white';
      default:
        return 'bottom-[-8px] left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-soft-white';
    }
  };

  return (
    <motion.div
      className={cn(
        'relative inline-block max-w-xs',
        className
      )}
      variants={animated ? bubbleVariants : {}}
      initial={animated ? 'hidden' : 'visible'}
      animate="visible"
    >
      {/* Speech bubble container */}
      <div className={cn(
        'bg-soft-white rounded-bubble px-4 py-3',
        'shadow-bubble border border-gray-100',
        'text-foreground text-sm font-medium',
        'font-persian leading-relaxed'
      )}>
        {children}
      </div>
      
      {/* Speech bubble tail */}
      <div 
        className={cn(
          'absolute w-0 h-0',
          getTailClasses()
        )}
      />
    </motion.div>
  );
};

export default SpeechBubble;
