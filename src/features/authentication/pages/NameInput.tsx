import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import NameInput from '@/components/ui/NameInput';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface NameInputPageProps {
  className?: string;
}

const NameInputPage = ({ className }: NameInputPageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Animation variants


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    
    // Clear error when user starts typing
    if (error && value.trim()) {
      setError('');
    }
  };

  const handleContinue = () => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('لطفاً نام خود را وارد کنید');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('نام باید حداقل ۲ حرف باشد');
      return;
    }
    
    // Save name and navigate to age selection
    navigate('/age-selection');
  };

  const handleBack = () => {
    navigate('/daily-reading-time');
  };

  const getSpeechBubbleText = () => {
    if (!name.trim()) {
      return 'سلام! نام شما چیست؟';
    } else {
      return `سلام ${name.trim()}! خوشحالم که آشنا شدیم.`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
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
        <ProgressIndicator currentStep={3} isGoogleUser={user?.isGoogleUser} />
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



      {/* Name input section */}
      <motion.div
        className="flex-1 flex flex-col justify-center mb-12" // Increased spacing
        variants={pageItem}
      >
        <div className="space-y-8"> {/* Enhanced spacing between form elements */}
          <NameInput
            label="نام شما چیست؟"
            placeholder="نام خود را وارد کنید"
            value={name}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
            error={error}
            maxLength={50}
          />
        </div>
      </motion.div>

      {/* Bottom padding to account for sticky button - increased for expanded container */}
      <div className="pb-24" />

      {/* Sticky Continue Button */}
      <StickyButton
        onClick={handleContinue}
        disabled={!name.trim()}
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

export default NameInputPage;
