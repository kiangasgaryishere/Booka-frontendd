# Booka Navigation System Guide

## Overview
This document outlines the navigation system implemented for the Booka application after users complete the authentication flow.

## Navigation Structure

### Bottom Navigation Bar
The main navigation is implemented as a mobile-first bottom tab bar with the following sections:

#### Navigation Items
1. **خانه (Home)** - `/dashboard`
   - Main dashboard with user welcome, stats, and quick actions
   - Shows reading progress and recommended books
   - Entry point after successful authentication

2. **کتابخانه (Library)** - `/library`
   - Browse available books and collections
   - Search and filter functionality (to be implemented)
   - Book categories and recommendations

3. **مطالعه (Reading)** - `/reading`
   - Active reading interface
   - Quiz and summary sections
   - Reading progress tracking

4. **پیشرفت (Progress)** - `/progress`
   - User statistics and achievements
   - Reading streaks and goals
   - Performance analytics

5. **پروفایل (Profile)** - `/profile`
   - User account settings
   - Profile information management
   - App preferences and logout

## Design System Compliance

### Visual Design
- **8px Grid System**: All spacing follows the 8px base unit
- **Persian RTL Layout**: Complete right-to-left support
- **Primary Color**: #6E61FF (Booka brand purple)
- **Soft Colors**: Eye-friendly muted backgrounds
- **Typography**: IRANSansX font for Persian text

### Mobile-First Approach
- **Base Width**: 375px minimum
- **Responsive Design**: Scales appropriately for larger screens
- **Touch Targets**: Minimum 44px for accessibility
- **Safe Areas**: Proper handling of device safe areas

### Animations
- **Framer Motion**: Smooth transitions and micro-interactions
- **Active States**: Visual feedback for current page
- **Hover Effects**: Subtle scale animations
- **Page Transitions**: Consistent enter/exit animations

## Technical Implementation

### Component Structure
```
src/
├── components/ui/
│   └── BottomNavigation.tsx    # Main navigation component
├── features/
│   ├── dashboard/pages/
│   │   └── Dashboard.tsx       # Home page
│   ├── library/pages/
│   │   └── Library.tsx         # Library page
│   ├── reading/pages/
│   │   └── Reading.tsx         # Reading page
│   ├── progress/pages/
│   │   └── Progress.tsx        # Progress page
│   ├── group/pages/
│   │   └── Group.tsx           # Group page
│   ├── settings/pages/
│   │   └── Settings.tsx        # Settings page
│   ├── profile/pages/
│   │   └── Profile.tsx         # Profile page
│   └── core/pages/
│       └── Loading.tsx         # Loading page
```

### Authentication Integration
- **Loading Page**: Redirects to dashboard if authenticated, welcome if not
- **Signup Success**: Redirects to dashboard after successful registration
- **Protected Routes**: All main app routes require authentication

### Navigation Features
- **Active State Indicator**: Visual dot indicator for current page
- **Smooth Transitions**: Spring animations for page changes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **RTL Support**: Icons and text properly aligned for Persian layout

## User Flow

### After Authentication
1. User completes signup/login flow
2. Redirected to `/dashboard` (Home)
3. Bottom navigation appears
4. Can navigate between main app sections
5. Profile section allows logout and settings

### Navigation Behavior
- **Persistent**: Bottom navigation stays visible across all main pages
- **Active Highlighting**: Current page is visually highlighted
- **Quick Access**: One-tap access to all main sections
- **Contextual**: Each section shows relevant content and actions

## Future Enhancements

### Planned Features
- **Notifications Badge**: Show unread notifications count
- **Reading Progress**: Visual progress indicators in navigation
- **Quick Actions**: Long-press for quick actions
- **Customization**: User-configurable navigation order

### Accessibility Improvements
- **Screen Reader Support**: Enhanced ARIA labels
- **High Contrast Mode**: Alternative color schemes
- **Large Text Support**: Scalable typography
- **Voice Navigation**: Voice command integration

## Development Notes

### File Organization
- Navigation component is in `src/components/ui/`
- Main pages are in `src/pages/`
- Profile-related pages are in `src/features/profile/pages/`
- Authentication pages remain in `src/features/authentication/pages/`

### Styling Approach
- Uses Tailwind CSS with custom design tokens
- Consistent with existing Booka design system
- Responsive utilities for different screen sizes
- Custom animations using Framer Motion

### State Management
- Uses existing AuthContext for user state
- Navigation state managed locally in component
- Route-based active state detection
- Persistent user preferences (future enhancement)

## Testing Checklist

### Functionality
- [ ] Navigation between all sections works
- [ ] Active state updates correctly
- [ ] Logout functionality works from profile
- [ ] Authentication redirects work properly

### Design
- [ ] RTL layout displays correctly
- [ ] Persian fonts render properly
- [ ] Colors match design system
- [ ] Animations are smooth and performant

### Accessibility
- [ ] Touch targets are adequate size
- [ ] Focus states are visible
- [ ] Screen reader compatibility
- [ ] Keyboard navigation works

### Responsive Design
- [ ] Works on 375px minimum width
- [ ] Scales properly on larger screens
- [ ] Safe area handling on devices with notches
- [ ] Landscape orientation support
