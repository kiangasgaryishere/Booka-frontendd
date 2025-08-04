import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { easings } from '@/utils/animations';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number; // Made optional to allow dynamic calculation
  isGoogleUser?: boolean; // Add flag to determine user type
  className?: string;
}

const ProgressIndicator = ({
  currentStep,
  totalSteps,
  isGoogleUser = false,
  className
}: ProgressIndicatorProps) => {
  // Calculate total steps based on user type if not explicitly provided
  const calculatedTotalSteps = totalSteps || (isGoogleUser ? 6 : 8);
  const progress = (currentStep / calculatedTotalSteps) * 100;

  return (
    <div className={cn('w-full', className)}>
      {/* Simplified progress bar container - maintaining 8px grid system */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress bar fill with smooth animation */}
        <motion.div
          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: easings.easeOut }}
        />

        {/* Subtle animated shimmer effect for visual polish */}
        <motion.div
          className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: [-32, progress > 0 ? (progress / 100) * 100 + 32 : -32]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
