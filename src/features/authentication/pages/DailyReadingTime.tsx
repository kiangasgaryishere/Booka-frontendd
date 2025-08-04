import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import TimeSelectionCard from '@/components/ui/TimeSelectionCard';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import { cn } from '@/utils/cn';
import { pageContainer, pageItem } from '@/utils/animations';

interface ReadingTimeOption {
  id: string;
  minutes: number;
  description: string;
}

const readingTimeOptions: ReadingTimeOption[] = [
  {
    id: 'short',
    minutes: 10,
    description: 'مطالعه سریع و مختصر'
  },
  {
    id: 'medium',
    minutes: 15,
    description: 'زمان متعادل برای یادگیری'
  },
  {
    id: 'long',
    minutes: 20,
    description: 'مطالعه عمیق و دقیق'
  },
  {
    id: 'extended',
    minutes: 30,
    description: 'زمان کافی برای تمرکز کامل'
  }
];

interface DailyReadingTimePageProps {
  className?: string;
}

const DailyReadingTimePage = ({ className }: DailyReadingTimePageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTime, setSelectedTime] = useState<string>('');



  const handleTimeSelect = (timeId: string) => {
    setSelectedTime(timeId);
  };

  const handleContinue = () => {
    // Navigate to name input page
    navigate('/name-input');
  };

  const handleBack = () => {
    navigate('/life-improvement');
  };

  const getSpeechBubbleText = () => {
    if (!selectedTime) {
      return 'در طول روز چند دقیقه می‌توانید مطالعه کنید؟';
    } else {
      const selectedOption = readingTimeOptions.find(option => option.id === selectedTime);
      return `عالی! ${selectedOption?.minutes} دقیقه انتخاب کردید.`;
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
        <ProgressIndicator currentStep={2} isGoogleUser={user?.isGoogleUser} />
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



      {/* Time selection list - same layout as Platform Discovery */}
      <motion.div
        className="grid grid-cols-1 gap-4 mb-12 flex-1" // Same as Platform Discovery
        variants={pageItem}
      >
        {readingTimeOptions.map((option, index) => (
          <motion.div
            key={option.id}
            className="w-full"
            variants={pageItem}
            transition={{ delay: index * 0.1 }}
          >
            <TimeSelectionCard
              minutes={option.minutes}
              description={option.description}
              isSelected={selectedTime === option.id}
              onClick={() => handleTimeSelect(option.id)}
              className="w-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom padding to account for sticky button - increased for expanded container */}
      <div className="pb-24" />

      {/* Sticky Continue Button */}
      <StickyButton
        onClick={handleContinue}
        disabled={!selectedTime}
      >
        ادامه
      </StickyButton>

      {/* Background decoration - softer colors for better eye comfort */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-soft-primary-200 rounded-full opacity-15"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-soft-primary-200 rounded-full opacity-15"></div>
        <div className="absolute top-1/4 -left-20 w-32 h-32 bg-soft-accent-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 -right-20 w-24 h-24 bg-soft-primary-300 rounded-full opacity-18"></div>
      </div>
    </motion.div>
  );
};

export default DailyReadingTimePage;
