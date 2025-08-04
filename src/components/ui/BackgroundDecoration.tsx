import { cn } from '@/utils/cn';

interface BackgroundDecorationProps {
  className?: string;
}

/**
 * Reusable background decoration component
 * Used across authentication and onboarding pages
 */
const BackgroundDecoration = ({ className }: BackgroundDecorationProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
      <div className="absolute top-1/4 -left-20 w-32 h-32 bg-accent rounded-full opacity-30"></div>
      <div className="absolute bottom-1/4 -right-20 w-24 h-24 bg-primary-200 rounded-full opacity-25"></div>
    </div>
  );
};

export default BackgroundDecoration;