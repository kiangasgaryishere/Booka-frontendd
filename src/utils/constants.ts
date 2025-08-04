/**
 * Shared constants used across the application
 */

export interface LifeCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

/**
 * Life improvement categories used in onboarding and settings
 */
export const LIFE_CATEGORIES: LifeCategory[] = [
  {
    id: 'career',
    title: 'شغل و کسب‌وکار',
    description: 'پیشرفت در حرفه و مهارت‌های کاری',
    icon: '💼'
  },
  {
    id: 'health',
    title: 'سلامت و تناسب اندام',
    description: 'بهبود سلامت جسمی و روحی',
    icon: '🏃‍♂️'
  },
  {
    id: 'relationships',
    title: 'روابط اجتماعی',
    description: 'تقویت روابط با خانواده و دوستان',
    icon: '👥'
  },
  {
    id: 'learning',
    title: 'یادگیری و دانش',
    description: 'کسب مهارت‌ها و دانش جدید',
    icon: '📚'
  },
  {
    id: 'creativity',
    title: 'خلاقیت و هنر',
    description: 'توسعه استعدادهای هنری و خلاق',
    icon: '🎨'
  },
  {
    id: 'finance',
    title: 'مدیریت مالی',
    description: 'بهبود وضعیت مالی و سرمایه‌گذاری',
    icon: '💰'
  },
  {
    id: 'technology',
    title: 'فناوری و نوآوری',
    description: 'آشنایی با فناوری‌های جدید',
    icon: '💻'
  },
  {
    id: 'science',
    title: 'علوم و تحقیق',
    description: 'کشف دانش علمی و تحقیقات',
    icon: '🔬'
  }
];