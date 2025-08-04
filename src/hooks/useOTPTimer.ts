import { useState, useEffect } from 'react';
import { OTP_TIMER_DURATION } from '@/utils/otpUtils';

interface UseOTPTimerProps {
  initialTime?: number;
  onExpire?: () => void;
}

interface UseOTPTimerReturn {
  timeLeft: number;
  canResend: boolean;
  resetTimer: () => void;
}

/**
 * Custom hook for OTP timer functionality
 * Handles countdown timer and resend capability
 */
export const useOTPTimer = ({
  initialTime = OTP_TIMER_DURATION,
  onExpire
}: UseOTPTimerProps = {}): UseOTPTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
      onExpire?.();
    }
  }, [timeLeft, onExpire]);

  // Reset timer function
  const resetTimer = () => {
    setTimeLeft(initialTime);
    setCanResend(false);
  };

  return {
    timeLeft,
    canResend,
    resetTimer
  };
};