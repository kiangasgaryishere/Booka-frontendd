import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import AgeSelect from '@/components/ui/AgeSelect';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface AgeSelectionPageProps {
  className?: string;
}

const AgeSelectionPage = ({ className }: AgeSelectionPageProps) => {
  const navigate = useNavigate();
  const { shouldSkipEmailPhoneInput, user } = useAuth();
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [error, setError] = useState('');



  const handleAgeChange = (age: string) => {
    setSelectedAge(age);

    // Clear error when user selects age
    if (error && age) {
      setError('');
    }
  };

  const handleContinue = () => {
    if (!selectedAge) {
      setError('لطفاً سن خود را انتخاب کنید');
      return;
    }

    const ageNumber = parseInt(selectedAge);
    if (ageNumber < 13 || ageNumber > 80) {
      setError('سن باید بین ۱۳ تا ۸۰ سال باشد');
      return;
    }

    console.log('Selected age:', selectedAge);

    // Check if user should skip email/phone input (Google users)
    if (shouldSkipEmailPhoneInput()) {
      // Google users skip email/phone input and OTP, but still need to complete Platform Discovery
      navigate('/platform-discovery');
    } else {
      // Regular users continue to email/phone input page
      navigate('/email-input');
    }
  };

  const handleBack = () => {
    navigate('/name-input');
  };

  const getSpeechBubbleText = () => {
    if (!selectedAge) {
      return 'سن شما چند سال است؟';
    } else {
      return `عالی! ${selectedAge} ساله، خوشحالم که اینجا هستید!`;
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
        <ProgressIndicator currentStep={4} isGoogleUser={user?.isGoogleUser} />
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



      {/* Age selection input */}
      <motion.div
        className="flex-1 flex flex-col justify-center mb-12" // Increased spacing
        variants={pageItem}
      >
        <div className="space-y-8"> {/* Enhanced spacing between form elements */}
          <AgeSelect
            label="سن شما چند سال است؟"
            value={selectedAge}
            onChange={handleAgeChange}
            error={error}
          />
        </div>
      </motion.div>

      {/* Bottom padding to account for sticky button - increased for expanded container */}
      <div className="pb-24" />

      {/* Sticky Continue Button */}
      <StickyButton
        onClick={handleContinue}
        disabled={!selectedAge}
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

export default AgeSelectionPage;
