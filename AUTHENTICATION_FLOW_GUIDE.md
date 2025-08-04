# Booka Authentication Flow Guide

## Overview
This document outlines the two distinct authentication paths in the Booka application and verifies that the implementation meets the specified requirements.

## Authentication Paths

### 1. Google Login Users Flow
**Entry Point:** Welcome page → "ورود با گوگل" button

**Flow Sequence:**
1. **Welcome** (`/welcome`) → Click "ورود با گوگل"
2. **Life Improvement** (`/life-improvement`) → Complete onboarding question
3. **Daily Reading Time** (`/daily-reading-time`) → Complete onboarding question
4. **Name Input** (`/name-input`) → **REQUIRED** - User must confirm/enter preferred name
5. **Age Selection** (`/age-selection`) → **REQUIRED** - User must select age
6. **Email Input** (`/email-input`) → **AUTOMATICALLY SKIPPED** - Google email auto-populated
7. **Signup Success** (`/signup-success`) → Complete

**What Google Users Skip:**
- ✅ Email/Phone input step (auto-populated with Google email)
- ✅ OTP verification step (Google handles authentication)

**What Google Users Must Complete:**
- ✅ All onboarding questions (life improvement, daily reading time)
- ✅ Name input (even though Google provides name, user confirms preferred name)
- ✅ Age selection
- ✅ Platform discovery (how they found Booka)
- ✅ **6 total steps** (vs 8 for regular users)

### 2. Regular Users Flow (Email/Phone Login)
**Entry Point:** Welcome page → "ورود به حساب کاربری" button → Login page

**Flow Sequence:**
1. **Welcome** (`/welcome`) → Click "ورود به حساب کاربری"
2. **Login** (`/login`) → Enter email/phone for OTP authentication
3. **OTP Verification** (`/otp-verification`) → Enter verification code

**For New Users (Passwordless Signup Flow - "Get Started"):**
1. **Welcome** (`/welcome`) → Click "شروع کنید" → **Initializes regular user state**
2. **Life Improvement** (`/life-improvement`) → Complete onboarding question
3. **Daily Reading Time** (`/daily-reading-time`) → Complete onboarding question
4. **Name Input** (`/name-input`) → **REQUIRED** - User enters name
5. **Age Selection** (`/age-selection`) → **REQUIRED** - User selects age → **Routes to Email Input**
6. **Email Input** (`/email-input`) → **REQUIRED** - User enters email/phone
7. **OTP Verification** (`/signup-otp-verification`) → **REQUIRED** - User enters OTP code
8. **Platform Discovery** (`/platform-discovery`) → **REQUIRED** - User selects discovery source
9. **Signup Success** (`/signup-success`) → Complete

**Note**: All authentication is passwordless using OTP verification only.

**For Google Users:**
1. **Welcome** (`/welcome`) → Click "ورود با گوگل" → **Auto-populates Google user data**
2. **Life Improvement** (`/life-improvement`) → Complete onboarding question
3. **Daily Reading Time** (`/daily-reading-time`) → Complete onboarding question
4. **Name Input** (`/name-input`) → **REQUIRED** - User confirms/edits name
5. **Age Selection** (`/age-selection`) → **REQUIRED** - User selects age → **Routes to Platform Discovery**
6. **Platform Discovery** (`/platform-discovery`) → **REQUIRED** - User selects discovery source
7. **Signup Success** (`/signup-success`) → Complete (**Skips email/phone and OTP steps**)

**What Regular Users Must Complete (OTP-Only Flow):**
- ✅ All onboarding questions (life improvement, daily reading time)
- ✅ Name input
- ✅ Age selection
- ✅ Email/phone input
- ✅ OTP verification (passwordless authentication only)
- ✅ Platform discovery selection
- ✅ All steps in the complete flow

## Technical Implementation

### AuthContext Features
- `user.isGoogleUser`: Boolean flag to identify Google users
- `user.googleEmail`: Stores Google account email separately
- `user.hasCompletedEmailPhoneStep`: Tracks completion of email/phone input
- `shouldSkipEmailPhoneInput()`: Method to determine if email/phone step should be skipped
- `markEmailPhoneCompleted()`: Method to mark email/phone step as completed

### Key Components Modified
1. **AuthContext** - Enhanced user state management for passwordless authentication
2. **Welcome Page** - Google auth navigates to life-improvement (start of onboarding)
3. **EmailInput Page** - Auto-skips for Google users, auto-populates Google email
4. **Login Page** - OTP-only authentication flow

### Validation Points
- ✅ Google users skip only email/phone and OTP verification steps
- ✅ Google users still complete name input (for confirmation)
- ✅ Google users complete all onboarding questions (life improvement, daily reading time)
- ✅ Regular users complete entire flow without skipping
- ✅ Both flows maintain Persian RTL layout and 8px grid design
- ✅ All validation and error handling preserved
- ✅ All authentication is passwordless (OTP-only)

## Testing Scenarios

### Test Case 1: Google User Flow
1. Go to `/welcome`
2. Click "ورود با گوگل"
3. Verify navigation to `/life-improvement`
4. Complete all onboarding steps
5. Verify name input is shown and required
6. Verify age selection is shown and required
7. Verify email input is automatically skipped
8. Verify arrival at signup success

### Test Case 2: Regular User Flow (OTP-Only)
1. Go to `/welcome`
2. Click "شروع کنید" button
3. Complete all onboarding steps (life improvement, daily reading time)
4. Verify name input is shown and required
5. Verify age selection is shown and required
6. Verify email input is shown and required
7. Verify OTP verification is shown and required
8. Verify platform discovery is shown and required
9. Verify arrival at signup success

**Note**: All authentication is passwordless using OTP verification only.

## Implementation Status
✅ **COMPLETE** - All requirements implemented and tested
✅ **Google users skip only email/phone input**
✅ **Google users still complete name input**
✅ **Regular users complete full flow**
✅ **Persian RTL layout maintained**
✅ **8px grid design system preserved**
✅ **All validation and error handling intact**
