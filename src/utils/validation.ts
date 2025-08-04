/**
 * Validation utilities for email and phone number formats
 * Supports Persian phone number patterns and international email formats
 */

export interface ValidationResult {
  isValid: boolean;
  type?: 'email' | 'phone';
  error?: string;
}

/**
 * Validates email format using standard email regex
 */
export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { isValid: false, error: 'ایمیل نمی‌تواند خالی باشد' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(trimmedEmail);
  return {
    isValid,
    type: 'email',
    error: isValid ? undefined : 'لطفاً یک ایمیل معتبر وارد کنید',
  };
};

/**
 * Validates Persian phone number format
 * Must be 11 digits and start with 09
 */
export const validatePhone = (phone: string): ValidationResult => {
  const trimmedPhone = phone.trim();
  if (!trimmedPhone) {
    return { isValid: false, error: 'شماره تلفن نمی‌تواند خالی باشد' };
  }
  const phoneRegex = /^09[0-9]{9}$/;
  const isValid = phoneRegex.test(trimmedPhone);
  return {
    isValid,
    type: 'phone',
    error: isValid ? undefined : 'شماره تلفن باید ۱۱ رقم و با ۰۹ شروع شود',
  };
};

/**
 * Formats phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.trim().replace(/\s+/g, '');
  
  // If it starts with +98, keep as is
  if (cleanPhone.startsWith('+98')) {
    return cleanPhone;
  }
  
  // If it starts with 0, keep as is
  if (cleanPhone.startsWith('0')) {
    return cleanPhone;
  }
  
  // If it's 10 digits, add 0 prefix
  if (/^[0-9]{10}$/.test(cleanPhone)) {
    return '0' + cleanPhone;
  }
  
  return cleanPhone;
};

/**
 * Gets appropriate placeholder text based on detected input type
 */
export const getPlaceholderText = (input: string): string => {
  if (!input.trim()) {
    return 'example@email.com یا 09123456789';
  }
  
  if (input.includes('@')) {
    return 'example@email.com';
  }
  
  return '09123456789';
};

/**
 * Gets appropriate input type for HTML input element
 */
export const getInputType = (input: string): 'email' | 'tel' | 'text' => {
  if (!input.trim()) {
    return 'text';
  }
  
  if (input.includes('@')) {
    return 'email';
  }
  
  return 'tel';
};

/**
 * Gets appropriate autocomplete attribute
 */
export const getAutoComplete = (input: string): string => {
  if (!input.trim()) {
    return 'email tel';
  }

  if (input.includes('@')) {
    return 'email';
  }

  return 'tel';
};

/**
 * Validates OTP code format
 */
export const validateOTP = (otp: string): ValidationResult => {
  const trimmedOTP = otp.trim();

  if (!trimmedOTP) {
    return {
      isValid: false,
      error: 'لطفاً کد تأیید را وارد کنید'
    };
  }

  if (!/^\d{6}$/.test(trimmedOTP)) {
    return {
      isValid: false,
      error: 'کد تأیید باید ۶ رقم باشد'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates email or phone number based on input format
 */
export const validateEmailOrPhone = (input: string): ValidationResult => {
  if (!input.trim()) {
    return { isValid: false, error: 'ایمیل یا شماره تلفن نمی‌تواند خالی باشد' };
  }

  // Check if input is an email (contains @)
  if (input.includes('@')) {
    return validateEmail(input);
  }
  
  // Otherwise treat as phone number
  return validatePhone(input);
};
