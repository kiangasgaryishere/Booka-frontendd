import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import DiscoveryCard from '@/components/ui/DiscoveryCard';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface DiscoveryOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const discoveryOptions: DiscoveryOption[] = [
  {
    id: 'social-media',
    title: 'شبکه‌های اجتماعی',
    description: 'اینستاگرام، تلگرام، توییتر و...',
    icon: '📱'
  },
  {
    id: 'search-engine',
    title: 'موتورهای جستجو',
    description: 'گوگل، بینگ و سایر موتورها',
    icon: '🔍'
  },
  {
    id: 'friend-recommendation',
    title: 'معرفی دوستان',
    description: 'توصیه از طرف دوستان و آشنایان',
    icon: '👥'
  },
  {
    id: 'advertisement',
    title: 'تبلیغات آنلاین',
    description: 'بنرها و تبلیغات در وب‌سایت‌ها',
    icon: '📺'
  },
  {
    id: 'app-store',
    title: 'فروشگاه اپلیکیشن',
    description: 'گوگل پلی، اپ استور و...',
    icon: '📲'
  },
  {
    id: 'other',
    title: 'سایر موارد',
    description: 'راه‌های دیگری که ذکر نشده',
    icon: '💭'
  }
];

interface PlatformDiscoveryPageProps {
  className?: string;
}

const PlatformDiscoveryPage = ({ className }: PlatformDiscoveryPageProps) => {
  const navigate = useNavigate();
  const { shouldSkipEmailPhoneInput, user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showCelebration, setShowCelebration] = useState(false);



  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Show celebration for selection
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
  };

  const handleContinue = () => {
    // Complete onboarding and navigate to signup success page
    navigate('/signup-success');
  };

  const handleBack = () => {
    // Google users come from age selection, regular users come from OTP verification
    if (shouldSkipEmailPhoneInput()) {
      navigate('/age-selection');
    } else {
      navigate('/signup-otp-verification');
    }
  };

  const getSpeechBubbleText = () => {
    if (!selectedOption) {
      return 'چطور با بوکا آشنا شدید؟';
    } else {
      const selected = discoveryOptions.find(option => option.id === selectedOption);
      if (selected?.id === 'other') {
        return 'ممنون که با ما در میان گذاشتید!';
      } else {
        return `عالی! از طریق ${selected?.title} پیدامون کردید.`;
      }
    }
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
      {/* Back arrow in top-right corner for RTL */}
      <motion.div
        className="absolute top-6 right-6 z-10"
        variants={pageItem}
      >
        <BackArrow onClick={handleBack} variant="simple" />
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="mb-16" // Increased spacing between progress bar and conversation layout
        variants={pageItem}
      >
        <ProgressIndicator
          currentStep={user?.isGoogleUser ? 5 : 7}
          isGoogleUser={user?.isGoogleUser}
        />
      </motion.div>

      {/* Horizontal conversation layout */}
      <motion.div
        className="flex items-start gap-4 mb-12" // Horizontal layout with gap
        variants={pageItem}
      >
        {/* Dana mascot on the left */}
        <motion.div
          className="flex-shrink-0 relative"
          variants={pageItem}
        >
          <Dana size="md" animated={true} />

          {/* Celebration effect */}
          {showCelebration && (
            <motion.div
              className="absolute text-2xl -top-2 -right-2"
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: [0, 1.2, 1], y: [-20, -40, -20] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              🎉
            </motion.div>
          )}
        </motion.div>

        {/* Speech bubble on the right */}
        <motion.div
          className="flex-1 mt-2" // Slight top margin for alignment
          variants={pageItem}
        >
          <SpeechBubble position="left" animated={true}>
            {getSpeechBubbleText()}
          </SpeechBubble>
        </motion.div>
      </motion.div>



      {/* Discovery options grid */}
      <motion.div
        className="grid grid-cols-1 gap-4 mb-12 flex-1" // Increased spacing
        variants={pageItem}
      >
        {discoveryOptions.map((option, index) => (
          <motion.div
            key={option.id}
            className="w-full"
            variants={pageItem}
            transition={{ delay: index * 0.1 }}
          >
            <DiscoveryCard
              title={option.title}
              description={option.description}
              icon={option.icon}
              isSelected={selectedOption === option.id}
              onClick={() => handleOptionSelect(option.id)}
              className="h-full w-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom padding to account for sticky button - adjusted to match reference proportions */}
      <div className="pb-24" />

      {/* Sticky Continue Button */}
      <StickyButton
        onClick={handleContinue}
        disabled={!selectedOption}
      >
        ادامه
      </StickyButton>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/4 -left-20 w-32 h-32 bg-accent rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 -right-20 w-24 h-24 bg-primary-200 rounded-full opacity-25"></div>
      </div>
    </motion.div>
  );
};

export default PlatformDiscoveryPage;
