import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface LoadingPageProps {
  className?: string;
}

const LoadingPage = ({ className }: LoadingPageProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Navigate based on authentication status after loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/welcome');
      }
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);



  return (
    <motion.div
      className={cn(
        'min-h-screen bg-background flex flex-col items-center justify-center',
        'px-6 py-8',
        'relative overflow-hidden',
        className
      )}
      variants={pageContainer}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >


      {/* Main content container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">

        {/* Dana mascot with top margin (30% from top) */}
        <motion.div
          className="mb-16"
          variants={pageItem}
          style={{ marginTop: '30vh' }}
        >
          <Dana size="xl" animated={true} />
        </motion.div>

        {/* App name in Persian */}
        <motion.h1
          className={cn(
            'text-4xl font-bold text-foreground text-center mb-8',
            'font-persian tracking-wide'
          )}
          variants={pageItem}
          style={{ fontSize: '40px', lineHeight: '48px' }}
        >
          بوکا
        </motion.h1>

        {/* Spacer to push loading indicator to bottom */}
        <div className="flex-1"></div>

        {/* Loading indicator with bottom margin (15% from bottom) */}
        <motion.div
          className="mb-16"
          variants={pageItem}
          style={{ marginBottom: '15vh' }}
        >
          <LoadingSpinner size="lg" />
        </motion.div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
