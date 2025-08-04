import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import SelectionCard from '@/components/ui/SelectionCard';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import { cn } from '@/utils/cn';
import { LIFE_CATEGORIES } from '@/utils/constants';
import { pageContainer, pageItem, easings } from '@/utils/animations';



interface LifeImprovementPageProps {
  className?: string;
}

const LifeImprovementPage = ({ className }: LifeImprovementPageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);



  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(categoryId);
      const newSelection = isSelected 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
      
      // Show celebration for first selection
      if (!isSelected && prev.length === 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
      
      return newSelection;
    });
  };

  const handleContinue = () => {
    // Navigate to daily reading time page
    navigate('/daily-reading-time');
  };

  const handleBack = () => {
    navigate('/welcome');
  };

  const getSpeechBubbleText = () => {
    if (selectedCategories.length === 0) {
      return 'کدام بخش از زندگی‌تان را می‌خواهید بهبود دهید؟';
    } else if (selectedCategories.length === 1) {
      return 'عالی! می‌توانید بیشتر انتخاب کنید.';
    } else {
      return `فوق‌العاده! ${selectedCategories.length} حوزه انتخاب کردید!`;
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
        <ProgressIndicator currentStep={1} isGoogleUser={user?.isGoogleUser} />
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
              transition={{ duration: 1, ease: easings.easeOut }}
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



      {/* Selection grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-12 flex-1 auto-rows-fr" // Increased spacing
        variants={pageItem}
      >
        {LIFE_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            className="w-full h-full" // Ensure full width and height
            variants={pageItem}
            transition={{ delay: index * 0.1 }}
          >
            <SelectionCard
              title={category.title}
              description={category.description}
              icon={category.icon}
              isSelected={selectedCategories.includes(category.id)}
              onClick={() => handleCategorySelect(category.id)}
              className="h-full w-full" // Ensure card fills container
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom padding to account for sticky button - adjusted for new button design */}
      <div className="pb-24" />

      {/* Sticky Continue Button */}
      <StickyButton
        onClick={handleContinue}
        disabled={selectedCategories.length === 0}
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

export default LifeImprovementPage;
