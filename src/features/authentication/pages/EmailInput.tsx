import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import Dana from '@/components/mascot/Dana';
import SpeechBubble from '@/components/ui/SpeechBubble';
import EmailPhoneInput from '@/components/ui/EmailPhoneInput';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { cn } from '@/utils/cn';
import { validateEmailOrPhone } from '@/utils/validation';
import { pageContainer, pageItem } from '@/utils/animations';

interface EmailInputPageProps {
  className?: string;
}

const EmailInputPage = ({ className }: EmailInputPageProps) => {
  const navigate = useNavigate();
  const { user, shouldSkipEmailPhoneInput, markEmailPhoneCompleted, updateUser } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');

  // Handle different user types and flows
  useEffect(() => {
    if (shouldSkipEmailPhoneInput()) {
      // Google users should skip both email/phone input and password creation
      // They should go directly to signup success (this should not happen if routing is correct)
      console.warn('Google user reached EmailInput page - this should not happen with correct routing');
      navigate('/signup-success');
    } else if (user?.isGoogleUser && user?.googleEmail) {
      // Auto-populate Google user's email but still show the page for confirmation
      setEmailOrPhone(user.googleEmail);
    }
    // For non-Google users coming from "Get Started", this page is the first step
    // No special handling needed - they enter email/phone and proceed to OTP
  }, [user, navigate, shouldSkipEmailPhoneInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailOrPhone(value);

    // Clear error when user starts typing
    if (error && value.trim()) {
      setError('');
    }
  };

  const handleContinue = () => {
    const validation = validateEmailOrPhone(emailOrPhone);

    if (!validation.isValid) {
      setError(validation.error || 'لطفاً ایمیل یا شماره تلفن معتبر وارد کنید');
      return;
    }

    // Update user with email/phone and mark step as completed
    if (validation.type === 'email') {
      updateUser({ email: emailOrPhone.trim(), authMethod: 'email' });
    } else {
      updateUser({ phone: emailOrPhone.trim(), authMethod: 'phone' });
    }
    markEmailPhoneCompleted();

    // For passwordless signup flow, navigate directly to OTP verification
    console.log(`User ${validation.type}:`, emailOrPhone.trim());
    navigate('/signup-otp-verification', {
      state: {
        emailOrPhone: emailOrPhone.trim(),
        inputType: validation.type,
        isPasswordlessFlow: true // All signups are now passwordless
      }
    });
  };

  const handleBack = () => {
    // For complete onboarding flow, go back to age selection page
    navigate('/age-selection');
  };

  const getSpeechBubbleText = () => {
    if (!emailOrPhone.trim()) {
      return 'ایمیل یا شماره تلفن شما چیست؟';
    } else {
      const validation = validateEmailOrPhone(emailOrPhone);
      if (validation.isValid) {
        return validation.type === 'email'
          ? 'عالی! ایمیل معتبری وارد کردید.'
          : 'عالی! شماره تلفن معتبری وارد کردید.';
      } else {
        return 'لطفاً یک ایمیل یا شماره تلفن معتبر وارد کنید.';
      }
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
        <ProgressIndicator currentStep={5} isGoogleUser={user?.isGoogleUser} />
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

      {/* Email/Phone input section */}
      <motion.div
        className="flex-1 flex flex-col justify-center mb-12" // Increased spacing
        variants={pageItem}
      >
        <div className="space-y-8"> {/* Enhanced spacing between form elements */}
          <EmailPhoneInput
            label="ایمیل یا شماره تلفن شما چیست؟"
            value={emailOrPhone}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            error={error}
          />
        </div>
      </motion.div>

      {/* Bottom padding to account for sticky button - increased for expanded container */}
      <div className="pb-24" />

      {/* Sticky Continue Button */}
      <StickyButton
        onClick={handleContinue}
        disabled={!emailOrPhone.trim()}
      >
        ادامه
      </StickyButton>

      {/* Background decoration */}
      <BackgroundDecoration />
    </motion.div>
  );
};

export default EmailInputPage;
