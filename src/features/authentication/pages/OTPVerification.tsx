import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OTPInput from '@/components/ui/OTPInput';
import BackArrow from '@/components/ui/BackArrow';
import StickyButton from '@/components/ui/StickyButton';
import Button from '@/components/ui/Button';
import BackgroundDecoration from '@/components/ui/BackgroundDecoration';
import { cn } from '@/utils/cn';
import { formatTime, getDisplayContact } from '@/utils/otpUtils';
import { useOTPTimer } from '@/hooks/useOTPTimer';
import { pageContainer, pageItem } from '@/utils/animations';

interface OTPVerificationPageProps {
  className?: string;
}

const OTPVerificationPage = ({ className }: OTPVerificationPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get email/phone from navigation state
  const emailOrPhone = location.state?.emailOrPhone || '';
  const inputType = location.state?.inputType || 'phone';
  const isNewUser = location.state?.isNewUser || false;

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
      // Simulate OTP verification API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, accept any 4-digit code
      if (isNewUser) {
        // For new users from "Get Started" flow, navigate to signup success
        navigate('/signup-success');
      } else {
        // For existing users, navigate to dashboard
        navigate('/dashboard');
      }
    } catch {
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
    } catch {
      setError('خطا در ارسال مجدد کد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/login');
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
            برای ورود به حساب کاربری کد ارسالی به {inputType === 'phone' ? 'شماره موبایل' : 'ایمیل'}
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

export default OTPVerificationPage;
