import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OTPInput from '@/components/ui/OTPInput';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import Button from '@/components/ui/Button';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { cn } from '@/utils/cn';
import { formatTime, getDisplayContact } from '@/utils/otpUtils';
import { useOTPTimer } from '@/hooks/useOTPTimer';
import { pageContainer, pageItem } from '@/utils/animations';

interface SignupOTPVerificationPageProps {
  className?: string;
}

const SignupOTPVerificationPage = ({ className }: SignupOTPVerificationPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get email/phone from navigation state
  const emailOrPhone = location.state?.emailOrPhone || '';
  const inputType = location.state?.inputType || 'phone';

  // Use OTP timer hook
  const { timeLeft, canResend, resetTimer } = useOTPTimer();

  const handleOTPChange = (value: string) => {
    setOtp(value);
    
    // Clear error when user starts typing
    if (error && value.trim()) {
      setError('');
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 4) {
      setError('لطفاً کد ۴ رقمی را کامل وارد کنید');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For testing: Accept any 4-digit code
      await new Promise(resolve => setTimeout(resolve, 1500));

      // All signups are now passwordless and go through platform discovery
      // Navigate to platform discovery to complete the signup flow
      navigate('/platform-discovery');
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('کد وارد شده صحیح نیست. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset timer
      resetTimer();
      setOtp('');

      console.log('Code resent to:', emailOrPhone);
    } catch (error) {
      console.error('Resend error:', error);
      setError('خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/email-input');
  };

  return (
    <motion.div
      className={cn(
        'min-h-screen bg-background flex flex-col',
        'px-7 py-12',
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
        className="mb-16" // Standardized spacing to match onboarding pages
        variants={pageItem}
      >
        <ProgressIndicator currentStep={6} totalSteps={8} />
      </motion.div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">

        {/* Welcome title */}
        <motion.div
          className="text-center mb-8"
          variants={pageItem}
        >
          <h1 className={cn(
            'text-3xl font-bold text-foreground mb-4',
            'font-persian'
          )}>
            به بوکا خوش آمدید!
          </h1>
        </motion.div>

        {/* Instruction text */}
        <motion.div
          className="text-center mb-8"
          variants={pageItem}
        >
          <p className={cn(
            'text-base text-muted leading-relaxed',
            'font-persian'
          )}>
            برای ایجاد حساب کاربری کد ارسالی به {inputType === 'phone' ? 'شماره موبایل' : 'ایمیل'}
          </p>
          <p className={cn(
            'text-lg font-medium text-foreground mt-2',
            'font-persian'
          )}>
            {getDisplayContact(emailOrPhone, inputType)}
          </p>
          <p className={cn(
            'text-base text-muted mt-1',
            'font-persian'
          )}>
            را وارد کنید
          </p>
        </motion.div>

        {/* OTP Input */}
        <motion.div
          className="w-full mb-8"
          variants={pageItem}
        >
          <OTPInput
            length={4}
            value={otp}
            onChange={handleOTPChange}
            error={error}
            disabled={isLoading}
          />
        </motion.div>

        {/* Resend timer */}
        <motion.div
          className="text-center mb-8"
          variants={pageItem}
        >
          {!canResend ? (
            <p className={cn(
              'text-sm text-muted',
              'font-persian'
            )}>
              ارسال مجدد کد تا {formatTime(timeLeft)} ثانیه دیگر
            </p>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResendCode}
              disabled={isLoading}
              className="font-persian"
            >
              ارسال مجدد کد
            </Button>
          )}
        </motion.div>

        {/* Bottom padding to account for sticky button */}
        <div className="pb-24" />

        {/* Sticky Verify Button */}
        <StickyButton
          onClick={handleVerify}
          disabled={isLoading || otp.length !== 4}
        >
          {isLoading ? 'در حال تأیید...' : 'ورود'}
        </StickyButton>
      </div>

      {/* Background decoration */}
      <BackgroundDecoration />
    </motion.div>
  );
};

export default SignupOTPVerificationPage;
