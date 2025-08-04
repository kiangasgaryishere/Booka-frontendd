import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import Button from '@/components/ui/Button';
import Confetti from '@/components/magicui/confetti';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem, celebratory } from '@/utils/animations';

interface SignupSuccessPageProps {
  className?: string;
}

const SignupSuccessPage = ({ className }: SignupSuccessPageProps) => {
  const navigate = useNavigate();



  const handleContinueToHome = () => {
    // Navigate to main app dashboard
    navigate('/dashboard');
  };



  return (
    <Confetti
      className="min-h-screen bg-background relative overflow-hidden"
      options={{
        particleCount: 100,
        spread: 70,
        startVelocity: 30,
        gravity: 0.5,
        drift: 0,
        ticks: 300,
        colors: [
          "#6E61FF", // Primary Booka color
          "#38a169", // Success green
          "#d69e2e", // Warning yellow
          "#9688ff", // Light purple
          "#e8e6ff", // Very light purple
          "#ffffff", // White
        ],
        zIndex: 1,
      }}
    >
      <motion.div
        className={cn(
          'min-h-screen flex flex-col',
          'px-7 py-12', // Enhanced spacing following 8px grid
          'relative z-10', // Ensure content appears above confetti
          className
        )}
        variants={pageContainer}
        initial="hidden"
        animate="visible"
        dir="rtl"
      >

      {/* Main content container - centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        
        {/* Success Icon with checkmark */}
        <motion.div
          className="mb-8 relative"
          variants={pageItem}
        >
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
            <motion.svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </div>
        </motion.div>

        {/* Horizontal layout - Dana and Speech Bubble */}
        <motion.div
          className="flex items-center gap-4 mb-12 w-full" // Horizontal layout
          variants={pageItem}
        >
          {/* Dana mascot with celebratory animation */}
          <motion.div
            className="flex-shrink-0"
            variants={celebratory}
            initial="initial"
            animate="celebrate"
          >
            <Dana size="md" animated={false} />
          </motion.div>

          {/* Speech bubble with congratulatory message */}
          <motion.div
            className="flex-1"
            variants={pageItem}
          >
            <SpeechBubble position="left" animated={true}>
              <div className="text-center">
                <div className="text-lg font-bold text-primary-600 mb-1 font-persian">
                  تبریک! 🎉
                </div>
                <div className="text-sm text-foreground font-persian leading-relaxed">
                  حساب کاربری شما با موفقیت ایجاد شد!
                </div>
              </div>
            </SpeechBubble>
          </motion.div>
        </motion.div>

        {/* Success message */}
        <motion.div
          className="text-center mb-12"
          variants={pageItem}
        >
          <h1 className={cn(
            'text-4xl font-bold text-primary-500 mb-4', // Large title
            'font-persian'
          )}>
            خوش آمدید! 👋
          </h1>

          <p className={cn(
            'text-lg text-muted leading-relaxed max-w-xs', // Descriptive text
            'font-persian'
          )}>
            حالا می‌تونید از تمام امکانات بوکا استفاده کنید و یادگیری رو شروع کنید.
          </p>
        </motion.div>

        {/* Action button */}
        <motion.div
          className="w-full"
          variants={pageItem}
        >
          {/* Primary button - Continue to main app */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleContinueToHome}
          >
            شروع یادگیری
          </Button>
        </motion.div>
      </div>
      </motion.div>
    </Confetti>
  );
};

export default SignupSuccessPage;
