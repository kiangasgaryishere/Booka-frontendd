import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface DanaProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const Dana = ({ className, size = 'lg', animated = true }: DanaProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24', // 96px - close to the 100px requirement
    xl: 'w-32 h-32'
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.easeInOut
    }
  };

  return (
    <motion.div
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        className
      )}
      animate={animated ? floatAnimation : {}}
    >
      {/* Main mascot container with rounded square background */}
      <div className="relative w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl shadow-lg overflow-hidden">
        
        {/* Origami paper fold lines - subtle texture */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-2 w-full h-0.5 bg-white transform -rotate-12"></div>
          <div className="absolute top-4 right-2 w-0.5 h-full bg-white transform rotate-12"></div>
        </div>

        {/* Eyes */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {/* Left eye */}
          <div className="relative">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-foreground rounded-full"></div>
            </div>
          </div>
          {/* Right eye */}
          <div className="relative">
            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-foreground rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Eyebrows - small dark lines above eyes */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <div className="w-3 h-0.5 bg-primary-800 rounded-full"></div>
          <div className="w-3 h-0.5 bg-primary-800 rounded-full"></div>
        </div>

        {/* Mouth - small smile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-2 border-b-2 border-primary-800 rounded-full"></div>
        </div>

        {/* Origami scholar elements - small geometric shapes */}
        <div className="absolute bottom-2 left-2">
          <div className="w-2 h-2 bg-primary-200 transform rotate-45 opacity-60"></div>
        </div>
        <div className="absolute bottom-2 right-2">
          <div className="w-2 h-2 bg-primary-200 transform rotate-45 opacity-60"></div>
        </div>

        {/* Central origami fold - representing the scholar aspect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-1 h-8 bg-primary-300 opacity-30 transform rotate-12"></div>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-primary-500 rounded-3xl opacity-20 blur-sm -z-10"></div>
    </motion.div>
  );
};

export default Dana;
