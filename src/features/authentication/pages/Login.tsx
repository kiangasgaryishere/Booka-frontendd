import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/authentication/contexts/AuthContext';
import BackArrow from '@/components/ui/BackArrow';
import Button from '@/components/ui/Button';
import EmailPhoneInput from '@/components/ui/EmailPhoneInput';
import { cn } from '@/utils/cn';
import { validateEmailOrPhone } from '@/utils/validation';
import { pageContainer, pageItem } from '@/utils/animations';

interface LoginPageProps {
  className?: string;
}

const LoginPage = ({ className }: LoginPageProps) => {
  const navigate = useNavigate();
  const { setGoogleAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const validation = validateEmailOrPhone(emailOrPhone);

      if (!validation.isValid) {
        setError(validation.error || 'لطفاً ایمیل یا شماره تلفن معتبر وارد کنید');
        return;
      }

      // Passwordless login (OTP flow only)
      // Simulate sending OTP API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to OTP verification page for passwordless login
      navigate('/otp-verification', {
        state: {
          emailOrPhone: emailOrPhone.trim(),
          inputType: validation.type
        }
      });
    } catch {
      setError('خطا در ارسال کد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailOrPhone(value);

    // Clear error when user starts typing
    if (error && value.trim()) {
      setError('');
    }
  };

  const handleBackToWelcome = () => {
    navigate('/welcome');
  };

  // Google login handler
  const handleGoogleSignIn = () => {
    // Handle Google authentication
    const mockGoogleData = {
      email: 'user@gmail.com',
      name: 'کاربر گوگل'
    };
    setGoogleAuth(mockGoogleData);
    // Redirect to Life Improvement page for Google users to start onboarding flow
    navigate('/life-improvement');
  };

  const handleSignUp = () => {
    navigate('/welcome');
  };

  return (
    <motion.div
      className={cn(
        'min-h-screen bg-background flex flex-col',
        'px-6 py-8',
        'relative',
        className
      )}
      variants={pageContainer}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >
      {/* Back arrow in top-right corner (RTL) */}
      <motion.div
        className="absolute top-8 right-6 z-10"
        variants={pageItem}
      >
        <BackArrow onClick={handleBackToWelcome} variant="simple" />
      </motion.div>

      {/* Main content container - moved higher */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto pt-8">

        {/* Google login button */}
        <motion.div
          className="flex justify-center mb-8"
          variants={pageItem}
        >
          <motion.button
            className={cn(
              "w-full max-w-xs h-12 rounded-lg bg-white border border-gray-300",
              "flex items-center justify-center gap-3",
              "hover:bg-gray-50 active:bg-gray-100",
              "transition-all duration-200",
              "shadow-sm hover:shadow-md",
              "font-persian text-sm text-gray-700"
            )}
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>ادامه با گوگل</span>
          </motion.button>
        </motion.div>

        {/* یا divider */}
        <motion.div
          className="flex items-center mb-8"
          variants={pageItem}
        >
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-muted font-persian">یا</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </motion.div>

        {/* Email input */}
        <motion.div
          className="mb-6"
          variants={pageItem}
        >
          <EmailPhoneInput
            value={emailOrPhone}
            onChange={handleInputChange}
            placeholder="ایمیل یا شماره تلفن"
            error={error}
          />
        </motion.div>

        {/* Sign in button */}
        <motion.div
          className="mb-6"
          variants={pageItem}
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleLogin}
            disabled={isLoading || !emailOrPhone.trim()}
          >
            {isLoading ? 'در حال ارسال کد...' : 'ورود'}
          </Button>
        </motion.div>

        {/* Sign up link */}
        <motion.div
          className="text-center"
          variants={pageItem}
        >
          <span className="text-muted font-persian text-sm">
            حساب کاربری ندارید؟{' '}
          </span>
          <button
            type="button"
            onClick={handleSignUp}
            className="text-primary-500 font-persian text-sm font-medium hover:text-primary-600 transition-colors"
          >
            ثبت نام
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
