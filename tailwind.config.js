/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Booka Brand Colors
        primary: {
          50: '#f0f0ff',
          100: '#e8e6ff',
          200: '#d4d0ff',
          300: '#b8b0ff',
          400: '#9688ff',
          500: '#6e61ff', // Main brand color
          600: '#5b4fe8',
          700: '#4c3fd4',
          800: '#3f35b0',
          900: '#362f8f',
        },
        // Soft Colors for Eye Comfort
        'soft-primary': {
          50: '#f8f9ff',
          100: '#f1f3ff',
          200: '#e6eaff',
          300: '#d1d9ff',
          400: '#b8c5ff',
          500: '#9bb0ff',
          600: '#7d8cff',
        },
        'soft-neutral': {
          50: '#fafbfc',
          100: '#f4f6f8',
          200: '#e9ecef',
          300: '#dee2e6',
        },
        'soft-accent': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
        },
        'soft-success': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
        },
        'soft-warning': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
        },
        // Semantic Colors
        background: '#f5f7fa',
        foreground: '#2d3748',
        muted: '#718096',
        'muted-foreground': '#a0aec0',
        accent: '#e8e6ff',
        destructive: '#e53e3e',
        success: '#38a169',
        warning: '#d69e2e',
        border: '#e2e8f0',
        // Soft white alternatives for reduced visual intensity
        'soft-white': '#fafafa',
        'soft-white-alt': '#f8f8f8',
        'soft-white-warm': '#faf9f7',
      },
      fontFamily: {
        // Persian font stack - IRANSansX optimized for RTL text
        persian: ['IRANSansX', 'system-ui', 'sans-serif'],
        // English font stack
        english: ['Nunito', 'system-ui', 'sans-serif'],
        // Default sans - IRANSansX for Persian, Nunito for English
        sans: ['IRANSansX', 'Nunito', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Custom font sizes matching design
        'title': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'subtitle': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '20px', fontWeight: '600' }],
        'link': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      spacing: {
        // Enhanced 8px grid system spacing scale
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
        // Additional spacing values for better hierarchy
        '34': '8.5rem', // 136px
        '38': '9.5rem', // 152px
        '42': '10.5rem', // 168px
        '46': '11.5rem', // 184px
        // Fine-grained spacing for components
        '13': '3.25rem', // 52px
        '15': '3.75rem', // 60px
        '17': '4.25rem', // 68px
        '19': '4.75rem', // 76px
        '21': '5.25rem', // 84px
        '23': '5.75rem', // 92px
      },
      borderRadius: {
        // Custom border radius
        'button': '28px',
        'card': '16px',
        'bubble': '16px',
      },
      boxShadow: {
        // Custom shadows
        'bubble': '0px 4px 14px rgba(0, 0, 0, 0.05)',
        'button': '0px 2px 5px rgba(0, 0, 0, 0.15)',
        'card': '0px 4px 20px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        // Custom animations
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'loading-dots': 'loadingDots 1.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1' },
        },
        loadingDots: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-rtl'),
  ],
  // RTL support
  corePlugins: {
    // Enable RTL support
    textAlign: true,
    float: true,
  },
}
