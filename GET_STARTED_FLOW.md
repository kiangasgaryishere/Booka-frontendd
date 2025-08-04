# Get Started Flow Documentation

## Overview
This document outlines the specific flow for users who click the "شروع کنید" (Get Started) button on the Welcome page.

## Complete Flow Sequence

### 1. Welcome Page
- User clicks "شروع کنید" button
- Navigates to `/email-input`

### 2. Onboarding Questions (Complete All)
1. **Life Improvement** (`/life-improvement`)
   - User selects their life improvement goals
   - Navigates to `/daily-reading-time`

2. **Daily Reading Time** (`/daily-reading-time`)
   - User selects how much time they want to spend reading
   - Navigates to `/name-input`

3. **Name Input** (`/name-input`)
   - User enters their name
   - Navigates to `/age-selection`

4. **Age Selection** (`/age-selection`)
   - User selects their age
   - Navigates to `/email-input`

### 3. Authentication Steps
5. **Email/Phone Input** (`/email-input`)
   - User enters their email address OR phone number
   - System validates the input
   - Navigates to `/otp-verification` with user data

6. **Signup OTP Verification** (`/signup-otp-verification`)
   - User enters the 4-digit verification code
   - Simplified page without "فراموشی رمز عبور" button
   - For testing: accepts any 4-digit number
   - Navigates to `/signup-success`

7. **Signup Success** (`/signup-success`)
   - User sees success message
   - Account creation complete

## Technical Implementation

### Key Changes Made:
1. **EmailInput Page**: Navigates to OTP verification for passwordless authentication
2. **OTP Verification Page**: Updated to navigate to signup success for new users
3. **Welcome Page**: "شروع کنید" button navigates to life-improvement

### Navigation Flow:
```
Welcome → Email Input → Signup OTP Verification → Life Improvement →
Reading Motivation → Daily Reading Time → Name Input → Age Selection → Signup Success
```

### Code Changes:

#### EmailInput.tsx
```typescript
// Navigate to signup OTP verification for "Get Started" flow
navigate('/signup-otp-verification', {
  state: {
    emailOrPhone: emailOrPhone.trim(),
    inputType: validation.type
  }
});
```

#### SignupOTPVerification.tsx
```typescript
// For testing: Accept any 4-digit code
await new Promise(resolve => setTimeout(resolve, 1500));

console.log('Signup OTP verified:', otp);
// Navigate to onboarding flow after successful verification
navigate('/life-improvement');
```

## User Experience
- **Complete Onboarding**: Users go through all onboarding questions first
- **Passwordless Authentication**: Users only need email/phone + OTP verification
- **Streamlined Process**: Direct path from welcome to success
- **Persian RTL Support**: All pages maintain right-to-left layout
- **Validation**: Proper email/phone validation and error handling

## Testing Checklist
- [ ] Click "شروع کنید" on Welcome page
- [ ] Complete Life Improvement selection
- [ ] Complete Reading Motivation selection  
- [ ] Complete Daily Reading Time selection
- [ ] Enter name in Name Input
- [ ] Select age in Age Selection
- [ ] Enter email or phone in Email Input
- [ ] Verify navigation to OTP page
- [ ] Enter OTP code
- [ ] Verify navigation to Signup Success page

## Status
✅ **IMPLEMENTED** - All changes complete and ready for testing
