import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

// Utility type to separate React props from Framer Motion props
type MotionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends MotionButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    children,
    className,
    animated = false,
    disabled,
    ...props
  }, ref) => {

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'font-persian font-medium text-button',
      'rounded-full transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none'
    );

    const variantClasses = {
      primary: cn(
        'bg-primary-500 text-white border border-primary-500',
        'hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700'
      ),
      secondary: cn(
        'bg-accent text-primary-500 border border-primary-200',
        'hover:bg-primary-100 hover:border-primary-300 active:bg-primary-200 active:border-primary-400'
      ),
      ghost: cn(
        'bg-transparent text-primary-500 border border-transparent',
        'hover:bg-primary-50 active:bg-primary-100'
      )
    };

    const sizeClasses = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-6 text-base',
      lg: 'h-14 px-8 text-lg'
    };


const ButtonComponent = 'button';

    return (
      <ButtonComponent
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </ButtonComponent>
    );
  }
);

Button.displayName = 'Button';

export default Button;
