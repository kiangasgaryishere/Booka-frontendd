import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';
import { cn } from '@/utils/cn';

/**
 * Comprehensive test component to analyze and compare different button styles:
 * 1. Original 3D Pushable Button (from reference)
 * 2. Our Current Booka Button
 * 3. Enhanced 3D Implementation for Booka
 */
const ButtonComparisonTest = () => {
  const [clickCounts, setClickCounts] = useState({
    original: 0,
    current: 0,
    enhanced: 0
  });

  const handleClick = (buttonType: keyof typeof clickCounts) => {
    setClickCounts(prev => ({
      ...prev,
      [buttonType]: prev[buttonType] + 1
    }));
  };

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold font-persian text-foreground mb-4">
            مقایسه انواع دکمه‌ها
          </h1>
          <p className="text-lg font-persian text-muted">
            تست و تحلیل سبک‌های مختلف دکمه برای پروژه بوکا
          </p>
        </div>

        {/* Button Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Original 3D Pushable Button */}
          <div className="bg-soft-white p-6 rounded-card shadow-card">
            <h3 className="text-xl font-bold font-persian text-foreground mb-4 text-center">
              دکمه سه‌بعدی اصلی
            </h3>
            <p className="text-sm font-persian text-muted mb-6 text-center">
              پیاده‌سازی مستقیم از کد مرجع
            </p>
            
            {/* Original 3D Button Implementation */}
            <div className="flex justify-center mb-4">
              <button 
                className={cn(
                  // Container (shadow/depth layer)
                  "bg-[hsl(340deg_100%_32%)] rounded-xl border-none p-0 cursor-pointer",
                  "outline-offset-4 focus:outline-none focus:ring-2 focus:ring-primary-500",
                  "transition-all duration-150"
                )}
                onClick={() => handleClick('original')}
              >
                <span 
                  className={cn(
                    // Front surface
                    "block px-10 py-3 rounded-xl text-xl font-bold",
                    "bg-[hsl(345deg_100%_47%)] text-white",
                    "transform -translate-y-1.5 transition-transform duration-150",
                    "active:-translate-y-0.5"
                  )}
                >
                  فشار دهید
                </span>
              </button>
            </div>
            
            <div className="text-center text-sm font-persian text-muted">
              تعداد کلیک: {clickCounts.original}
            </div>
          </div>

          {/* 2. Current Booka Button */}
          <div className="bg-soft-white p-6 rounded-card shadow-card">
            <h3 className="text-xl font-bold font-persian text-foreground mb-4 text-center">
              دکمه فعلی بوکا
            </h3>
            <p className="text-sm font-persian text-muted mb-6 text-center">
              پیاده‌سازی فعلی با سایه جدید
            </p>
            
            <div className="flex justify-center mb-4">
              <Button
                variant="primary"
                size="lg"
                className={cn(
                  "px-10 py-3 text-xl font-bold font-persian",
                  "shadow-[0px_2px_5px_rgba(0,0,0,0.15)]",
                  "hover:shadow-[0px_4px_8px_rgba(0,0,0,0.2)]",
                  "active:shadow-[0px_1px_3px_rgba(0,0,0,0.15)]",
                  "hover:translate-y-[1px] active:translate-y-[2px]",
                  "transition-all duration-150 ease-out"
                )}
                onClick={() => handleClick('current')}
              >
                شروع کنید
              </Button>
            </div>
            
            <div className="text-center text-sm font-persian text-muted">
              تعداد کلیک: {clickCounts.current}
            </div>
          </div>

          {/* 3. Enhanced 3D for Booka */}
          <div className="bg-soft-white p-6 rounded-card shadow-card">
            <h3 className="text-xl font-bold font-persian text-foreground mb-4 text-center">
              دکمه سه‌بعدی بوکا
            </h3>
            <p className="text-sm font-persian text-muted mb-6 text-center">
              ترکیب سبک سه‌بعدی با طراحی بوکا
            </p>
            
            <div className="flex justify-center mb-4">
              <motion.button 
                className={cn(
                  // Container (shadow/depth) - using Booka primary colors
                  "bg-primary-700 rounded-button border-none p-0 cursor-pointer",
                  "outline-offset-4 focus:outline-none focus:ring-2 focus:ring-primary-500",
                  "shadow-lg"
                )}
                onClick={() => handleClick('enhanced')}
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              >
                <motion.span 
                  className={cn(
                    // Front surface with Booka styling
                    "block px-10 py-3 rounded-button text-xl font-bold font-persian",
                    "bg-gradient-to-b from-primary-400 to-primary-500 text-white",
                    "border border-white/20 shadow-inner"
                  )}
                  initial={{ y: -6 }}
                  animate={{ y: -6 }}
                  whileHover={{ y: -7, scale: 1.01 }}
                  whileTap={{ y: -2, scale: 0.99 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                  شروع کنید
                </motion.span>
              </motion.button>
            </div>
            
            <div className="text-center text-sm font-persian text-muted">
              تعداد کلیک: {clickCounts.enhanced}
            </div>
          </div>
        </div>

        {/* Technical Analysis */}
        <div className="bg-soft-primary-100 p-6 rounded-card">
          <h2 className="text-2xl font-bold font-persian text-primary-600 mb-6 text-center">
            تحلیل فنی
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Original Analysis */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold font-persian text-foreground mb-3">دکمه اصلی</h4>
              <ul className="text-sm font-persian text-muted space-y-2">
                <li>• استفاده از HSL برای رنگ‌ها</li>
                <li>• ساختار دولایه (container + front)</li>
                <li>• translateY(-6px) برای حالت اولیه</li>
                <li>• translateY(-2px) برای حالت فشرده</li>
                <li>• بدون انیمیشن پیشرفته</li>
                <li>• رنگ‌های قرمز/صورتی</li>
              </ul>
            </div>

            {/* Current Analysis */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold font-persian text-foreground mb-3">دکمه فعلی</h4>
              <ul className="text-sm font-persian text-muted space-y-2">
                <li>• سایه ساده و تمیز</li>
                <li>• حرکت جزئی (1-2px)</li>
                <li>• رنگ‌های برند بوکا</li>
                <li>• انیمیشن Framer Motion</li>
                <li>• طراحی مینیمال</li>
                <li>• سازگار با RTL</li>
              </ul>
            </div>

            {/* Enhanced Analysis */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold font-persian text-foreground mb-3">دکمه پیشرفته</h4>
              <ul className="text-sm font-persian text-muted space-y-2">
                <li>• ترکیب هر دو روش</li>
                <li>• گرادیانت برای عمق بیشتر</li>
                <li>• انیمیشن‌های نرم</li>
                <li>• حفظ هویت بصری بوکا</li>
                <li>• تعامل پیشرفته</li>
                <li>• بهینه‌سازی عملکرد</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-soft-success-100 p-6 rounded-card">
          <h2 className="text-2xl font-bold font-persian text-green-700 mb-4 text-center">
            توصیه‌ها
          </h2>
          <div className="text-center font-persian text-green-600 space-y-2">
            <p>✅ برای دکمه‌های اصلی: استفاده از سبک پیشرفته</p>
            <p>✅ برای دکمه‌های ثانویه: حفظ سبک فعلی</p>
            <p>✅ حفظ سازگاری با طراحی مینیمال بوکا</p>
            <p>✅ استفاده از رنگ‌های برند در همه حالات</p>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={() => setClickCounts({ original: 0, current: 0, enhanced: 0 })}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-persian hover:bg-gray-300 transition-colors"
          >
            ریست کردن شمارنده‌ها
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonComparisonTest;
