import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, Book, User } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BottomNavigationProps {
  className?: string;
}

const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define 4 navigation tabs as requested
  const navTabs = [
    { title: 'خانه', icon: Home, path: '/dashboard' },
    { title: 'لیگ', icon: Trophy, path: '/league', isSpecial: true },
    { title: 'کتابخونه', icon: Book, path: '/library' },
    { title: 'پروفایل', icon: User, path: '/profile' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-soft-white border-t border-soft-neutral-200',
        'px-4 py-4 pb-safe-bottom',
        'shadow-lg',
        className
      )}
      dir="rtl"
    >
      {/* Mobile-First Navigation with 4 tabs */}
      <div className={cn(
        'flex items-center justify-around',
        'max-w-md mx-auto',
        // Responsive spacing for different mobile sizes
        'gap-1 sm:gap-2'
      )}>
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <button
              type="button"
              key={tab.title}
              onClick={() => handleNavigation(tab.path)}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-0 flex-1 transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50',
                'rounded-lg',
                // Mobile-first responsive padding and sizing
                'px-1 py-2 sm:px-2',
                // Ensure minimum touch target of 44px for accessibility
                'min-h-[44px] min-w-[44px]',
                // Responsive spacing
                'gap-1'
              )}
            >
              {/* Icon - Responsive sizing */}
              <div
                className={cn(
                  'transition-colors duration-200',
                  isActive
                    ? 'text-primary-500'
                    : 'text-muted hover:text-foreground'
                )}
              >
                <Icon size={20} className="sm:w-6 sm:h-6" />
              </div>

              {/* Text Label - Always Visible with responsive sizing */}
              <span
                className={cn(
                  'font-medium font-persian',
                  'transition-colors duration-200',
                  'leading-tight text-center',
                  'max-w-full',
                  // Responsive text sizing for mobile-first
                  'text-[10px] sm:text-xs',
                  // Handle long text gracefully with Tailwind classes
                  'break-words',
                  isActive
                    ? 'text-primary-500'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {tab.title}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
