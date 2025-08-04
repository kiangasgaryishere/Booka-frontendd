import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import Button from '@/components/ui/Button';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface WelcomePageProps {
  className?: string;
}

const WelcomePage = ({ className }: WelcomePageProps) => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleGetStarted = () => {
    // Initialize regular user state for non-Google users
    updateUser({
      id: Date.now().toString(),
      isGoogleUser: false,
      authMethod: 'email', // Default to email, will be updated in EmailInput
      hasCompletedEmailPhoneStep: false
    });

    // Navigate to start of complete onboarding flow for non-Google users
    navigate('/life-improvement');
  };

  const handleAlreadyHaveAccount = () => {
    // Navigate to login page
    navigate('/login');
  };

  return (
    <motion.div
      className={cn(
        'min-h-screen bg-background flex flex-col',
        'px-7 py-12', // Enhanced spacing
        'relative overflow-hidden',
        className
      )}
      variants={pageContainer}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >
      {/* Vertical layout - speech bubble above Dana */}
      <motion.div
        className="flex flex-col items-center mb-16" // Back to original spacing
        variants={pageItem}
      >
        {/* Speech bubble positioned above Dana */}
        <motion.div
          className="mb-6 relative" // Enhanced spacing
          variants={pageItem}
        >
          <SpeechBubble position="bottom" animated={true}>
            سلام! من دانا هستم!
          </SpeechBubble>
        </motion.div>

        {/* Dana mascot with waving animation */}
        <motion.div
          className="relative"
          variants={pageItem}
        >
          <Dana size="xl" animated={true} />

          {/* Waving hand animation - positioned to the right of Dana */}
          <motion.div
            className="absolute -top-2 -right-4 text-2xl"
            animate={{
              rotate: [0, 20, -10, 20, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }
            }}
          >
            👋
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">

        {/* App name in Persian */}
        <motion.h1
          className={cn(
            'text-5xl font-bold text-primary-500 text-center mb-4', // Larger title, more spacing
            'font-persian tracking-wide'
          )}
          variants={pageItem}
        >
          بوکا
        </motion.h1>

        {/* Subtitle describing the app */}
        <motion.p
          className={cn(
            'text-lg text-muted text-center mb-10 leading-relaxed', // Back to original size and spacing
            'font-persian max-w-sm px-4'
          )}
          variants={pageItem}
        >
          یادگیری از کتاب‌ها هر زمان و هر جا که بخواهید. رایگان و برای همیشه.
        </motion.p>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        {/* Action buttons - 2 buttons arranged vertically */}
        <motion.div
          className="w-full space-y-4 mb-8" // Back to original spacing
          variants={pageItem}
        >
          {/* Primary button - Get Started */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleGetStarted}
          >
            شروع کنید
          </Button>

          {/* Secondary button - Already have account */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleAlreadyHaveAccount}
          >
            قبلا حساب کاربری دارم
          </Button>
        </motion.div>
      </div>

      {/* Background decoration */}
      <BackgroundDecoration />
    </motion.div>
  );
};

export default WelcomePage;
