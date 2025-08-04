import { formatPhoneNumber } from './validation';

/**
 * OTP utility functions shared across authentication pages
 */

/**
 * Format time as MM:SS for OTP timer display
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Get display contact (email or formatted phone) for OTP verification
 */
export const getDisplayContact = (emailOrPhone: string, inputType: 'email' | 'phone'): string => {
  if (inputType === 'phone') {
    return formatPhoneNumber(emailOrPhone);
  }
  return emailOrPhone;
};

/**
 * Standard OTP timer duration (2 minutes 27 seconds)
 */
export const OTP_TIMER_DURATION = 147;